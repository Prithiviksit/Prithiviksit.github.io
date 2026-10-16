/* Static files only. This worker never reads, writes, or resets student progress. */
const release = new URL(self.location.href).searchParams.get("release");
const assetIndex = new URL("./sw-assets.js", self.location.href);
if (release) assetIndex.searchParams.set("release", release);
importScripts(assetIndex.href);
const { version, files, html, release: assetRelease } = self.FINPATH_ASSETS;
const ROOT = new URL("./", self.location.href);
const PREFIX = `finpath-static:${ROOT.pathname}:`;
const CACHE = `${PREFIX}pwa-${version}`;
const COMPLETE = new URL("__offline-complete", ROOT).href;
const entries = new Map(
  files.map((file) => [new URL(file.path, ROOT).href, file]),
);
let downloading;

async function saveFile(cache, file) {
  const key = new URL(file.path, ROOT);
  if (await cache.match(key)) return;
  // A content-specific query avoids stale CDN responses under ordinary cache keys.
  const remote = new URL(key);
  remote.searchParams.set("v", file.sha256.slice(0, 16));
  // Cloudflare may inject scripts into network HTML. The generated index carries
  // the original shell; it passes the same digest check as every downloaded file.
  const embedded = file.path === "index.html";
  const response = embedded
    ? new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      })
    : await fetch(remote, { cache: "no-store" });
  if (!response.ok || (!embedded && response.type !== "basic"))
    throw new Error(`Could not download ${file.path}.`);
  const bytes = await response.clone().arrayBuffer();
  const digest = [
    ...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
  ]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
  if (digest !== file.sha256) {
    const error = new Error(
      "The new app files are still arriving. Please try again shortly.",
    );
    error.name = "IntegrityError";
    throw error;
  }
  await cache.put(key, response);
}

async function saveFiles(cache, selected, onProgress = () => {}) {
  let cursor = 0,
    done = 0;
  await Promise.all(
    Array.from({ length: Math.min(4, selected.length) }, async () => {
      while (cursor < selected.length) {
        const file = selected[cursor++];
        await saveFile(cache, file);
        onProgress(++done, selected.length);
      }
    }),
  );
}

async function status(cache) {
  const saved = await Promise.all(
    files.map((file) => cache.match(new URL(file.path, ROOT))),
  );
  return {
    ready: saved.every(Boolean),
    saved: saved.filter(Boolean).length,
    total: files.length,
    bytes: files.reduce((n, f) => n + f.bytes, 0),
    version,
  };
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const oldNames = (await caches.keys()).filter(
          (name) => name.startsWith(PREFIX) && name !== CACHE,
        );
        const oldCaches = await Promise.all(
          oldNames.map((name) => caches.open(name)),
        );
        // Preserve an existing full offline download, and refresh previously opened lessons.
        const full = (
          await Promise.all(oldCaches.map((old) => old.match(COMPLETE)))
        ).some(Boolean);
        const selected = [];
        for (const file of files) {
          const wasSaved = (
            await Promise.all(
              oldCaches.map((old) => old.match(new URL(file.path, ROOT))),
            )
          ).some(Boolean);
          if (file.shell || full || wasSaved) selected.push(file);
        }
        await saveFiles(cache, selected);
        if (full) await cache.put(COMPLETE, new Response(version));
      } catch (error) {
        await caches.delete(CACHE);
        throw error;
      }
    })(),
  );
  // No skipWaiting: students finish with the version already open in their tabs.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) {
        if (name.startsWith(PREFIX) && name !== CACHE)
          await caches.delete(name);
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== ROOT.origin) return;
  const home =
    request.mode === "navigate" &&
    [ROOT.pathname, ROOT.pathname + "index.html"].includes(url.pathname);
  if (home) {
    url.pathname = ROOT.pathname + "index.html";
    url.search = "";
  }
  if (
    assetRelease &&
    url.searchParams.size === 1 &&
    url.searchParams.get("release") === assetRelease
  )
    url.search = "";
  if (url.search || !entries.has(url.href)) return;
  event.respondWith(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        const saved = await cache.match(url);
        if (saved) return saved;
        await saveFile(cache, entries.get(url.href));
        return await cache.match(url);
      } catch (error) {
        if (error.name === "IntegrityError")
          return new Response(error.message, { status: 503 });
        // Online practice remains usable when CacheStorage is unavailable or full.
        try {
          return await fetch(request);
        } catch {
          return new Response("This lesson has not been saved offline yet.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        }
      }
    })(),
  );
});

self.addEventListener("message", (event) => {
  const port = event.ports[0];
  if (!port || !["OFFLINE_STATUS", "SAVE_OFFLINE"].includes(event.data?.type))
    return;
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        if (event.data.type === "SAVE_OFFLINE") {
          if (!downloading) {
            downloading = saveFiles(cache, files, (done, total) =>
              port.postMessage({ progress: true, done, total }),
            )
              .then(() => cache.put(COMPLETE, new Response(version)))
              .finally(() => {
                downloading = null;
              });
          }
          await downloading;
        }
        port.postMessage({ result: await status(cache) });
      } catch (error) {
        port.postMessage({ error: error.message });
      }
    })(),
  );
});
