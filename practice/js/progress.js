export const STORAGE_KEY = "finpath:corporate-finance";
export const LEGACY_STORAGE_KEY = "finpath:corporate-finance:v1";

export function emptyProgress() {
  return {
    version: 2,
    courseId: "corporate-finance",
    generation: crypto.randomUUID(),
    revision: 0,
    updatedAt: null,
    xp: 0,
    lessons: {},
    questions: {},
    review: [],
    active: null,
    paused: {},
    history: [],
    completedSessions: [],
    legacyTotals: null,
  };
}

function validateSession(session) {
  if (
    !session ||
    !Array.isArray(session.cards) ||
    !session.cards.length ||
    !Number.isInteger(session.index) ||
    session.index < 0 ||
    session.index >= session.cards.length ||
    !Number.isFinite(session.hearts) ||
    !Number.isFinite(session.xp) ||
    !Number.isFinite(session.combo) ||
    !Number.isFinite(session.firstCorrect) ||
    !session.originalCount ||
    !["lesson", "review"].includes(session.mode) ||
    typeof session.lessonId !== "string" ||
    !session.cards.every(
      (card) =>
        typeof card.id === "string" &&
        Array.isArray(card.order) &&
        Object.hasOwn(card, "draft"),
    )
  ) {
    throw new Error(
      "Saved lesson has an unsupported format. Export or reset it in Settings.",
    );
  }
}

export function decodeProgress(raw) {
  const value = JSON.parse(raw);
  if (
    !value ||
    ![1, 2].includes(value.version) ||
    !Number.isFinite(value.xp) ||
    value.xp < 0 ||
    !value.lessons ||
    typeof value.lessons !== "object" ||
    !value.questions ||
    !Array.isArray(value.review) ||
    !Object.hasOwn(value, "active")
  ) {
    throw new Error(
      "Saved progress has an unsupported format. Export or reset it in Settings.",
    );
  }
  if (value.active) validateSession(value.active);
  if (value.version === 1) {
    // Keep original aggregates as a baseline; never invent missing historical answers.
    const migrated = {
      ...emptyProgress(),
      xp: value.xp,
      lessons: value.lessons,
      questions: value.questions,
      review: value.review,
      active: value.active,
    };
    migrated.legacyTotals = structuredClone({
      xp: value.xp,
      lessons: value.lessons,
      questions: value.questions,
    });
    if (migrated.active) {
      migrated.active.id = crypto.randomUUID();
      migrated.active.startedAt = null;
    }
    return migrated;
  }
  if (
    value.courseId !== "corporate-finance" ||
    typeof value.generation !== "string" ||
    !Number.isInteger(value.revision) ||
    !value.paused ||
    Array.isArray(value.paused) ||
    !Array.isArray(value.history) ||
    !Array.isArray(value.completedSessions) ||
    !value.history.every(
      (e) =>
        e.id &&
        e.sessionId &&
        e.questionId &&
        typeof e.correct === "boolean" &&
        Number.isFinite(e.xpEarned) &&
        Object.hasOwn(e, "submittedAnswer"),
    ) ||
    new Set(value.history.map((e) => e.id)).size !== value.history.length
  ) {
    throw new Error(
      "Saved progress has an unsupported format. Export or reset it in Settings.",
    );
  }
  for (const session of Object.values(value.paused)) validateSession(session);
  return value;
}

// Only this adapter knows about localStorage and browser storage events.
// Future sync adapters must still commit locally before returning from write().
export function localStorageAdapter(
  storage = localStorage,
  events = globalThis.window,
) {
  return {
    read: () =>
      storage.getItem(STORAGE_KEY) ?? storage.getItem(LEGACY_STORAGE_KEY),
    write: (raw) => storage.setItem(STORAGE_KEY, raw),
    removeLegacy: () => storage.removeItem(LEGACY_STORAGE_KEY),
    subscribe(listener) {
      if (!events) return () => {};
      const handler = (event) => {
        if (
          event.storageArea === storage &&
          (event.key === STORAGE_KEY ||
            event.key === LEGACY_STORAGE_KEY ||
            event.key === null)
        )
          listener();
      };
      events.addEventListener("storage", handler);
      return () => events.removeEventListener("storage", handler);
    },
  };
}

export function createProgressStore(adapter = localStorageAdapter()) {
  return {
    load() {
      const raw = adapter.read();
      if (raw === null) return emptyProgress();
      const value = decodeProgress(raw);
      if (JSON.parse(raw).version === 1) this.save(value);
      return value;
    },
    save(value) {
      const snapshot = {
        ...value,
        revision: value.revision + 1,
        updatedAt: new Date().toISOString(),
      };
      adapter.write(JSON.stringify(snapshot));
      value.revision = snapshot.revision;
      value.updatedAt = snapshot.updatedAt;
    },
    reset() {
      // A new generation prevents future sync from resurrecting pre-reset events.
      const value = emptyProgress();
      this.save(value);
      adapter.removeLegacy();
      return value;
    },
    exportRaw: () => adapter.read(),
    subscribe: (listener) => adapter.subscribe(listener),
  };
}
