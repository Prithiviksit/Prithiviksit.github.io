import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import { validateCourse } from "../js/logic.js";

export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const read = (filename) =>
  JSON.parse(fs.readFileSync(path.join(root, filename), "utf8"));
export const course = read("courses/corporate-finance/course.json");
export const lessons = course.units
  .flatMap((unit) => unit.lessons)
  .map((file) => read(`courses/corporate-finance/${file}`));
const ajv = new Ajv({ allErrors: true });
for (const [file, values] of [
  ["courses/course.schema.json", [course]],
  ["courses/lesson.schema.json", lessons],
]) {
  const validate = ajv.compile(read(file));
  for (const value of values) {
    if (!validate(value))
      throw new Error(`${value.id}: ${ajv.errorsText(validate.errors)}`);
  }
}
validateCourse(course, lessons);
console.log(
  `Validated ${lessons.length} lessons, ${lessons.flatMap((l) => l.questions).length} questions, all five exercise types.`,
);
