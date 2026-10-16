import test from "node:test";
import assert from "node:assert/strict";
import { course, lessons } from "./validate.mjs";
import {
  createProgressStore,
  localStorageAdapter,
  emptyProgress,
  STORAGE_KEY,
  LEGACY_STORAGE_KEY,
} from "../js/progress.js";
import { activateSession, createSession, submit, finish } from "../js/logic.js";
import { createContentLoader } from "../js/content.js";

function memoryStorage() {
  const data = new Map();
  return {
    data,
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
}
test("legacy progress migrates scores, XP, drafts and answered feedback without invented history", () => {
  const storage = memoryStorage(),
    session = createSession(lessons[0], lessons[0].questions);
  session.cards[0].draft = "8";
  session.cards[0].feedback = { correct: true, xp: 10 };
  session.xp = 10;
  session.firstCorrect = 1;
  delete session.id;
  delete session.startedAt;
  const legacy = {
    version: 1,
    xp: 78,
    lessons: { "risk-radar": { best: 100, attempts: 1, completed: true } },
    questions: { "expected-return": { correct: 1, wrong: 0 } },
    review: [],
    active: session,
  };
  storage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(legacy));
  const store = createProgressStore(localStorageAdapter(storage));
  const result = store.load();
  assert.equal(result.version, 2);
  assert.equal(result.xp, 78);
  assert.equal(result.lessons["risk-radar"].best, 100);
  assert.equal(result.active.cards[0].draft, "8");
  assert.ok(result.active.cards[0].feedback.correct);
  assert.equal(result.history.length, 0);
  assert.deepEqual(result.legacyTotals.questions, legacy.questions);
  assert.ok(storage.getItem(STORAGE_KEY));
  assert.ok(storage.getItem(LEGACY_STORAGE_KEY));
  assert.equal(submit(result, lessons[0].questions[0]), false);
  assert.equal(result.xp, 78);
  const generation = result.generation;
  store.reset();
  assert.notEqual(store.load().generation, generation);
  assert.equal(storage.getItem(LEGACY_STORAGE_KEY), null);
});
test("independent unfinished sessions retain positions and drafts across adapter round trips", () => {
  const store = createProgressStore(localStorageAdapter(memoryStorage())),
    p = emptyProgress();
  activateSession(p, lessons[3], lessons[3].questions);
  p.active.cards[0].draft = "-20";
  submit(p, lessons[3].questions[0]);
  p.active.index = 1;
  const firstId = p.active.id;
  activateSession(p, lessons[0], lessons[0].questions);
  p.active.cards[0].draft = "7.9";
  store.save(p);
  const restored = store.load();
  assert.equal(restored.active.cards[0].draft, "7.9");
  activateSession(restored, lessons[3], lessons[3].questions);
  assert.equal(restored.active.id, firstId);
  assert.equal(restored.active.index, 1);
  assert.equal(restored.active.cards[0].draft, "-20");
  assert.equal(restored.xp, 10);
  assert.equal(restored.paused["lesson:returns"].cards[0].draft, "7.9");
});
test("answer events are immutable snapshots with unique IDs and completion records", () => {
  const p = emptyProgress();
  activateSession(p, lessons[1], lessons[1].questions);
  const q = lessons[1].questions[0];
  p.active.cards[0].draft = Object.fromEntries(
    q.pairs.map((pair) => [pair.id, pair.id]),
  );
  submit(p, q);
  const event = structuredClone(p.history[0]);
  p.active.cards[0].draft.specific = "changed";
  assert.deepEqual(p.history[0], event);
  assert.equal(submit(p, q), false);
  assert.equal(p.history.length, 1);
  assert.equal(event.id, `${p.active.id}:0`);
  assert.equal(event.correct, true);
  assert.ok(Date.parse(event.answeredAt));
  const result = finish(p);
  assert.equal(p.completedSessions[0].id, result.id);
  assert.equal(p.history.length, 1);
});
test("store works with a transport-independent adapter and reports failed local writes", () => {
  let raw = null,
    change;
  const adapter = {
    read: () => raw,
    write: (value) => {
      raw = value;
    },
    removeLegacy: () => {},
    subscribe: (fn) => {
      change = fn;
      return () => {
        change = null;
      };
    },
  };
  const store = createProgressStore(adapter),
    p = store.load();
  p.xp = 12;
  store.save(p);
  assert.equal(store.load().xp, 12);
  assert.equal(p.revision, 1);
  assert.ok(Date.parse(p.updatedAt));
  let notified = false;
  const unsubscribe = store.subscribe(() => {
    notified = true;
  });
  change();
  assert.ok(notified);
  unsubscribe();
  assert.equal(change, null);
  adapter.write = () => {
    throw new Error("Quota exceeded");
  };
  assert.throws(() => store.save(p), /Quota/);
  assert.equal(p.revision, 1);
});
test("lesson files load only when requested and concurrent reads share one request", async () => {
  const calls = [];
  const loader = createContentLoader(
    course,
    new URL("https://example.test/practice/courses/corporate-finance/"),
    async (url) => {
      calls.push(url.pathname);
      const file = url.pathname.split("/").at(-1);
      const metadata = course.units
        .flatMap((u) => u.lessons)
        .find((l) => l.file === file);
      return {
        ok: true,
        json: async () =>
          structuredClone(lessons.find((l) => l.id === metadata.id)),
      };
    },
  );
  assert.equal(calls.length, 0);
  await Promise.all([
    loader.lesson("leverage-beta"),
    loader.lesson("leverage-beta"),
  ]);
  assert.equal(calls.length, 1);
  await loader.questions(["beta-not-exact", "levered-loss"]);
  assert.equal(calls.length, 1);
  const review = await loader.questions(["levered-loss", "expected-return"]);
  assert.equal(calls.length, 2);
  assert.equal(review.length, 2);
});
