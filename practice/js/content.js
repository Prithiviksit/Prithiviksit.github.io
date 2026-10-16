import { validateCourse } from "./logic.js";

export function validateManifest(course) {
  const fail = (message) => {
    throw new Error(`Invalid course manifest: ${message}`);
  };
  if (
    !course.id ||
    !course.title ||
    !Array.isArray(course.units) ||
    !course.units.length
  )
    fail("course identity and units");
  const ids = new Set(),
    files = new Set();
  for (const unit of course.units) {
    if (
      !unit.id ||
      !unit.title ||
      !Array.isArray(unit.lessons) ||
      !unit.lessons.length
    )
      fail("unit metadata");
    for (const lesson of unit.lessons) {
      if (
        !/^[a-z][a-z0-9-]*$/.test(lesson.id) ||
        !lesson.title ||
        !lesson.description ||
        !Number.isInteger(lesson.minutes) ||
        lesson.minutes < 1 ||
        !/^[a-z0-9-]+\.json$/.test(lesson.file) ||
        !Array.isArray(lesson.questions) ||
        !lesson.questions.length
      )
        fail("lesson metadata");
      if (ids.has(lesson.id) || files.has(lesson.file))
        fail("duplicate lesson ID or file");
      ids.add(lesson.id);
      files.add(lesson.file);
      for (const q of lesson.questions) {
        if (!/^[a-z][a-z0-9-]*$/.test(q.id) || !q.topic || ids.has(q.id))
          fail("duplicate or incomplete question metadata");
        ids.add(q.id);
      }
    }
  }
}

export function createContentLoader(course, base, fetcher = fetch) {
  validateManifest(course);
  const lessons = new Map(
    course.units.flatMap((unit) => unit.lessons).map((l) => [l.id, l]),
  );
  const owners = new Map(
    [...lessons.values()].flatMap((l) => l.questions.map((q) => [q.id, l.id])),
  );
  const loaded = new Map();
  return {
    async lesson(id) {
      if (!lessons.has(id))
        throw new Error("That lesson is not in this course.");
      if (!loaded.has(id)) {
        const metadata = lessons.get(id);
        const request = (async () => {
          const response = await fetcher(new URL(metadata.file, base));
          if (!response.ok)
            throw new Error(`Lesson download failed (${response.status}).`);
          const lesson = await response.json();
          validateCourse(
            {
              ...course,
              units: [
                { id: "selected", title: "Selected", lessons: [metadata] },
              ],
            },
            [lesson],
          );
          for (const key of ["id", "title", "description", "minutes", "icon"]) {
            if (lesson[key] !== metadata[key])
              throw new Error(
                `Lesson metadata differs from the course index: ${key}.`,
              );
          }
          if (
            JSON.stringify(
              lesson.questions.map((q) => ({ id: q.id, topic: q.topic })),
            ) !== JSON.stringify(metadata.questions)
          )
            throw new Error("Lesson questions differ from the course index.");
          return lesson;
        })();
        loaded.set(id, request);
        request.catch(() => loaded.delete(id));
      }
      return loaded.get(id);
    },
    async questions(ids) {
      const lessonIds = [
        ...new Set(
          ids.map((id) => {
            if (!owners.has(id))
              throw new Error(
                "A saved question no longer belongs to this course.",
              );
            return owners.get(id);
          }),
        ),
      ];
      const loadedLessons = await Promise.all(
        lessonIds.map((id) => this.lesson(id)),
      );
      const questions = new Map(
        loadedLessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
      );
      return ids.map((id) => questions.get(id));
    },
  };
}
