import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";
import { STORAGE_KEY, LEGACY_STORAGE_KEY } from "../js/progress.js";
import { createSession } from "../js/logic.js";
import { root, lessons } from "./validate.mjs";

const url = process.env.BASE_URL || "http://127.0.0.1:8765/practice/";
const launch = {
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : {}),
};
const browser = await chromium.launch(launch);
const read = (page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
const start = async (page, id) => {
  await page.locator(`.lesson-node[data-id="${id}"]`).click();
  await page.locator("#question-title").waitFor();
};
const exit = (page) => page.locator('[data-action="exit"]').click();
async function ready(page) {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}

try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const requests = [];
  const sizes = [];
  context.on("request", (r) =>
    requests.push({ url: r.url(), method: r.method() }),
  );
  context.on("response", (r) => {
    if (!r.fromServiceWorker())
      sizes.push(
        r.headerValue("content-length").then((value) => Number(value) || 0),
      );
  });
  const page = await context.newPage();
  await page.goto(url);
  await page.locator(".hero").waitFor();
  await ready(page);
  const initial = requests.map((r) => r.url);
  assert.ok(!initial.some((u) => /katex/.test(u)), "No initial math download");
  assert.ok(
    !initial.some((u) =>
      /\/(risk-return|risk-radar|diversification|leverage-beta)\.json$/.test(u),
    ),
    "No initial question files",
  );
  assert.equal(await page.locator(".lesson-node:disabled").count(), 0);
  assert.equal(await page.locator(".market-node").count(), 4);
  const initialBytes = (await Promise.all(sizes)).reduce((a, b) => a + b, 0);
  console.log(
    `Initial uncompressed response bodies including service-worker shell caching: ${initialBytes} bytes; no questions or KaTeX.`,
  );
  await page.setViewportSize({ width: 320, height: 740 });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  );
  await page.screenshot({
    path: path.join(root, "test-results", "open-path-320.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  // Skip straight to lesson four, independent of all other topics.
  await start(page, "leverage-beta");
  const files = requests.filter((r) =>
    /\/(risk-return|risk-radar|diversification|leverage-beta)\.json$/.test(
      r.url,
    ),
  );
  assert.deepEqual(
    [...new Set(files.map((r) => r.url.split("/").at(-1)))],
    ["leverage-beta.json"],
  );
  const count = requests.length;
  await page.locator("#number-answer").fill("-20");
  await page.locator("#check-button").click();
  await page.locator("#continue-button").click();
  await page.locator(".options").waitFor();
  assert.equal(
    requests.length,
    count,
    "Drafts, checking and continuing make zero requests",
  );
  const saved = await read(page);
  assert.equal(saved.xp, 10);
  assert.equal(saved.history.length, 1);
  assert.equal(saved.history[0].submittedAnswer, "-20");
  assert.equal(saved.active.index, 1);
  await exit(page);
  await start(page, "returns");
  await page.locator("#number-answer").fill("7.5");
  await exit(page);
  await start(page, "leverage-beta");
  assert.equal((await read(page)).active.index, 1);
  assert.equal(
    (await read(page)).paused["lesson:returns"].cards[0].draft,
    "7.5",
  );
  assert.equal((await read(page)).xp, 10);
  await page.reload();
  await page.locator(".options").waitFor();
  assert.equal((await read(page)).active.index, 1);
  assert.equal((await read(page)).history.length, 1);
  // Cache math fonts once, then reload and answer entirely offline.
  const state = await read(page);
  const index = state.active.cards[1].order.indexOf("twenty");
  await page.keyboard.press(String(index + 1));
  await page.locator("#check-button").click();
  await page.locator('[data-action="why"]').click();
  await page.evaluate(() => document.fonts.ready);
  await page.keyboard.press("Escape");
  await ready(page);
  await context.setOffline(true);
  await page.reload();
  await page.locator(".feedback").waitFor();
  assert.equal((await read(page)).xp, 22);
  assert.equal((await read(page)).history.length, 2);
  await page.locator("#continue-button").click();
  await page.locator(".matching").waitFor();
  await exit(page);
  await start(page, "returns");
  assert.equal(await page.locator("#number-answer").inputValue(), "7.5");
  await page.locator("#number-answer").fill("8");
  await page.locator("#check-button").click();
  assert.equal((await read(page)).history.length, 3);
  await exit(page);
  // An unvisited lesson gets a clear retry message and cannot erase either saved attempt.
  await page.locator('.lesson-node[data-id="risk-radar"]').click();
  await page
    .getByRole("heading", { name: "This lesson could not load" })
    .waitFor();
  assert.equal((await read(page)).active.lessonId, "returns");
  assert.ok((await read(page)).paused["lesson:leverage-beta"]);
  await page.locator('#dialog [data-action="close-dialog"]').last().click();
  await context.setOffline(false);
  await start(page, "risk-radar");
  await page.locator(".matching").waitFor();
  assert.ok(
    requests.every((r) => r.method === "GET"),
    "No POST/analytics/progress transport",
  );
  assert.ok(
    requests.every((r) => new URL(r.url).origin === new URL(url).origin),
    "All resources are same-origin",
  );
  await context.close();
  console.log(
    "PASS on-demand downloads, skip ahead, multiple drafts, answer history, zero per-answer requests, offline resume, safe failed downloads.",
  );

  const migration = await browser.newContext();
  const session = createSession(lessons[0], lessons[0].questions);
  session.cards[0].draft = "8";
  const legacy = {
    version: 1,
    xp: 68,
    lessons: { "risk-radar": { completed: true, best: 100, attempts: 1 } },
    questions: {},
    review: [],
    active: session,
  };
  await migration.addInitScript(
    ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
    { key: LEGACY_STORAGE_KEY, value: legacy },
  );
  const old = await migration.newPage();
  await old.goto(url);
  await old.locator("#number-answer").waitFor();
  assert.equal(await old.locator("#number-answer").inputValue(), "8");
  assert.equal((await read(old)).xp, 68);
  assert.equal((await read(old)).version, 2);
  assert.equal((await read(old)).lessons["risk-radar"].best, 100);
  await migration.close();
  console.log(
    "PASS browser migration of existing XP, scores and unfinished lesson.",
  );

  const reviewContext = await browser.newContext();
  const reviewPage = await reviewContext.newPage();
  await reviewPage.goto(url);
  await reviewPage.locator(".hero").waitFor();
  await start(reviewPage, "returns");
  await reviewPage.locator("#number-answer").fill("0");
  await reviewPage.locator("#check-button").click();
  await exit(reviewPage);
  await reviewPage
    .locator('[data-action="nav"][data-view="review"]:visible')
    .click();
  await reviewPage.locator('[data-action="start-review"]').click();
  await reviewPage.locator("#number-answer").waitFor();
  await reviewPage.locator("#number-answer").fill("8");
  await reviewPage.locator("#check-button").click();
  await exit(reviewPage);
  assert.equal((await read(reviewPage)).review.length, 0);
  await start(reviewPage, "leverage-beta");
  await exit(reviewPage);
  await reviewPage
    .locator('[data-action="nav"][data-view="review"]:visible')
    .click();
  await reviewPage.getByRole("button", { name: "Resume review" }).click();
  await reviewPage.locator("#continue-button").click();
  assert.ok(
    (await read(reviewPage)).completedSessions.some((s) => s.mode === "review"),
  );
  await reviewContext.close();
  console.log(
    "PASS paused review remains resumable after clearing its last queued question.",
  );

  const tabs = await browser.newContext();
  const first = await tabs.newPage();
  await first.goto(url);
  await first.locator(".hero").waitFor();
  await start(first, "returns");
  await first.locator("#number-answer").fill("7");
  const revision = (await read(first)).revision;
  const second = await tabs.newPage();
  await second.goto(url);
  await second.locator("#number-answer").waitFor();
  await second.waitForTimeout(400);
  assert.equal(
    (await read(second)).revision,
    revision,
    "Opening a saved attempt must not write again or trigger a tab reload loop",
  );
  await second.locator("#number-answer").fill("8");
  await first.waitForFunction(
    () => document.querySelector("#number-answer")?.value === "8",
  );
  await first.waitForTimeout(400);
  assert.equal((await read(first)).revision, revision + 1);
  await tabs.close();
  console.log(
    "PASS other-tab changes refresh once without repeated save/reload loops.",
  );
} finally {
  await browser.close();
}

// A real profile survives closing the browser process, not just a page reload.
const profile = await fs.mkdtemp(path.join(os.tmpdir(), "finpath-resume-"));
let persistent;
try {
  persistent = await chromium.launchPersistentContext(profile, launch);
  let page = await persistent.newPage();
  await page.goto(url);
  await page.locator(".hero").waitFor();
  await start(page, "diversification");
  await page.locator("#number-answer").fill("10");
  await ready(page);
  await persistent.close();
  persistent = null;
  persistent = await chromium.launchPersistentContext(profile, launch);
  page = await persistent.newPage();
  await page.goto(url);
  await page.locator("#number-answer").waitFor();
  assert.equal(await page.locator("#number-answer").inputValue(), "10");
  assert.equal((await read(page)).active.lessonId, "diversification");
  console.log(
    "PASS browser-process restart resumes the same draft in the same local profile.",
  );
} finally {
  if (persistent) await persistent.close();
  await fs.rm(profile, { recursive: true, force: true });
}
