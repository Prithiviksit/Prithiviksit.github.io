import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { validateManifest } from "../js/content.js";

const directory = new URL("../courses/corporate-finance/", import.meta.url);
const manifest = new URL("course.json", directory);
const course = JSON.parse(fs.readFileSync(manifest, "utf8"));
for (const unit of course.units) {
  unit.lessons = unit.lessons.map((entry) => {
    const file = typeof entry === "string" ? entry : entry.file;
    if (!/^[a-z0-9-]+\.json$/.test(file))
      throw new Error(`Invalid lesson filename: ${file}`);
    const lesson = JSON.parse(
      fs.readFileSync(new URL(file, directory), "utf8"),
    );
    const { id, title, description, minutes, icon } = lesson;
    return {
      id,
      title,
      description,
      minutes,
      icon,
      file,
      questions: lesson.questions.map(({ id, topic }) => ({ id, topic })),
    };
  });
}
validateManifest(course);
fs.writeFileSync(manifest, JSON.stringify(course, null, 2) + "\n");
console.log(`Updated ${fileURLToPath(manifest)} from lesson files.`);
