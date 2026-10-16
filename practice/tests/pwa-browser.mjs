import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { chromium, webkit, devices } from "playwright";
import { emptyProgress, STORAGE_KEY } from "../js/progress.js";
import { activateSession, submit, finish } from "../js/logic.js";
import { root, lessons } from "./validate.mjs";

const context = { self: {} };
vm.runInNewContext(
  await fs.readFile(path.join(root, "sw-assets.js"), "utf8"),
  context,
);
const original = context.self.FINPATH_ASSETS;
const source = new Map(
  await Promise.all(
    [...original.files.map((f) => f.path), "sw.js", "sw-assets.js"].map(
      async (p) => [p, await fs.readFile(path.join(root, p))],
    ),
  ),
);
const prefix = "/site/practice/";
let generation = 1,
  broken = false,
  requests = [];
function release() {
  const served = new Map(source);
  const assetRelease =
    generation === 1
      ? original.release
      : generation.toString(16).padStart(16, "0");
  if (generation > 1)
    served.set(
      "index.html",
      Buffer.from(
        source
          .get("index.html")
          .toString()
          .replaceAll(original.release, assetRelease)
          .replace(
            "Finpath · Corporate",
            "Finpath v" + generation + " · Corporate",
          ),
      ),
    );
  const files = original.files.map((f) => ({
    ...f,
    sha256: createHash("sha256").update(served.get(f.path)).digest("hex"),
  }));
  const version = "test-" + generation;
  served.set(
    "sw-assets.js",
    Buffer.from(
      "self.FINPATH_ASSETS = " +
        JSON.stringify({
          version,
          release: assetRelease,
          files,
          html: served.get("index.html").toString(),
        }) +
        ";",
    ),
  );
  return served;
}
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  requests.push(url.pathname);
  if (!url.pathname.startsWith(prefix)) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<!doctype html><title>Update check</title>");
    return;
  }
  const file = url.pathname.slice(prefix.length) || "index.html";
  // An edge cache can retain a broken older deployment at unversioned URLs.
  if (
    ["sw.js", "sw-assets.js"].includes(file) &&
    !url.searchParams.has("release")
  ) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end('throw new Error("Stale CDN copy");');
    return;
  }
  let body = release().get(file);
  if (!body || (broken && file === "css/style.css")) {
    res.writeHead(503);
    res.end("Temporarily unavailable");
    return;
  }
  // Production Cloudflare adds per-request scripts to HTML. Offline installation
  // must still use the verified original shell, without the injected dependency.
  if (file === "index.html")
    body = Buffer.from(
      body
        .toString()
        .replace(
          "</body>",
          "<script>window.edgeInjected = true;</script></body>",
        ),
    );
  res.writeHead(200, {
    "Content-Type": types[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(body);
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const url = `http://127.0.0.1:${server.address().port}${prefix}`;
try {
  const launch = {
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE
      ? { executablePath: process.env.BROWSER_EXECUTABLE }
      : {}),
  };
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), "finpath-pwa-"));
  const ctx = await chromium.launchPersistentContext(profile, {
    ...launch,
    ...devices["Pixel 7"],
    reducedMotion: "reduce",
  });
  const storage = (page) =>
    page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  const ready = async (page) => {
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  };
  const settings = async (page) => {
    await page.locator('[data-action="settings"]:visible').last().click();
    await page.locator('#dialog [data-action="app-options"]').click();
  };
  const close = (page) =>
    page.locator('#dialog [data-action="close-dialog"]').click();
  const start = async (page, id) => {
    await page.locator(`.lesson-node[data-id="${id}"]`).click();
    await page.locator("#question-title").waitFor();
  };
  async function installUpdate(page) {
    return page.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      return new Promise(async (resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("Update timed out")),
          15000,
        );
        reg.addEventListener(
          "updatefound",
          () => {
            const worker = reg.installing;
            worker.addEventListener("statechange", () => {
              if (["installed", "redundant"].includes(worker.state)) {
                clearTimeout(timer);
                resolve(worker.state);
              }
            });
          },
          { once: true },
        );
        try {
          await reg.update();
        } catch (error) {
          clearTimeout(timer);
          reject(error);
        }
      });
    });
  }

  try {
    let page = await ctx.newPage();
    await page.goto(url);
    await page.locator(".hero").waitFor();
    assert.equal(await page.evaluate(() => window.edgeInjected), true);
    await ready(page);
    assert.equal(
      await page.evaluate(async () => {
        const response = await caches.match(
          new URL("index.html", location.href),
        );
        return (await response.text()).includes("edgeInjected");
      }),
      false,
    );
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Page.enable");
    const manifest = await cdp.send("Page.getAppManifest");
    assert.deepEqual(manifest.errors, []);
    assert.equal(JSON.parse(manifest.data).display, "standalone");
    const installability = await cdp.send("Page.getInstallabilityErrors");
    assert.deepEqual(installability.installabilityErrors, []);
    await settings(page);
    await page
      .getByRole("button", { name: "Save all lessons offline" })
      .waitFor();
    await page.locator("#pwa-offline-button").click();
    await page
      .getByRole("button", { name: "Ready for offline practice" })
      .waitFor();
    await page.screenshot({
      path: path.join(root, "test-results", "pwa-android.png"),
    });
    await close(page);
    const state = emptyProgress();
    activateSession(state, lessons[0], lessons[0].questions);
    for (let i = 0; i < lessons[0].questions.length; i++) {
      const q = lessons[0].questions[i];
      state.active.index = i;
      state.active.cards[i].draft =
        q.type === "numerical"
          ? String(q.answer)
          : q.type === "matching"
            ? Object.fromEntries(q.pairs.map((p) => [p.id, p.id]))
            : q.answer;
      submit(state, q);
    }
    finish(state);
    activateSession(state, lessons[1], lessons[1].questions);
    state.active.cards[0].draft = {};
    activateSession(state, lessons[3], lessons[3].questions);
    state.active.cards[0].draft = "15";
    submit(state, lessons[3].questions[0]);
    state.active.index = 1;
    await page.evaluate(
      ({ key, state }) => localStorage.setItem(key, JSON.stringify(state)),
      { key: STORAGE_KEY, state },
    );
    await page.reload();
    await page.locator("#number-answer").waitFor();
    const before = await storage(page);
    await page.evaluate(async () => {
      await (
        await caches.open("unrelated-app-cache")
      ).put("/other", new Response("keep"));
    });

    // Failed installation cannot replace a working worker or lose offline resources/progress.
    generation = 2;
    broken = true;
    assert.equal(await installUpdate(page), "redundant");
    assert.equal(await storage(page), before);
    assert.ok(
      (await page.evaluate(() => caches.keys())).some((k) =>
        k.endsWith("pwa-test-1"),
      ),
    );
    // A complete update waits while this attempt is open.
    generation = 3;
    broken = false;
    assert.equal(await installUpdate(page), "installed");
    assert.equal(await storage(page), before);
    assert.ok(
      await page.evaluate(
        async () => !!(await navigator.serviceWorker.getRegistration()).waiting,
      ),
    );
    await page.locator('[data-action="exit"]').click();
    await settings(page);
    await page.locator("#pwa-update").waitFor();
    await close(page);
    const beforeClose = await storage(page);
    await page.close();
    page = await ctx.newPage();
    // Stay outside the worker's scope until activation finishes. Immediately opening
    // another app tab can legitimately keep the old worker in use.
    await page.goto(new URL("/update-check", url).href);
    await page.waitForFunction(
      async () => !(await caches.keys()).some((k) => k.endsWith("pwa-test-1")),
    );
    await page.goto(url);
    await page.locator("#number-answer").waitFor();
    await ready(page);
    assert.equal(await storage(page), beforeClose);
    assert.ok((await page.title()).includes("v3"));
    const cachesAfter = await page.evaluate(() => caches.keys());
    assert.ok(!cachesAfter.some((k) => k.endsWith("pwa-test-1")));
    assert.ok(cachesAfter.includes("unrelated-app-cache"));

    // A full download remains complete through the update, even for unvisited topics.
    await page.locator('[data-action="exit"]').click();
    await settings(page);
    await page
      .getByRole("button", { name: "Ready for offline practice" })
      .waitFor();
    await close(page);
    await ctx.setOffline(true);
    const count = requests.length;
    for (const lesson of lessons) {
      await start(page, lesson.id);
      await page.reload();
      await page.locator("#question-title").waitFor();
      await page.locator('[data-action="exit"]').click();
    }
    assert.equal(
      requests.length,
      count,
      "All lessons load offline without reaching the origin",
    );
    await page.goto(url + "?from=home-screen");
    await page.locator("#question-title").waitFor();
    await page.locator('[data-action="exit"]').click();
    await settings(page);
    await page
      .getByRole("button", { name: "Ready for offline practice" })
      .waitFor();
    await ctx.close();
    console.log(
      "PASS Chromium installability, nested scope, full offline pack, failed/successful updates, unchanged progress, preserved unrelated caches and offline home-screen launch.",
    );
  } finally {
    await ctx.close();
    await fs.rm(profile, { recursive: true, force: true });
  }

  // Optional WebKit run: use PLAYWRIGHT_BROWSERS_PATH when installing its test runtime.
  if (process.env.TEST_WEBKIT === "1") {
    const browser = await webkit.launch({ headless: true });
    try {
      generation = 1;
      broken = false;
      const ctx = await browser.newContext({
        ...devices["iPhone 13"],
        reducedMotion: "reduce",
      });
      const page = await ctx.newPage();
      await page.goto(url);
      await page.locator(".hero").waitFor();
      await ready(page);
      assert.equal(
        await page
          .locator('meta[name="apple-mobile-web-app-capable"]')
          .getAttribute("content"),
        "yes",
      );
      await settings(page);
      await page.locator("#pwa-offline-button").click();
      await page
        .getByRole("button", { name: "Ready for offline practice" })
        .waitFor();
      assert.ok(
        await page.getByText("iPhone or iPad:", { exact: false }).isVisible(),
      );
      await page.screenshot({
        path: path.join(root, "test-results", "pwa-ios.png"),
      });
      await close(page);
      await start(page, "lec18-capm");
      await page.locator("#number-answer").fill("15");
      await page.locator("#check-button").click();
      const before = await storage(page);
      await ctx.setOffline(true);
      await page.reload();
      await page.locator(".feedback").waitFor();
      assert.equal(await storage(page), before);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      await page.locator('[data-action="why"]').click();
      await page.locator(".katex").first().waitFor();
      await ctx.close();
      console.log(
        "PASS iPhone WebKit rendering, install guidance, full offline download, saved feedback/XP, and offline math.",
      );
    } finally {
      await browser.close();
    }
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}
