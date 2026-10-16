import {
  validateCourse,
  createSession,
  submit,
  finish,
  isReady,
} from "./logic.js";
import {
  loadProgress,
  saveProgress,
  resetProgress,
  emptyProgress,
  STORAGE_KEY,
} from "./progress.js";

const app = document.querySelector("#app");
const dialog = document.querySelector("#dialog");
const announce = (message) => {
  document.querySelector("#announcer").textContent = message;
};
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const paths = {
  path: '<path d="M5 19h4a4 4 0 0 0 0-8H8a3 3 0 0 1 0-6h9"/><path d="m14 2 3 3-3 3"/>',
  review: '<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/><path d="M12 8v5l3 2"/>',
  trophy:
    '<path d="M8 3h8v7a4 4 0 0 1-8 0ZM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4M12 14v6m-4 1h8"/>',
  book: '<path d="M12 5C8 2 4 3 3 4v15c4-2 7-1 9 1 2-2 5-3 9-1V4c-3-2-6-1-9 1Zm0 0v15"/>',
  settings:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
  chart: '<path d="M4 20V4m0 16h17M8 15l4-5 4 2 5-8"/>',
  radar:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m12 12 7-7"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 17l10 5 10-5"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-8Z"/>',
  heart:
    '<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 4v3"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  sparkle: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
  shield:
    '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z"/><path d="m8 12 3 3 5-6"/>',
};
const icon = (name, className = "") =>
  `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
let course,
  lessons,
  questions,
  progress,
  view = "learn",
  selectedPair = null,
  storageError = "",
  loadError = false;

function math(root = app) {
  if (!window.renderMathInElement)
    throw new Error(
      "The local math renderer could not load. Reload this page.",
    );
  window.renderMathInElement(root, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "$$", right: "$$", display: true },
    ],
    throwOnError: true,
    trust: false,
  });
}

function persist() {
  try {
    saveProgress(progress);
    storageError = "";
  } catch {
    storageError =
      "Progress could not be saved. Check browser storage before closing this page.";
    announce(storageError);
  }
  const notice = document.querySelector("#storage-notice");
  if (notice) {
    notice.hidden = !storageError;
    notice.textContent = storageError;
  }
}

const completed = () =>
  lessons.filter((l) => progress.lessons[l.id]?.completed).length;
const available = (i) =>
  i === 0 || progress.lessons[lessons[i - 1].id]?.completed;
const nextLesson = () =>
  lessons.find((l) => !progress.lessons[l.id]?.completed) || lessons[0];
const button = (action, label, cls = "button secondary", extra = "") =>
  `<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;

function nav() {
  return `<nav class="navigation" aria-label="Practice navigation">${[
    ["learn", "path", "Learn"],
    ["review", "review", "Review"],
    ["progress", "trophy", "Progress"],
  ]
    .map(
      ([id, i, label]) =>
        `<button data-action="nav" data-view="${id}" class="nav-link ${view === id ? "active" : ""}" ${view === id ? 'aria-current="page"' : ""}>${icon(i)}<span>${label}</span>${id === "review" && progress.review.length ? `<small>${progress.review.length}</small>` : ""}</button>`,
    )
    .join("")}</nav>`;
}

function shell(content) {
  app.innerHTML = `<aside class="sidebar"><a class="brand" href="./" aria-label="Finpath home"><img src="assets/mark.svg" alt="" width="38" height="38">finpath<span class="brand-dot">.</span></a><div class="sidebar-caption">A LITTLE PRACTICE. A LOT OF POSSIBILITY.</div>${nav()}<div class="sidebar-bottom"><div class="course-label">YOUR CLASSROOM</div><strong>Corporate Finance</strong><span>From concepts to confidence.</span><button class="text-button" data-action="notes">${icon("book")} Field notes</button><button class="text-button" data-action="settings">${icon("settings")} Settings</button><a class="back-site" href="../">← Academic website</a></div></aside><div class="workspace"><header class="topbar"><div class="mobile-brand"><img src="assets/mark.svg" alt="" width="28" height="28">finpath.</div><div class="breadcrumb">Corporate Finance <span>/</span> <strong>Practice</strong></div><div class="top-meta"><span class="saved-label"><i></i> Saved on this device</span><span class="xp-chip">${icon("bolt")} ${progress.xp} <small>XP</small></span><button class="avatar" aria-label="Open settings" data-action="settings">CF</button></div></header><div id="storage-notice" class="storage-notice" role="alert" ${storageError ? "" : "hidden"}>${esc(storageError)}</div><main id="main" tabindex="-1">${content}</main><footer class="site-footer">Small steps. Stronger intuition.<span>Corporate Finance · Risk & Return</span></footer></div><div class="mobile-nav">${nav()}</div>`;
  math();
}

function illustration() {
  return `<svg class="hero-art" viewBox="0 0 300 230" aria-hidden="true"><defs><linearGradient id="coin" x2=".8" y2="1"><stop stop-color="#c4b5fd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient><linearGradient id="glass"><stop stop-color="#a78bfa" stop-opacity=".25"/><stop offset="1" stop-color="#a78bfa" stop-opacity=".03"/></linearGradient></defs><ellipse cx="161" cy="119" rx="118" ry="78" fill="none" stroke="#a78bfa" stroke-opacity=".2" stroke-dasharray="4 7" transform="rotate(-24 161 119)"/><path d="M37 170h230" stroke="#a78bfa" stroke-opacity=".12"/><rect x="66" y="112" width="37" height="58" rx="9" fill="url(#glass)" stroke="#a78bfa" stroke-opacity=".3"/><rect x="121" y="78" width="37" height="92" rx="9" fill="url(#glass)" stroke="#a78bfa" stroke-opacity=".5"/><rect x="176" y="38" width="37" height="132" rx="9" fill="url(#glass)" stroke="#a78bfa" stroke-opacity=".7"/><path d="m47 120 47-36 39 17 56-63 43 9" fill="none" stroke="#c4b5fd" stroke-width="3" stroke-linecap="round"/><circle cx="230" cy="46" r="5" fill="#c4b5fd"/><g transform="translate(179 128) rotate(-12)"><rect x="-32" y="-32" width="74" height="74" rx="23" fill="#4c1d95"/><rect x="-34" y="-39" width="74" height="74" rx="23" fill="url(#coin)" stroke="#c4b5fd"/><path d="m-13 9 30-23m-17 0h17V3" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g><circle cx="61" cy="57" r="17" fill="#f59e0b" fill-opacity=".12" stroke="#fbbf24" stroke-opacity=".5"/><path d="m61 48 2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" fill="#fbbf24"/><path d="m258 119 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#a78bfa"/></svg>`;
}

function momentum() {
  const total = lessons.reduce((sum, l) => sum + l.questions.length, 0);
  const mastered = Object.values(progress.questions).filter(
    (q) => q.correct > 0,
  ).length;
  return `<aside class="right-column"><section class="panel momentum"><div class="eyebrow">YOUR MOMENTUM ${icon("sparkle")}</div><div class="ring" style="--percent:${(100 * completed()) / lessons.length}"><div><strong>${completed()}<span>/${lessons.length}</span></strong><small>lessons complete</small></div></div><div class="stat-pair"><div><strong class="amber">${progress.xp}</strong><span>Total XP</span></div><div><strong>${mastered}<small>/${total}</small></strong><span>Practiced correctly</span></div></div></section><section class="panel daily-note"><div class="note-icon">${icon("book")}</div><div class="eyebrow">A THOUGHT TO KEEP</div><h3>Risk is about<br>the company it keeps.</h3><p>An asset’s role in your portfolio matters as much as its risk on its own.</p><button class="text-button violet" data-action="notes">Open field notes ${icon("arrow")}</button></section><section class="gentle-note">${icon("heart")}<p>Room to make mistakes.<br><span>Retry freely. Keep your progress.</span></p></section></aside>`;
}

function home() {
  const next = nextLesson();
  const active = progress.active;
  let index = 0;
  const path = course.units
    .map(
      (unit, unitIndex) =>
        `<section class="unit"><div class="unit-heading"><span class="unit-number">0${unitIndex + 1}</span><div><h2>${esc(unit.title)}</h2><p>${esc(unit.description)}</p></div></div><div class="lesson-path">${unit.lessons
          .map(() => {
            const i = index++;
            const l = lessons[i];
            const done = progress.lessons[l.id];
            const unlocked = available(i);
            const current = !done && unlocked;
            return `<div class="lesson-stop ${i % 2 ? "offset" : ""} ${current ? "current" : done ? "complete" : "locked"}"><button class="lesson-node" data-action="start" data-id="${esc(l.id)}" ${unlocked ? "" : "disabled"} aria-label="${esc(l.title)}${done ? ", completed, best " + done.best + "%" : current ? ", start lesson" : ", locked"}">${icon(done ? "check" : unlocked ? l.icon : "lock")}</button><div class="lesson-copy">${current ? '<span class="start-label">YOUR NEXT STEP</span>' : ""}<h3>${esc(l.title)}</h3><p>${esc(l.description)}</p><span class="lesson-meta">${done ? `${icon("check")} Completed · ${done.best}% best` : unlocked ? `${icon("clock")} ${l.minutes} min · ${l.questions.length} questions` : `Complete ${esc(lessons[i - 1].title)} to unlock`}</span></div>${current ? button("start", icon("arrow"), "node-go", `data-id="${esc(l.id)}" aria-label="Start ${esc(l.title)}"`) : ""}</div>`;
          })
          .join("")}</div></section>`,
    )
    .join("");
  shell(
    `<section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="tiny-line"></span> THE PRACTICE LAB</div><h1>Small steps.<br><span>Sharper instincts.</span></h1><p>Make sense of risk. Build a little confidence.<br>Your next breakthrough is a few questions away.</p><button data-action="${active ? "resume" : "start"}" data-id="${esc(next.id)}" class="button primary">${active ? "Resume lesson" : completed() === lessons.length ? "Practice again" : "Let’s practice"} ${icon("arrow")}</button><span class="hero-time">${icon("clock")} About 4 minutes</span></div>${illustration()}</section><div class="learning-grid"><div><div class="section-heading"><div><div class="eyebrow">YOUR LEARNING PATH</div><h2>${esc(course.topic)}</h2></div><span class="section-count">${completed()} of ${lessons.length} complete</span></div><div class="course-progress" role="progressbar" aria-label="Course completion" aria-valuenow="${completed()}" aria-valuemin="0" aria-valuemax="${lessons.length}"><span style="width:${(100 * completed()) / lessons.length}%"></span></div>${path}<div class="path-finish">${icon("trophy")}<span>${completed() === lessons.length ? "Path complete. Keep your intuition sharp with review." : "A stronger financial instinct starts here."}</span></div></div>${momentum()}</div>`,
  );
}

function reviewPage() {
  const ids = progress.review;
  shell(
    `<div class="page-heading"><div class="eyebrow">MAKE IT STICK</div><h1>A second look.</h1><p>Small mistakes are useful clues. Revisit them at your own pace.</p></div><section class="panel review-panel"><div class="large-symbol">${icon(ids.length ? "review" : "check")}</div><h2>${ids.length ? `${ids.length} question${ids.length > 1 ? "s" : ""} to revisit` : "A clear review queue"}</h2><p>${ids.length ? "Each correct answer clears a question from your queue. Your lesson progress stays with you." : "Missed questions will appear here. Start a lesson and let curiosity lead."}</p>${button(ids.length ? "start-review" : "nav", ids.length ? "Start review " + icon("arrow") : "Back to learning " + icon("arrow"), "button primary", 'data-view="learn"')}</section>${ids.length ? `<div class="review-list">${ids.map((id) => `<div>${icon("review")}<span>${esc(questions.get(id).topic)}</span></div>`).join("")}</div>` : ""}`,
  );
}

function progressPage() {
  shell(
    `<div class="page-heading"><div class="eyebrow">SEE HOW FAR YOU’VE COME</div><h1>Progress, earned.</h1><p>Every question is another rep for your financial intuition.</p></div><div class="progress-summary"><section class="panel"><span class="amber">${icon("bolt")}</span><strong>${progress.xp}</strong><p>Total XP earned</p></section><section class="panel"><span class="violet">${icon("trophy")}</span><strong>${completed()} / ${lessons.length}</strong><p>Lessons completed</p></section><section class="panel"><span class="mint">${icon("review")}</span><strong>${progress.review.length}</strong><p>Questions to revisit</p></section></div><div class="section-heading"><h2>Your lesson record</h2><span class="muted">Best first-pass scores</span></div>${lessons
      .map((l, i) => {
        const record = progress.lessons[l.id];
        return `<section class="record panel"><div class="record-icon">${icon(l.icon)}</div><div><h3>${esc(l.title)}</h3><p>${record ? `${record.attempts} attempt${record.attempts > 1 ? "s" : ""} · ${record.best === 100 ? "Full marks" : record.best >= 80 ? "Strong foundation" : "Keep building"}` : "Your progress starts with a first try."}</p></div><strong>${record ? record.best + "%" : "—"}</strong>${button("start", record ? "Practice" : "Start", "button secondary small", `data-id="${l.id}" ${available(i) ? "" : "disabled"}`)}</section>`;
      })
      .join("")}`,
  );
}

function render() {
  if (view === "lesson") renderLesson();
  else if (view === "review") reviewPage();
  else if (view === "progress") progressPage();
  else home();
}

function goHome(target = "learn") {
  view = target;
  render();
  window.scrollTo(0, 0);
  document.querySelector("#main")?.focus({ preventScroll: true });
}

function start(id, mode = "lesson") {
  if (progress.active) {
    if (progress.active.lessonId === id && progress.active.mode === mode) {
      view = "lesson";
      render();
      return;
    }
    openDialog(
      "A lesson is in progress",
      `<p>Resume your saved question, or start this new session. XP and completed lessons are kept. Starting a new session replaces the unfinished attempt.</p>${button("resume", "Resume saved lesson", "button primary")}${button("replace-session", "Start new session", "button secondary", `data-id="${esc(id)}" data-mode="${mode}"`)}`,
    );
    return;
  }
  if (mode === "review") {
    if (!progress.review.length) return;
    const ids = progress.review.slice(0, 5);
    progress.active = createSession(
      { id: "review", title: "A second look" },
      ids.map((id) => questions.get(id)),
      "review",
    );
  } else {
    const i = lessons.findIndex((l) => l.id === id);
    if (i < 0 || !available(i)) return;
    progress.active = createSession(lessons[i], lessons[i].questions);
  }
  selectedPair = null;
  persist();
  view = "lesson";
  render();
  window.scrollTo(0, 0);
  document.querySelector("#question-title")?.focus();
}

function current() {
  const session = progress.active;
  const card = session.cards[session.index];
  return { session, card, q: questions.get(card.id) };
}

function answerLabel(q) {
  if (q.type === "multiple-choice")
    return q.options.find((o) => o.id === q.answer).text;
  if (q.type === "true-false") return q.answer ? "True" : "False";
  if (q.type === "numerical") return `${q.answer} ${q.unit}`;
  if (q.type === "sequence")
    return q.answer
      .map(
        (id, i) => `${i + 1}. ${q.items.find((item) => item.id === id).text}`,
      )
      .join(" → ");
  return q.pairs.map((p) => `${p.left}: ${p.right}`).join(" • ");
}

function answers(q, card) {
  const checked = !!card.feedback;
  if (q.type === "multiple-choice" || q.type === "true-false")
    return `<div class="options ${q.type === "true-false" ? "binary" : ""}" role="group" aria-label="Answer choices">${card.order
      .map((id, i) => {
        const chosen = card.draft === id;
        const right = checked && id === q.answer;
        const wrong = checked && chosen && !right;
        return `<button class="option ${chosen ? "selected" : ""} ${right ? "correct" : ""} ${wrong ? "incorrect" : ""}" data-action="choose" data-index="${i}" aria-pressed="${chosen}" ${checked ? "disabled" : ""}><span class="key">${i + 1}</span><span>${esc(q.type === "true-false" ? (id ? "True" : "False") : q.options.find((o) => o.id === id).text)}</span>${right ? icon("check") : wrong ? icon("close") : ""}<span class="sr-only">${right ? "Correct answer" : wrong ? "Incorrect answer" : ""}</span></button>`;
      })
      .join("")}</div>`;
  if (q.type === "numerical")
    return `<label class="number-label" for="number-answer">Your answer <span>in ${esc(q.unit)}</span></label><div class="number-wrap ${checked ? (card.feedback.correct ? "correct" : "incorrect") : ""}"><input id="number-answer" type="text" inputmode="decimal" autocomplete="off" placeholder="Type a number" value="${esc(card.draft ?? "")}" ${checked ? "disabled" : ""} aria-describedby="number-help"><span>${q.unit === "percentage points" ? "pp" : esc(q.unit)}</span><button class="sign-toggle" data-action="toggle-sign" aria-label="Toggle positive or negative" ${checked ? "disabled" : ""}>±</button></div><p class="input-help" id="number-help">${q.unit === "%" ? "Enter 8 for 8%. Use ± for a negative return." : q.unit === "percentage points" ? "Enter the difference in percentage points, for example 6." : `Enter a number in ${esc(q.unit)}. Use ± to change its sign.`}</p>`;
  if (q.type === "sequence")
    return `<ol class="sequence">${card.draft.map((id, i) => `<li class="${checked ? (id === q.answer[i] ? "correct" : "incorrect") : ""}"><span class="key">${checked ? icon(id === q.answer[i] ? "check" : "close") : i + 1}</span><span>${esc(q.items.find((item) => item.id === id).text)}${checked ? `<span class="sr-only">${id === q.answer[i] ? "Correct position" : "Incorrect position"}</span>` : ""}</span><div class="move-buttons"><button class="icon-button" data-action="move" data-index="${i}" data-step="-1" aria-label="Move ${esc(q.items.find((item) => item.id === id).text)} up" ${checked || i === 0 ? "disabled" : ""}>${icon("up")}</button><button class="icon-button" data-action="move" data-index="${i}" data-step="1" aria-label="Move ${esc(q.items.find((item) => item.id === id).text)} down" ${checked || i === card.draft.length - 1 ? "disabled" : ""}>${icon("down")}</button></div></li>`).join("")}</ol>`;
  return `<p class="input-help">Tap a concept, then its match. Paired tiles share a number. Select again to change.</p><div class="matching"><div>${q.pairs.map((p, i) => `<button class="match-tile ${selectedPair === p.id ? "selected" : ""} ${card.draft[p.id] ? "paired" : ""} ${checked ? (card.draft[p.id] === p.id ? "correct" : "incorrect") : ""}" data-action="pair-left" data-id="${p.id}" aria-pressed="${selectedPair === p.id}" ${checked ? "disabled" : ""}><span class="pair-tag">${i + 1}</span>${esc(p.left)}${checked ? `<small>${card.draft[p.id] === p.id ? "✓ Correct pair" : "× Revisit this pair"}</small>` : ""}</button>`).join("")}</div><div>${card.order
    .map((id) => {
      const pair = q.pairs.find((p) => p.id === id);
      const left = Object.keys(card.draft).find(
        (key) => card.draft[key] === id,
      );
      return `<button class="match-tile ${left ? "paired" : ""} ${checked ? (left === id ? "correct" : "incorrect") : ""}" data-action="pair-right" data-id="${id}" ${checked ? "disabled" : ""}><span class="pair-tag">${left ? q.pairs.findIndex((p) => p.id === left) + 1 : "·"}</span>${esc(pair.right)}</button>`;
    })
    .join("")}</div></div>`;
}

function renderLesson() {
  if (!progress.active) return goHome();
  const { session: s, card, q } = current();
  const checked = !!card.feedback;
  const typeLabels = {
    "multiple-choice": "Choose the best answer",
    "true-false": "True or false?",
    numerical: "Work the numbers",
    matching: "Connect the ideas",
    sequence: "Put it in order",
  };
  app.innerHTML = `<div class="lesson-screen"><header class="lesson-top"><button class="icon-button exit" data-action="exit" aria-label="Save and exit lesson">${icon("close")}</button><div class="lesson-progress-wrap"><div class="lesson-top-title"><span>${esc(s.title)}</span><span>${s.index + 1} / ${s.cards.length}</span></div><div class="lesson-progress" role="progressbar" aria-label="Lesson progress" aria-valuenow="${s.index + (checked ? 1 : 0)}" aria-valuemin="0" aria-valuemax="${s.cards.length}"><span style="width:${(100 * (s.index + (checked ? 1 : 0))) / s.cards.length}%"></span></div></div><span class="heart-count" aria-label="${s.hearts} hearts remaining">${icon("heart")} ${s.hearts}</span><span class="xp-chip">${icon("bolt")} ${s.xp}<small> XP</small></span></header><div id="storage-notice" class="storage-notice" role="alert" ${storageError ? "" : "hidden"}>${esc(storageError)}</div><main id="main" class="exercise"><div class="exercise-kicker"><span>${card.review ? icon("review") + " SECOND LOOK" : esc(q.topic)}</span><span>${icon("book")} Risk & return</span></div>${s.hearts === 0 ? '<div class="practice-mode">Practice mode · Keep going at your own pace. Your XP is safe.</div>' : ""}<div class="question-type">${typeLabels[q.type]}</div><h1 id="question-title" tabindex="-1">${esc(q.prompt)}</h1>${q.context ? `<p class="question-context">${esc(q.context)}</p>` : ""}${q.table ? `<div class="case-table"><table><caption class="sr-only">Question scenario</caption><thead><tr>${q.table.headers.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${q.table.rows.map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>` : ""}${answers(q, card)}</main><footer class="exercise-footer ${checked ? (card.feedback.correct ? "success-footer" : "error-footer") : ""}"><div class="footer-inner">${checked ? `<div class="feedback" role="status"><span class="feedback-symbol">${icon(card.feedback.correct ? "check" : "review")}</span><div><h2>${card.feedback.correct ? ["Nicely reasoned.", "You’ve got it.", "That’s the idea."][s.index % 3] : "A useful one to revisit."}</h2><p>${esc(q.explanation)}</p>${!card.feedback.correct ? `<div class="correct-answer"><strong>Correct answer:</strong> ${esc(answerLabel(q))}</div>` : ""}<span class="reward">${card.feedback.xp ? `+${card.feedback.xp} XP${s.combo > 1 ? ` · ${s.combo} in a row` : ""}` : "Saved for review · Mistakes are part of learning"}</span></div></div><div class="feedback-actions">${button("why", "Why? " + icon("book"), "button secondary")}${button("continue", "Continue " + icon("arrow"), "button primary", 'id="continue-button"')}</div>` : `<span class="keyboard-hint">${q.type === "multiple-choice" || q.type === "true-false" ? "Number keys to choose · " : ""}<kbd>Enter</kbd> to check</span>${button("check", "Check answer", "button primary", 'id="check-button" ' + (isReady(q, card.draft) ? "" : "disabled"))}`}</div></footer></div>`;
  math();
}

function showResult(result) {
  view = "complete";
  shell(
    `<section class="completion"><div class="celebration" aria-hidden="true"><i></i><i></i><i></i><i></i><div class="achievement">${icon("trophy")}</div></div><div class="eyebrow">${result.mode === "review" ? "REVIEW COMPLETE" : "LESSON COMPLETE"}</div><h1>One step sharper.</h1><p>${esc(result.title)} is in the books.<br>${result.score === 100 ? "Careful thinking looks good on you." : "Keep the insight. Come back to the tricky parts."}</p><div class="result-stats"><div><span>Total earned</span><strong class="amber">${icon("bolt")} ${result.xp} XP</strong></div><div><span>First-pass accuracy</span><strong>${result.score}%</strong></div></div>${progress.review.length ? `<p>${progress.review.length} question${progress.review.length > 1 ? "s" : ""} waiting in your review queue.</p>` : ""}<div class="completion-actions">${button("nav", "Back to the path " + icon("arrow"), "button primary", 'data-view="learn"')}${progress.review.length ? button("start-review", "Review missed questions", "button secondary") : ""}</div><p class="small muted">Progress saved on this device. Your next lesson is ready.</p></section>`,
  );
  document.querySelector("#main")?.focus();
}

function openDialog(title, content, kind = "") {
  dialog.className = kind;
  dialog.innerHTML = `<div class="dialog-top"><span class="dialog-brand">${icon(kind === "explanation-dialog" ? "book" : "settings")}</span><button class="icon-button" data-action="close-dialog" aria-label="Close dialog">${icon("close")}</button></div><h2 id="dialog-title">${esc(title)}</h2>${content}`;
  math(dialog);
  if (!dialog.open) dialog.showModal();
}

function showWhy() {
  const { q, card } = current();
  if (!card.feedback) return;
  openDialog(
    "Let’s unpack it.",
    `<div class="eyebrow">${esc(q.topic)}</div><p class="explain-question">${esc(q.prompt)}</p><h3>The intuition</h3><p>${esc(q.detail)}</p><div class="misconception"><h3>A common trap</h3><p>${esc(q.misconception)}</p></div><details class="source-note"><summary>From your course</summary><p>${esc(q.source.file)}<br>${esc(q.source.section)}<br>${q.source.kind === "adapted" ? "Adapted from the lecture." : "Original practice application of the lecture concept."}</p></details>${button("close-dialog", "Got it " + icon("check"), "button primary")}`,
    "explanation-dialog",
  );
}

function notes() {
  openDialog(
    "Your field notes",
    `<p>Six ideas to carry into your next question.</p><dl class="field-notes"><dt>Expected return</dt><dd>A probability-weighted average, not a promise.</dd><dt>Volatility</dt><dd>The spread of returns around their average. Upside and downside both count.</dd><dt>Diversification</dt><dd>Combine different exposures. Shared market risk can remain.</dd><dt>Risk premium</dt><dd>Expected return above the risk-free rate over the same horizon.</dd><dt>Leverage</dt><dd>Debt concentrates changes in asset value on a smaller equity stake.</dd><dt>Beta</dt><dd>Sensitivity to market returns. It is neither total volatility nor an exact daily multiplier.</dd></dl>${button("close-dialog", "Back to practice", "button primary")}`,
  );
}

function settings() {
  openDialog(
    "Your practice, your pace",
    `<p>Progress lives in this browser on this device. No account is needed. Clearing browser data removes saved progress.</p>${storageError ? `<p class="storage-notice">${esc(storageError)}</p>` : ""}<div class="setting-row"><div><h3>Save a copy</h3><p>Export progress as a JSON file for your records.</p></div>${button("export", "Export", "button secondary small")}</div><div class="setting-row"><div><h3>A fresh start</h3><p>Clear lesson scores, XP, and your review queue.</p></div>${button("reset-step", "Reset progress", "button danger small")}</div>`,
  );
}

function checkAnswer() {
  const { q } = current();
  if (!submit(progress, q)) return;
  selectedPair = null;
  persist();
  renderLesson();
  const { card } = current();
  announce(
    `${card.feedback.correct ? "Correct." : "Not quite."} ${q.explanation}`,
  );
  document.querySelector("#continue-button").focus({ preventScroll: true });
  document
    .querySelector(".exercise-footer")
    .scrollIntoView({ behavior: "instant", block: "nearest" });
}

document.addEventListener("input", (event) => {
  if (event.target.id === "number-answer") {
    const { card, q } = current();
    card.draft = event.target.value;
    persist();
    document.querySelector("#check-button").disabled = !isReady(q, card.draft);
  }
});

document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const action = el.dataset.action;
  if (
    loadError &&
    ![
      "settings",
      "reset-step",
      "reset-confirm",
      "close-dialog",
      "export",
    ].includes(action)
  ) {
    settings();
    return;
  }
  if (action === "close-dialog") {
    dialog.close();
    return;
  }
  if (action === "nav") {
    goHome(el.dataset.view);
    return;
  }
  if (action === "start") {
    start(el.dataset.id);
    return;
  }
  if (action === "start-review") {
    start("review", "review");
    return;
  }
  if (action === "resume") {
    dialog.close();
    view = "lesson";
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (action === "replace-session") {
    progress.active = null;
    dialog.close();
    start(el.dataset.id, el.dataset.mode);
    return;
  }
  if (action === "settings") {
    settings();
    return;
  }
  if (action === "notes") {
    notes();
    return;
  }
  if (action === "reset-step") {
    openDialog(
      "Reset all progress?",
      `<p>This clears all completed lessons, scores, XP, the review queue, and your saved question in this browser. This cannot be undone.</p>${button("close-dialog", "Keep my progress", "button primary")}${button("reset-confirm", "Yes, reset everything", "button danger")}`,
    );
    return;
  }
  if (action === "reset-confirm") {
    try {
      progress = resetProgress();
      storageError = "";
      loadError = false;
      dialog.close();
      goHome();
      announce("Progress reset.");
    } catch {
      storageError =
        "Browser storage is unavailable. Progress could not be reset.";
      settings();
    }
    return;
  }
  if (action === "export") {
    let raw;
    try {
      raw = loadError
        ? localStorage.getItem(STORAGE_KEY)
        : JSON.stringify(progress, null, 2);
    } catch {
      raw = JSON.stringify(progress, null, 2);
    }
    const url = URL.createObjectURL(
      new Blob([raw], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "finpath-progress.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
  if (action === "exit") {
    persist();
    goHome();
    return;
  }
  if (action === "why") {
    showWhy();
    return;
  }
  if (action === "check") {
    checkAnswer();
    return;
  }
  if (action === "toggle-sign") {
    const { card } = current();
    if (card.feedback) return;
    const value = String(card.draft ?? "");
    card.draft = value.startsWith("-")
      ? value.slice(1)
      : "-" + value.replace(/^\+/, "");
    persist();
    renderLesson();
    document.querySelector("#number-answer").focus();
    return;
  }
  if (action === "continue") {
    const { session, card } = current();
    if (!card.feedback) return;
    if (session.index + 1 >= session.cards.length) {
      const result = finish(progress);
      persist();
      showResult(result);
    } else {
      session.index++;
      selectedPair = null;
      persist();
      renderLesson();
      document.querySelector("#question-title").focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
    return;
  }
  if (!["choose", "move", "pair-left", "pair-right"].includes(action)) return;
  const { card, q } = current();
  if (card.feedback) return;
  if (action === "choose") card.draft = card.order[Number(el.dataset.index)];
  if (action === "move") {
    const i = Number(el.dataset.index),
      j = i + Number(el.dataset.step);
    if (j < 0 || j >= card.draft.length) return;
    [card.draft[i], card.draft[j]] = [card.draft[j], card.draft[i]];
    announce(`Moved to position ${j + 1}.`);
  }
  if (action === "pair-left") selectedPair = el.dataset.id;
  if (action === "pair-right") {
    if (!selectedPair) {
      announce("Choose a concept on the left first.");
      return;
    }
    for (const key of Object.keys(card.draft))
      if (card.draft[key] === el.dataset.id) delete card.draft[key];
    card.draft[selectedPair] = el.dataset.id;
    announce(
      `Paired ${q.pairs.find((p) => p.id === selectedPair).left} with ${q.pairs.find((p) => p.id === el.dataset.id).right}.`,
    );
    selectedPair = null;
  }
  const focusAction =
    action === "move"
      ? `[data-action="move"][data-index="${Number(el.dataset.index) + Number(el.dataset.step)}"][data-step="${el.dataset.step}"]`
      : `[data-action="${action}"]${el.dataset.id ? `[data-id="${el.dataset.id}"]` : `[data-index="${el.dataset.index}"]`}`;
  persist();
  renderLesson();
  const target = document.querySelector(focusAction);
  if (target && !target.disabled) target.focus({ preventScroll: true });
  else if (action === "move")
    document
      .querySelector(
        `[data-action="move"][data-index="${Number(el.dataset.index) + Number(el.dataset.step)}"]:not(:disabled)`,
      )
      ?.focus({ preventScroll: true });
});

document.addEventListener("keydown", (event) => {
  if (
    dialog.open ||
    view !== "lesson" ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.repeat
  )
    return;
  const inInput = event.target.matches("input,textarea,select");
  const { q, card } = current();
  if (
    !inInput &&
    !card.feedback &&
    /^[1-4]$/.test(event.key) &&
    ["multiple-choice", "true-false"].includes(q.type)
  ) {
    event.preventDefault();
    document
      .querySelector(
        `[data-action="choose"][data-index="${Number(event.key) - 1}"]`,
      )
      ?.click();
  }
  if (event.key === "Enter") {
    if (
      event.target.closest(
        '[data-action="why"],[data-action="exit"],[data-action="move"],[data-action^="pair-"],[data-action="toggle-sign"]',
      )
    )
      return;
    event.preventDefault();
    document
      .querySelector(card.feedback ? "#continue-button" : "#check-button")
      ?.click();
  }
});

// Avoid two open tabs silently overwriting each other's latest saved state.
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  window.location.reload();
});

async function init() {
  try {
    const base = new URL("../courses/corporate-finance/", import.meta.url);
    const read = async (file) => {
      const response = await fetch(new URL(file, base));
      if (!response.ok)
        throw new Error(`Could not load ${file} (${response.status}).`);
      return response.json();
    };
    course = await read("course.json");
    lessons = await Promise.all(
      course.units.flatMap((u) => u.lessons).map(read),
    );
    validateCourse(course, lessons);
    questions = new Map(
      lessons.flatMap((l) => l.questions).map((q) => [q.id, q]),
    );
    try {
      progress = loadProgress();
      if (
        progress.review.some((id) => !questions.has(id)) ||
        (progress.active &&
          (progress.active.cards.some((c) => !questions.has(c.id)) ||
            (progress.active.mode === "lesson" &&
              !lessons.some((l) => l.id === progress.active.lessonId))))
      )
        throw new Error(
          "Saved questions no longer match this course. Export or reset progress in Settings.",
        );
    } catch (error) {
      progress = emptyProgress();
      storageError = error.message;
      loadError = true;
      shell(
        `<section class="panel page-heading"><h1>Let’s check your saved progress.</h1><p>${esc(error.message)}</p>${button("settings", "Open settings", "button primary")}</section>`,
      );
      return;
    }
    view = progress.active ? "lesson" : "learn";
    render();
  } catch (error) {
    app.innerHTML = `<main id="main" class="loading"><h1>Practice could not load.</h1><p>${esc(error.message)}</p><p>Serve the website over HTTP, then reload. Contact the instructor if this persists.</p><a href="./">Reload practice</a></main>`;
    console.error(error);
  }
}
init();
