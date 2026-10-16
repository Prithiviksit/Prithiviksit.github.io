// Install the verified shell before importing modules on a first web visit.
// Release-specific URLs avoid a CDN mixing a new page with an older worker.
const web =
  document.querySelector('meta[name="finpath-runtime"]')?.content !== "native";
const release = document.querySelector('meta[name="finpath-release"]')?.content;
if (web && "serviceWorker" in navigator) {
  const worker = new URL("../sw.js", import.meta.url);
  if (release) worker.searchParams.set("release", release);
  try {
    await navigator.serviceWorker.register(worker, { updateViaCache: "none" });
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => {
        const done = () => {
          clearTimeout(timer);
          navigator.serviceWorker.removeEventListener("controllerchange", done);
          resolve();
        };
        const timer = setTimeout(done, 8000);
        navigator.serviceWorker.addEventListener("controllerchange", done);
        if (navigator.serviceWorker.controller) done();
      });
    }
  } catch {
    // Online practice remains available if offline installation is unsupported.
  }
}
await import("./engine.js");
