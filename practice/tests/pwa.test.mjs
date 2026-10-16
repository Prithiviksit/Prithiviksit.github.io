import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createHash } from "node:crypto";

const base = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, base));
test("install manifest has scoped standalone identity and valid platform PNGs", () => {
  const manifest = JSON.parse(read("manifest.webmanifest"));
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.id, "./");
  assert.equal(manifest.start_url, "./");
  assert.equal(manifest.scope, "./");
  assert.ok(
    manifest.icons.some((i) => i.sizes === "192x192" && i.purpose === "any"),
  );
  assert.ok(
    manifest.icons.some(
      (i) => i.sizes === "512x512" && i.purpose === "maskable",
    ),
  );
  for (const icon of [
    ...manifest.icons,
    { src: "assets/icons/apple-touch-icon.png", sizes: "180x180" },
    { src: "assets/icons/icon-1024.png", sizes: "1024x1024" },
  ]) {
    const png = read(icon.src),
      size = Number(icon.sizes.split("x")[0]);
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  assert.match(read("index.html").toString(), /rel="apple-touch-icon"/);
});
test("release index matches all shipped files and excludes lesson bodies from the initial shell", () => {
  const context = { self: {} };
  vm.runInNewContext(read("sw-assets.js").toString(), context);
  const { files } = context.self.FINPATH_ASSETS;
  for (const entry of files)
    assert.equal(
      createHash("sha256").update(read(entry.path)).digest("hex"),
      entry.sha256,
      entry.path,
    );
  const course = JSON.parse(read("courses/corporate-finance/course.json"));
  for (const lesson of course.units.flatMap((u) => u.lessons)) {
    const entry = files.find((e) => e.path.endsWith("/" + lesson.file));
    assert.ok(entry);
    assert.equal(entry.shell, false);
  }
  assert.ok(files.some((e) => e.path.endsWith(".woff2")));
  assert.ok(
    files.filter((e) => e.path.includes("katex")).every((e) => !e.shell),
  );
});
