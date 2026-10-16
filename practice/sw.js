// Increment RELEASE whenever shell, lesson content, or bundled assets change.
const RELEASE = "2026-10-15-open-practice-3";
const ROOT = new URL("./", self.location.href);
const PREFIX = `finpath-static:${ROOT.pathname}:`;
const CACHE = PREFIX + RELEASE;
const SHELL = [
  "./",
  "index.html",
  "css/style.css",
  "js/engine.js",
  "js/logic.js",
  "js/progress.js",
  "js/content.js",
  "js/math.js",
  "assets/mark.svg",
  "courses/corporate-finance/course.json",
];
const shellUrls = new Set(SHELL.map((path) => new URL(path, ROOT).href));

self.addEventListener("install", (event) => {
  // Only the small shell/index is precached. Lessons and math are fetched on demand.
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll(
          [...shellUrls].map((url) => new Request(url, { cache: "no-cache" })),
        ),
      ),
  );
  // Do not skipWaiting: an update must not replace code during an active lesson.
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys())
        if (name.startsWith(PREFIX) && name !== CACHE)
          await caches.delete(name);
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request,
    url = new URL(request.url);
  if (
    request.method !== "GET" ||
    url.origin !== ROOT.origin ||
    !url.pathname.startsWith(ROOT.pathname) ||
    url.search
  )
    return;
  const relative = url.pathname.slice(ROOT.pathname.length);
  const cacheable =
    shellUrls.has(url.href) ||
    /^courses\/corporate-finance\/[a-z0-9-]+\.json$/.test(relative) ||
    /^assets\/katex\/(?:katex\.min\.(?:js|css)|auto-render\.min\.js|fonts\/[A-Za-z0-9_-]+\.(?:woff2?|ttf))$/.test(
      relative,
    );
  if (!cacheable) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const saved = await cache.match(request);
      if (saved) return saved;
      try {
        const response = await fetch(request);
        if (response.ok && response.type === "basic") {
          try {
            await cache.put(request, response.clone());
          } catch (error) {
            console.warn("Resource could not be cached:", error.message);
          }
        }
        return response;
      } catch {
        return new Response("This resource has not been saved offline yet.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        });
      }
    })(),
  );
});
