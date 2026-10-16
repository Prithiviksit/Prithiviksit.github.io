import assert from "node:assert/strict";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";
import { STORAGE_KEY } from "../js/progress.js";

execFileSync(process.execPath, [
  new URL("../scripts/package-native.mjs", import.meta.url).pathname,
]);
const root = new URL("../native-www/", import.meta.url);
const requests = [];
const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  requests.push(pathname);
  try {
    const target = new URL(
      "." + (pathname === "/" ? "/index.html" : pathname),
      root,
    );
    if (!target.href.startsWith(root.href)) throw new Error("Outside bundle");
    const body = await fs.readFile(target);
    res.writeHead(200, {
      "Content-Type":
        {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".svg": "image/svg+xml",
          ".webmanifest": "application/manifest+json",
        }[path.extname(pathname)] || "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : {}),
});
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
  await page.locator(".hero").waitFor();
  assert.equal(await page.locator('[data-action="app-options"]').count(), 0);
  await page.locator('.lesson-node[data-id="lec15-capital-markets"]').click();
  await page.locator("#number-answer").fill("0");
  await page.locator("#check-button").click();
  assert.equal(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key)).xp,
      STORAGE_KEY,
    ),
    10,
  );
  await page.reload();
  await page.locator(".feedback").waitFor();
  assert.equal(
    (await page.evaluate(() => navigator.serviceWorker.getRegistrations()))
      .length,
    0,
  );
  assert.ok(!requests.some((url) => url.endsWith("/sw.js")));
  console.log(
    "PASS generated native web directory runs the same quiz, preserves progress, and disables PWA registration/install controls.",
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
