import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { root, lessons } from "./validate.mjs";

const url = process.env.BASE_URL || "http://127.0.0.1:8765/practice/";
const screenshots = path.join(root, "test-results");
fs.mkdirSync(screenshots, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : {}),
});
const errors = [];
const questionMap = new Map(
  lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
);
const storageKey = "finpath:corporate-finance:v1";
const state = (page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key)), storageKey);
const action = (page, id) =>
  page.locator(`[data-action="${id}"]`).filter({ visible: true }).first();
const shot = (page, name) =>
  page.screenshot({
    path: path.join(screenshots, `${name}.png`),
    fullPage: true,
  });
async function noOverflow(page) {
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    "Page must not overflow horizontally",
  );
}
async function accessible(page) {
  if (!(await page.evaluate(() => !!window.axe)))
    await page.addScriptTag({
      path: path.join(root, "node_modules/axe-core/axe.min.js"),
    });
  const violations = await page.evaluate(async () =>
    (
      await axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      })
    ).violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target),
    })),
  );
  assert.deepEqual(violations, [], "Automated WCAG A/AA checks");
}
async function newPage(viewport = { width: 1440, height: 1000 }) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  await page.goto(url);
  await page.locator(".hero").waitFor();
  return { page, context };
}
async function fillAnswer(page, q, correct = true) {
  if (q.type === "numerical") {
    await page
      .locator("#number-answer")
      .fill(correct ? String(q.answer) : "999");
  } else if (q.type === "multiple-choice" || q.type === "true-false") {
    const s = await state(page),
      card = s.active.cards[s.active.index];
    const index = card.order.findIndex((id) =>
      correct ? id === q.answer : id !== q.answer,
    );
    await page.keyboard.press(String(index + 1));
  } else if (q.type === "matching") {
    for (let i = 0; i < q.pairs.length; i++) {
      await page
        .locator(`[data-action="pair-left"][data-id="${q.pairs[i].id}"]`)
        .click();
      await page
        .locator(
          `[data-action="pair-right"][data-id="${q.pairs[correct ? i : (i + 1) % q.pairs.length].id}"]`,
        )
        .click();
    }
  } else {
    const desired = correct ? q.answer : [...q.answer].reverse();
    for (let i = 0; i < desired.length; i++) {
      let s = await state(page),
        pos = s.active.cards[s.active.index].draft.indexOf(desired[i]);
      while (pos > i) {
        await page
          .locator(`[data-action="move"][data-index="${pos}"][data-step="-1"]`)
          .click();
        pos--;
      }
    }
  }
}
async function check(page, q, right = true) {
  await fillAnswer(page, q, right);
  await page.locator("#check-button").click();
  await page.locator(".feedback").waitFor();
  const s = await state(page);
  assert.equal(s.active.cards[s.active.index].feedback.correct, right, q.id);
  if (!right) assert.ok(await page.locator(".correct-answer").isVisible());
}

try {
  const { page, context } = await newPage();
  await noOverflow(page);
  await accessible(page);
  await shot(page, "desktop-path");
  assert.equal(await page.locator(".lesson-node:disabled").count(), 3);
  await action(page, "start").click();
  assert.equal(await page.locator("#check-button").isDisabled(), true);
  await page.locator("#number-answer").fill("20");
  await action(page, "toggle-sign").click();
  assert.equal(await page.locator("#number-answer").inputValue(), "-20");
  await action(page, "toggle-sign").click();
  assert.equal(await page.locator("#number-answer").inputValue(), "20");
  await page.locator("#number-answer").fill("8oops");
  assert.equal(await page.locator("#check-button").isDisabled(), true);
  const first = questionMap.get("expected-return");
  await check(page, first, false);
  assert.equal((await state(page)).active.hearts, 4);
  await action(page, "why").click();
  await page.locator("dialog[open] .katex").waitFor();
  await page.keyboard.press("Escape");
  await page.reload();
  await page.locator(".feedback").waitFor();
  assert.equal((await state(page)).active.hearts, 4);
  assert.equal((await state(page)).xp, 0);
  await page.keyboard.press("Enter");
  // Persist an unsubmitted shuffled choice across exit and reload.
  const second = questionMap.get("expected-not-promised");
  await fillAnswer(page, second);
  const order = (await state(page)).active.cards[1].order;
  await action(page, "exit").click();
  await page.reload();
  await page.locator(".exercise").waitFor();
  assert.deepEqual((await state(page)).active.cards[1].order, order);
  assert.equal(await page.locator(".option.selected").count(), 1);
  await page.keyboard.press("Enter");
  assert.equal((await state(page)).xp, 10);
  await page.keyboard.press("Enter");
  while ((await state(page)).active) {
    const s = await state(page);
    const q = questionMap.get(s.active.cards[s.active.index].id);
    await check(page, q);
    await action(page, "continue").click();
  }
  assert.equal((await state(page)).lessons.returns.best, 80);
  assert.equal((await state(page)).review.length, 0);
  await shot(page, "lesson-complete");
  await action(page, "nav").click();
  assert.equal(await page.locator(".lesson-node:disabled").count(), 2);
  for (const lesson of lessons.slice(1)) {
    await page.locator(`.lesson-node[data-id="${lesson.id}"]`).click();
    while ((await state(page)).active) {
      const s = await state(page);
      const q = questionMap.get(s.active.cards[s.active.index].id);
      await check(page, q);
      await action(page, "why").click();
      assert.ok(
        (await page.locator("#dialog").textContent()).includes(q.misconception),
      );
      await page.keyboard.press("Escape");
      await action(page, "continue").click();
    }
    assert.equal((await state(page)).lessons[lesson.id].best, 100);
    await action(page, "nav").click();
  }
  assert.equal((await state(page)).xp, 267);
  assert.equal(Object.keys((await state(page)).lessons).length, 4);
  await page.reload();
  await page.locator(".hero").waitFor();
  assert.equal((await state(page)).xp, 267);
  await page.locator('.sidebar [data-view="progress"]').click();
  assert.equal(await page.locator(".record").count(), 4);
  await action(page, "settings").click();
  await action(page, "reset-step").click();
  await page.keyboard.press("Escape");
  assert.equal((await state(page)).xp, 267);
  await action(page, "settings").click();
  await action(page, "reset-step").click();
  await action(page, "reset-confirm").click();
  assert.equal(await state(page), null);
  assert.equal(await page.locator(".lesson-node:disabled").count(), 3);
  await context.close();
  console.log(
    "PASS full course, all exercise types, keyboard, persistence, XP, explanations, unlocks, two-step reset.",
  );

  const mobile = await newPage({ width: 390, height: 844 });
  const m = mobile.page;
  await noOverflow(m);
  await accessible(m);
  await shot(m, "mobile-path");
  await action(m, "start").click();
  await noOverflow(m);
  await accessible(m);
  await shot(m, "mobile-question");
  // Five wrong first-pass answers trigger practice mode; errors remain after failed retry.
  for (let i = 0; i < 5; i++) {
    const s = await state(m),
      q = questionMap.get(s.active.cards[s.active.index].id);
    await check(m, q, false);
    await noOverflow(m);
    await action(m, "continue").click();
  }
  assert.equal((await state(m)).active.hearts, 0);
  assert.ok(await m.locator(".practice-mode").isVisible());
  for (let i = 0; i < 5; i++) {
    const s = await state(m),
      q = questionMap.get(s.active.cards[s.active.index].id);
    await check(m, q, false);
    await action(m, "continue").click();
  }
  assert.equal((await state(m)).review.length, 5);
  await action(m, "nav").click();
  await m.locator('.mobile-nav [data-view="review"]').click();
  await action(m, "start-review").click();
  await check(m, first, true);
  await noOverflow(m);
  await accessible(m);
  await shot(m, "mobile-feedback");
  await action(m, "why").click();
  await noOverflow(m);
  await accessible(m);
  await shot(m, "mobile-explanation");
  // Native modal traps keyboard focus.
  await m.keyboard.press("Tab");
  assert.ok(
    await m.evaluate(() =>
      document.querySelector("#dialog").contains(document.activeElement),
    ),
  );
  await m.keyboard.press("Escape");
  await action(m, "continue").click();
  while ((await state(m)).active) {
    const s = await state(m),
      q = questionMap.get(s.active.cards[s.active.index].id);
    await check(m, q);
    await action(m, "continue").click();
  }
  assert.equal((await state(m)).review.length, 0);
  assert.equal(
    (await state(m)).lessons.returns.best,
    0,
    "Review does not alter first-pass lesson scores",
  );
  await action(m, "nav").click();
  await m.locator('.lesson-node[data-id="risk-radar"]').click();
  await noOverflow(m);
  await accessible(m);
  await shot(m, "mobile-matching");
  const match = questionMap.get("risk-matching");
  await check(m, match, false);
  assert.equal((await state(m)).active.hearts, 4);
  await noOverflow(m);
  await m.setViewportSize({ width: 320, height: 740 });
  await noOverflow(m);
  await action(m, "why").click();
  await noOverflow(m);
  await m.keyboard.press("Escape");
  await mobile.context.close();
  console.log(
    "PASS mobile at 390px and 320px, zero hearts, review queue, matching errors, dialog focus, no overflow.",
  );

  const corrupt = await newPage();
  await corrupt.page.evaluate(
    (key) => localStorage.setItem(key, "broken JSON"),
    storageKey,
  );
  await corrupt.page.reload();
  await corrupt.page
    .getByRole("heading", { name: "Let’s check your saved progress." })
    .waitFor();
  assert.equal(
    await corrupt.page.evaluate((key) => localStorage.getItem(key), storageKey),
    "broken JSON",
  );
  await corrupt.context.close();
  const reopen = await newPage();
  await action(reopen.page, "start").click();
  await reopen.page.locator("#number-answer").fill("-20");
  await reopen.page.close();
  const reopened = await reopen.context.newPage();
  await reopened.goto(url);
  await reopened.locator("#number-answer").waitFor();
  assert.equal(await reopened.locator("#number-answer").inputValue(), "-20");
  await reopen.context.close();
  assert.deepEqual(errors, [], "No browser errors or failing HTTP resources");
  console.log(
    "PASS malformed storage preserved, all static resources load, no console errors.",
  );
} finally {
  await browser.close();
}
