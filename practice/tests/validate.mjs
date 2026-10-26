import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import assert from "node:assert/strict";
import { validateCourse } from "../js/logic.js";
import { createContentLoader } from "../js/content.js";

export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const read = (filename) =>
  JSON.parse(fs.readFileSync(path.join(root, filename), "utf8"));
export const course = read("courses/corporate-finance/course.json");
export const lessons = course.units
  .flatMap((unit) => unit.lessons)
  .map(({ file }) => read(`courses/corporate-finance/${file}`));
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
export const prepLessons = lessons.filter((l) => l.id.startsWith("exam-prep-"));
export const lectureLessons = lessons.filter((l) => l.id.startsWith("lec"));
assert.equal(course.units.length, 7);
assert.equal(course.units[0].kind, "exam-prep", "Exam prep precedes lectures");
assert.equal(course.units[0].lessons.length, 3);
assert.match(
  course.units[0].notice,
  /Not every lecture question or topic will be on the exam/,
);
assert.equal(lectureLessons.length, 6, "Lectures 15 through 20");
for (const lesson of lessons) {
  assert.equal(lesson.questions.length, 5);
  assert.ok(lesson.minutes >= 3 && lesson.minutes <= 5);
}
for (const [i, lesson] of lectureLessons.entries()) {
  for (const q of lesson.questions) {
    assert.ok(q.id.startsWith(`lec${15 + i}-`), q.id);
    assert.equal(q.source.lecture, 15 + i);
    if (i >= 4) {
      assert.deepEqual(q.source.chapters, [16]);
      assert.ok(q.source.exercise);
      if (q.type === "numerical") assert.ok(Number.isInteger(q.answer));
    }
    assert.ok(q.source.file.startsWith(`Lec${15 + i}_`), q.source.file);
    assert.ok(
      !/module/i.test(JSON.stringify(q.source)),
      "Only Lec sources for lectures",
    );
  }
}
for (const [i, lesson] of prepLessons.entries()) {
  const sources = [
    "homework3_core.tex",
    "mock_quiz_a_core.tex",
    "mock_quiz_b_core.tex",
  ];
  assert.ok(lesson.questions.some((q) => q.type === "numerical"));
  assert.ok(lesson.questions.some((q) => q.type === "multiple-choice"));
  for (const q of lesson.questions) {
    assert.ok(["numerical", "multiple-choice"].includes(q.type));
    assert.equal(q.source.file, sources[i]);
    if (q.type === "numerical") assert.ok(Number.isInteger(q.answer));
  }
}
assert.equal(
  prepLessons.flatMap((l) => l.questions).filter((q) => q.type === "numerical")
    .length,
  5,
);

assert.equal(
  new Set(lessons.flatMap((l) => l.questions.map((q) => q.type))).size,
  5,
);
const loader = createContentLoader(
  course,
  new URL("../courses/corporate-finance/", import.meta.url),
  async (url) => ({
    ok: true,
    json: async () => JSON.parse(fs.readFileSync(url, "utf8")),
  }),
);
await Promise.all(lessons.map((lesson) => loader.lesson(lesson.id)));
console.log(
  `Validated ${lessons.length} lessons, ${lessons.flatMap((l) => l.questions).length} questions, all five exercise types.`,
);
