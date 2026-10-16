// Rasterize our original SVG; no downloaded artwork or image service is used.
import fs from "node:fs/promises";
import { deflateSync, inflateSync } from "node:zlib";
import { chromium } from "playwright";

// Recompress the same PNG scanlines; canvas optimizes encoding speed, not file size.
function optimizePNG(png) {
  const chunks = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    chunks.push({
      type: png.toString("ascii", offset + 4, offset + 8),
      bytes: png.subarray(offset, offset + 12 + length),
    });
    offset += 12 + length;
  }
  const data = deflateSync(
    inflateSync(
      Buffer.concat(
        chunks
          .filter((c) => c.type === "IDAT")
          .map((c) => c.bytes.subarray(8, -4)),
      ),
    ),
    { level: 9 },
  );
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length, 0);
  chunk.write("IDAT", 4);
  data.copy(chunk, 8);
  let crc = 0xffffffff;
  for (const byte of chunk.subarray(4, -4)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++)
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  chunk.writeUInt32BE((crc ^ 0xffffffff) >>> 0, chunk.length - 4);
  let written = false;
  return Buffer.concat([
    png.subarray(0, 8),
    ...chunks.flatMap((c) =>
      c.type !== "IDAT"
        ? [c.bytes]
        : written
          ? []
          : ((written = true), [chunk]),
    ),
  ]);
}

const directory = new URL("../assets/icons/", import.meta.url);
const svg = await fs.readFile(new URL("icon.svg", directory), "utf8");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.BROWSER_EXECUTABLE
    ? { executablePath: process.env.BROWSER_EXECUTABLE }
    : {}),
});
try {
  const page = await browser.newPage();
  for (const [name, size, scale] of [
    ["icon-192.png", 192, 1],
    ["icon-512.png", 512, 1],
    ["icon-maskable-512.png", 512, 0.85],
    ["apple-touch-icon.png", 180, 1],
    ["icon-1024.png", 1024, 1],
  ]) {
    // Maskable artwork is inset inside the central 80% safe circle. Background stays full bleed.
    const source =
      scale === 1
        ? svg
        : svg
            .replace(
              '<g fill="url(#bar)">',
              `<g transform="translate(${256 * (1 - scale)} ${256 * (1 - scale)}) scale(${scale})"><g fill="url(#bar)">`,
            )
            .replace("</svg>", "</g></svg>");
    const png = await page.evaluate(
      async ({ source, size }) => {
        const img = new Image();
        img.src =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        canvas.getContext("2d").drawImage(img, 0, 0, size, size);
        return canvas.toDataURL("image/png").split(",")[1];
      },
      { source, size },
    );
    await fs.writeFile(
      new URL(name, directory),
      optimizePNG(Buffer.from(png, "base64")),
    );
  }
} finally {
  await browser.close();
}
console.log(
  "Rendered original violet icons at 180, 192, 512, and 1024 pixels, plus maskable 512.",
);
