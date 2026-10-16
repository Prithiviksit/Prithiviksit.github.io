import test from "node:test";
import assert from "node:assert/strict";
import { lessons, course } from "./validate.mjs";
import {
  grade,
  parseNumber,
  shuffle,
  makeCard,
  createSession,
  submit,
  finish,
  validateCourse,
} from "../js/logic.js";
import {
  emptyProgress,
  loadProgress,
  saveProgress,
  resetProgress,
  STORAGE_KEY,
} from "../js/progress.js";

const all = lessons.flatMap((l) => l.questions);
const correct = (q) =>
  q.type === "matching"
    ? Object.fromEntries(q.pairs.map((p) => [p.id, p.id]))
    : q.answer;

test("every authored correct answer passes; every type rejects an incorrect answer", () => {
  for (const q of all) {
    assert.equal(grade(q, correct(q)), true, q.id);
    const wrong = {
      numerical: "9999",
      "true-false": !q.answer,
      "multiple-choice": "nonexistent",
      matching: {},
      sequence: [],
    }[q.type];
    assert.equal(grade(q, wrong), false, q.id);
  }
});
test("numeric input rejects blank, partial and nonfinite input", () => {
  for (const value of ["", " ", "8oops", "1,2", "Infinity", "NaN", "1e8", "%"])
    assert.equal(parseNumber(value), null, value);
  assert.equal(parseNumber(" −20% "), -20);
  assert.equal(parseNumber(".5"), 0.5);
  const q = all.find((q) => q.id === "expected-return");
  assert.ok(grade(q, "8.05"));
  assert.ok(!grade(q, "8.051"));
  assert.ok(
    grade(
      { ...q, answer: 100, absoluteTolerance: 0, relativeTolerance: 0.01 },
      101,
    ),
  );
  assert.ok(
    !grade(
      { ...q, answer: 100, absoluteTolerance: 0, relativeTolerance: 0.01 },
      101.01,
    ),
  );
  assert.ok(
    !grade(
      { ...q, answer: 0, absoluteTolerance: 0, relativeTolerance: 0.01 },
      0.1,
    ),
  );
});
test("answer order is a permutation and stored per card", () => {
  const q = all.find((q) => q.type === "multiple-choice");
  assert.deepEqual(
    [...makeCard(q).order].sort(),
    q.options.map((o) => o.id).sort(),
  );
  assert.deepEqual(
    shuffle([1, 2, 3], () => 0),
    [2, 3, 1],
  );
  const s = all.find((q) => q.type === "sequence");
  assert.notDeepEqual(makeCard(s).draft, s.answer);
});
test("incorrect answers cost one heart, queue once, and repeat later", () => {
  const p = emptyProgress();
  p.active = createSession(lessons[0], lessons[0].questions);
  p.active.cards[0].draft = 900;
  submit(p, all[0]);
  assert.equal(p.active.hearts, 4);
  assert.equal(p.xp, 0);
  assert.deepEqual(p.review, [all[0].id]);
  assert.equal(p.active.cards.length, 6);
  assert.equal(submit(p, all[0]), false);
  assert.equal(p.active.hearts, 4);
  p.active.index = 5;
  p.active.cards[5].draft = 900;
  submit(p, all[0]);
  assert.equal(p.active.cards.length, 6);
  assert.deepEqual(p.review, [all[0].id]);
});
test("XP survives reload and a repeated check cannot double award it", () => {
  const p = emptyProgress();
  p.active = createSession(lessons[0], lessons[0].questions);
  p.active.cards[0].draft = 8;
  submit(p, all[0]);
  const copy = JSON.parse(JSON.stringify(p));
  assert.equal(copy.xp, 10);
  assert.equal(submit(copy, all[0]), false);
  assert.equal(copy.xp, 10);
  copy.active.index = 1;
  copy.active.cards[1].draft = correct(all[1]);
  submit(copy, all[1]);
  assert.equal(copy.active.combo, 2);
  assert.equal(copy.xp, 22);
});
test("five mistakes do not block learning; later success clears review", () => {
  const p = emptyProgress();
  p.active = createSession(lessons[0], lessons[0].questions);
  for (let i = 0; i < 5; i++) {
    p.active.index = i;
    p.active.cards[i].draft =
      all[i].type === "sequence" ? [...all[i].answer].reverse() : "999";
    submit(p, all[i]);
  }
  assert.equal(p.active.hearts, 0);
  assert.equal(p.active.cards.length, 10);
  p.active.index = 5;
  p.active.cards[5].draft = 8;
  submit(p, all[0]);
  assert.equal(p.active.hearts, 0);
  assert.ok(p.xp > 0);
  assert.ok(!p.review.includes(all[0].id));
});
test("completing and retrying preserves best first-pass score and cumulative XP", () => {
  const p = emptyProgress();
  p.active = createSession(lessons[0], lessons[0].questions);
  p.active.firstCorrect = 4;
  p.active.xp = 50;
  p.xp = 50;
  assert.equal(finish(p).score, 80);
  assert.equal(p.lessons.returns.best, 80);
  p.active = createSession(lessons[0], lessons[0].questions);
  p.active.firstCorrect = 2;
  finish(p);
  assert.equal(p.lessons.returns.best, 80);
  assert.equal(p.lessons.returns.attempts, 2);
  assert.equal(p.xp, 50);
});
test("storage round trip and reset affect only this app", () => {
  const data = new Map([["unrelated", "keep"]]);
  const storage = {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => data.set(k, v),
    removeItem: (k) => data.delete(k),
  };
  const p = emptyProgress();
  p.xp = 42;
  saveProgress(p, storage);
  assert.equal(loadProgress(storage).xp, 42);
  resetProgress(storage);
  assert.equal(data.has(STORAGE_KEY), false);
  assert.equal(data.get("unrelated"), "keep");
  storage.setItem(STORAGE_KEY, "broken");
  assert.throws(() => loadProgress(storage));
});
test("content validation rejects duplicate IDs and invalid answer references", () => {
  const copy = structuredClone(lessons);
  copy[0].questions[1].answer = "invalid";
  assert.throws(() => validateCourse(course, copy));
  const dup = structuredClone(lessons);
  dup[1].questions[0].id = dup[0].questions[0].id;
  assert.throws(() => validateCourse(course, dup));
});
