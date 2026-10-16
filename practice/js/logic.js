export const TYPES = [
  "multiple-choice",
  "true-false",
  "matching",
  "sequence",
  "numerical",
];

export function shuffle(values, random = Math.random) {
  const out = [...values];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function parseNumber(value) {
  const text = String(value).trim().replace(/−/g, "-").replace(/%$/, "").trim();
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

export function isReady(question, draft) {
  if (question.type === "numerical") return parseNumber(draft) !== null;
  if (question.type === "matching")
    return question.pairs.every((p) => draft && draft[p.id]);
  if (question.type === "sequence")
    return Array.isArray(draft) && draft.length === question.items.length;
  return draft !== null && draft !== undefined;
}

export function grade(question, draft) {
  if (!isReady(question, draft)) return false;
  if (question.type === "numerical") {
    const tolerance = Math.max(
      question.absoluteTolerance,
      Math.abs(question.answer) * question.relativeTolerance,
    );
    return (
      Math.abs(parseNumber(draft) - question.answer) <=
      tolerance + Number.EPSILON * Math.max(1, Math.abs(question.answer)) * 4
    );
  }
  if (question.type === "matching")
    return question.pairs.every((p) => draft[p.id] === p.id);
  if (question.type === "sequence")
    return question.answer.every((id, i) => id === draft[i]);
  return draft === question.answer;
}

export function makeCard(question, review = false) {
  let order = [];
  if (question.type === "multiple-choice")
    order = shuffle(question.options.map((o) => o.id));
  if (question.type === "true-false") order = [true, false];
  if (question.type === "matching")
    order = shuffle(question.pairs.map((p) => p.id));
  if (question.type === "sequence") {
    order = shuffle(question.items.map((p) => p.id));
    if (order.every((id, i) => id === question.answer[i]))
      order.push(order.shift());
  }
  return {
    id: question.id,
    review,
    order,
    draft:
      question.type === "sequence"
        ? [...order]
        : question.type === "matching"
          ? {}
          : null,
    feedback: null,
  };
}

export function createSession(lesson, questions, mode = "lesson") {
  return {
    id: crypto.randomUUID(),
    startedAt: new Date().toISOString(),
    lessonId: lesson.id,
    title: lesson.title,
    mode,
    cards: questions.map((q) => makeCard(q, mode === "review")),
    index: 0,
    originalCount: questions.length,
    firstCorrect: 0,
    hearts: 5,
    combo: 0,
    xp: 0,
  };
}

export const sessionKey = (session) => `${session.mode}:${session.lessonId}`;

export function activateSession(progress, lesson, questions, mode = "lesson") {
  const key = `${mode}:${lesson.id}`;
  if (progress.active && sessionKey(progress.active) === key)
    return progress.active;
  if (progress.active)
    progress.paused[sessionKey(progress.active)] = progress.active;
  progress.active =
    progress.paused[key] || createSession(lesson, questions, mode);
  delete progress.paused[key];
  return progress.active;
}

// One submission changes all progress atomically; persisted feedback prevents duplicate XP on reload.
export function submit(progress, question) {
  const session = progress.active;
  const card = session.cards[session.index];
  if (card.feedback || !isReady(question, card.draft)) return false;
  const correct = grade(question, card.draft);
  session.combo = correct ? session.combo + 1 : 0;
  const xp = correct
    ? (card.review ? 5 : 10) + Math.min(6, (session.combo - 1) * 2)
    : 0;
  if (correct) {
    progress.review = progress.review.filter((id) => id !== question.id);
    if (session.index < session.originalCount) session.firstCorrect++;
  } else {
    session.hearts = Math.max(0, session.hearts - 1);
    if (!progress.review.includes(question.id))
      progress.review.push(question.id);
    // Keep lessons short. Misses live in the optional review queue instead of
    // extending a five-question lesson with mandatory repeats.
  }
  session.xp += xp;
  progress.xp += xp;
  const stats = progress.questions[question.id] || { correct: 0, wrong: 0 };
  stats[correct ? "correct" : "wrong"]++;
  progress.questions[question.id] = stats;
  card.feedback = { correct, xp };
  progress.history.push({
    id: `${session.id}:${session.index}`,
    sessionId: session.id,
    lessonId: session.lessonId,
    questionId: question.id,
    position: session.index,
    review: card.review,
    submittedAnswer: structuredClone(card.draft),
    correct,
    xpEarned: xp,
    answeredAt: new Date().toISOString(),
  });
  return true;
}

export function finish(progress) {
  const session = progress.active;
  const score = Math.round(
    (100 * session.firstCorrect) / session.originalCount,
  );
  if (session.mode === "lesson") {
    const previous = progress.lessons[session.lessonId];
    progress.lessons[session.lessonId] = {
      best: Math.max(previous?.best || 0, score),
      attempts: (previous?.attempts || 0) + 1,
      completed: true,
    };
  }
  const result = {
    id: session.id,
    completedAt: new Date().toISOString(),
    title: session.title,
    xp: session.xp,
    score,
    mode: session.mode,
    lessonId: session.lessonId,
  };
  progress.completedSessions.push(result);
  progress.active = null;
  return result;
}

export function validateCourse(course, lessons) {
  const check = (condition, message) => {
    if (!condition) throw new Error(`Invalid course content: ${message}`);
  };
  check(
    typeof course.id === "string" &&
      typeof course.title === "string" &&
      course.units?.length,
    "course identity and units are required",
  );
  check(
    course.units.every(
      (u) => u.id && u.title && Array.isArray(u.lessons) && u.lessons.length,
    ),
    "each unit needs lessons",
  );
  check(
    course.units.flatMap((u) => u.lessons).length === lessons.length,
    "lesson file count",
  );
  const ids = new Set();
  for (const lesson of lessons) {
    check(
      lesson.id && lesson.title && lesson.questions?.length,
      "lesson identity and questions",
    );
    check(!ids.has(lesson.id), `duplicate id ${lesson.id}`);
    ids.add(lesson.id);
    for (const q of lesson.questions) {
      check(q.id && !ids.has(q.id), `duplicate or missing question id ${q.id}`);
      ids.add(q.id);
      check(TYPES.includes(q.type), `unknown type ${q.type}`);
      for (const field of [
        "prompt",
        "topic",
        "explanation",
        "detail",
        "misconception",
      ])
        check(
          typeof q[field] === "string" && q[field].length > 0,
          `${q.id}: ${field}`,
        );
      check(q.source?.file && q.source?.section, `${q.id}: source`);
      if (q.table)
        check(
          q.table.headers?.length &&
            q.table.rows?.every((row) => row.length === q.table.headers.length),
          `${q.id}: table shape`,
        );
      if (q.type === "multiple-choice") {
        check(
          q.options?.length === 4 &&
            new Set(q.options.map((o) => o.id)).size === 4 &&
            q.options.every((o) => o.id && o.text),
          `${q.id}: four distinct choices`,
        );
        check(
          q.options.some((o) => o.id === q.answer),
          `${q.id}: answer must name a choice`,
        );
      }
      if (q.type === "true-false")
        check(typeof q.answer === "boolean", `${q.id}: boolean answer`);
      if (q.type === "numerical")
        check(
          Number.isFinite(q.answer) &&
            typeof q.unit === "string" &&
            Number.isFinite(q.absoluteTolerance) &&
            q.absoluteTolerance >= 0 &&
            Number.isFinite(q.relativeTolerance) &&
            q.relativeTolerance >= 0,
          `${q.id}: numeric answer and nonnegative tolerances`,
        );
      if (q.type === "matching")
        check(
          q.pairs?.length >= 2 &&
            q.pairs.every((p) => p.id && p.left && p.right) &&
            new Set(q.pairs.map((p) => p.id)).size === q.pairs.length,
          `${q.id}: distinct pairs`,
        );
      if (q.type === "sequence")
        check(
          q.items?.length >= 2 &&
            q.items.every((p) => p.id && p.text) &&
            new Set(q.items.map((p) => p.id)).size === q.items.length &&
            q.answer?.length === q.items.length &&
            new Set(q.answer).size === q.items.length &&
            q.answer.every((id) => q.items.some((p) => p.id === id)),
          `${q.id}: ordered answer permutation`,
        );
    }
  }
  return true;
}
