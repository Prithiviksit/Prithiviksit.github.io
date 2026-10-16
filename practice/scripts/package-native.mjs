// A ready-to-bundle web directory for a future native shell, without dev files.
import fs from "node:fs/promises";
const source = new URL("../", import.meta.url);
const target = new URL("../native-www/", import.meta.url);
await fs.mkdir(target, { recursive: true });
for (const directory of ["css", "js", "assets", "courses"]) {
  await fs.rm(new URL(directory, target), { recursive: true, force: true });
  await fs.cp(new URL(directory, source), new URL(directory, target), {
    recursive: true,
  });
}
for (const file of ["index.html", "manifest.webmanifest"]) {
  let value = await fs.readFile(new URL(file, source), "utf8");
  if (file === "index.html")
    value = value.replace(
      'name="finpath-runtime" content="web"',
      'name="finpath-runtime" content="native"',
    );
  await fs.writeFile(new URL(file, target), value);
}
console.log(
  `Native web assets prepared in ${target.pathname}. No SDK, account, signing, or store submission performed.`,
);
