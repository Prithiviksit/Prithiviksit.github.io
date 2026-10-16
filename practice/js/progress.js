export const STORAGE_KEY = "finpath:corporate-finance:v1";
export function emptyProgress() {
  return {
    version: 1,
    xp: 0,
    lessons: {},
    questions: {},
    review: [],
    active: null,
  };
}

export function loadProgress(storage = localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return emptyProgress();
  const value = JSON.parse(raw);
  if (
    value.version !== 1 ||
    !Number.isFinite(value.xp) ||
    value.xp < 0 ||
    !value.lessons ||
    !value.questions ||
    !Array.isArray(value.review) ||
    !Object.hasOwn(value, "active")
  )
    throw new Error(
      "Saved progress has an unsupported format. Export or reset it in Settings.",
    );
  if (value.active) {
    const a = value.active;
    if (
      !Array.isArray(a.cards) ||
      !a.cards.length ||
      !Number.isInteger(a.index) ||
      a.index < 0 ||
      a.index >= a.cards.length ||
      !Number.isFinite(a.hearts) ||
      !Number.isFinite(a.xp) ||
      !Number.isFinite(a.combo) ||
      !Number.isFinite(a.firstCorrect) ||
      !a.originalCount
    )
      throw new Error(
        "Saved lesson has an unsupported format. Export or reset it in Settings.",
      );
  }
  return value;
}

export function saveProgress(value, storage = localStorage) {
  storage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function resetProgress(storage = localStorage) {
  storage.removeItem(STORAGE_KEY);
  return emptyProgress();
}
