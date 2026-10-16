# Finpath — Corporate Finance Practice

A static, mobile-friendly Risk & Return prototype: four short lessons, 20 source-grounded questions, and a reusable exercise engine. It lives entirely under `/practice/` and does not change the academic website’s navigation, theme, or deployment configuration.

## Preview

From the website repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/practice/`. Use HTTP rather than opening `index.html` as a file, because the engine fetches JSON. There is no build step, backend, account, analytics, AI tutor, or API key. KaTeX 0.19.0 and its fonts are bundled under `assets/katex/` with the upstream MIT license. Icons and the hero illustration are original SVG.

GitHub Pages can serve this directory unchanged. All application resources use relative URLs; HTML has no Jekyll front matter. The existing `_config.yml` and production pages are untouched. Review the feature branch and merge only when ready to publish.

![Desktop learning path](docs/desktop-path.png)

| Answer feedback | Prewritten explanation |
| --- | --- |
| ![Mobile feedback](docs/mobile-feedback.png) | ![Mobile explanation](docs/mobile-explanation.png) |

## Learning behavior

- Four lessons, five questions each, targeting approximately 3–5 minutes per lesson. Timing is an estimate, not a measured student outcome.
- Multiple choice, true/false, matching, sequence, and numerical questions. Choices and matching definitions are shuffled once per question visit and retain their order on reload.
- A correct first-pass answer earns 10 XP. Review answers earn 5 XP. Consecutive correct answers add 2, 4, then at most 6 bonus XP. Errors break the combo. Repeated practice can earn more XP.
- Incorrect submissions cost one heart, reveal the answer, and enter the review queue. First-pass mistakes reappear once after the lesson’s original questions. Remaining mistakes stay in the review queue; dedicated review sessions contain up to five questions.
- Five hearts reset for each session. At zero, practice continues with no further penalty. Earned XP and completed lessons are retained.
- Finishing a lesson unlocks the next regardless of score. Best scores measure accuracy on the original five questions; later retries within the lesson do not inflate that score. Review sessions do not change lesson scores.
- “Practiced correctly” counts distinct questions answered correctly at least once. It is an activity indicator, not a claim of permanent mastery. Full marks means a 100% best first-pass score.
- “Why?” opens prewritten intuition, a common misconception, and the relevant source section. No generated tutoring or external calls occur.

## Persistence and controls

Progress is stored under `finpath:corporate-finance:v1` in this browser’s `localStorage`. It includes XP, lesson attempts and best scores, question statistics, review IDs, active question, drafts, shuffled orders, hearts, combo, and submitted feedback. Reloading an answered question cannot award XP twice. A change from another tab reloads the current tab to the latest saved state.

Save and exit with the lesson’s × button; unfinished lessons resume on reload. Opening a different lesson asks whether to replace the unfinished attempt. Settings includes JSON export and a two-step reset that removes only this application’s storage key. Export is a record/backup; import is not included in this prototype. Invalid stored data is preserved until explicitly reset; storage failures are displayed rather than silently claiming a save. There is no cross-device synchronization, and clearing browser data removes progress.

Use number keys to select choices and Enter to check or continue. Tab and Space work for other controls. Matching uses concept/definition buttons; sequence questions use up/down buttons, including on touch devices. A ± button supports negative returns even when a mobile numeric keyboard omits a minus key. Explanations use a native modal with Escape dismissal and focus containment. Reduced-motion preferences suppress animation.

## Add content

See [the content guide](docs/content-guide.md), [course manifest schema](courses/course.schema.json), and [lesson schema](courses/lesson.schema.json). To add a lecture, create a new lesson JSON file and add its filename to `course.json`. The game engine does not need to change. Use stable question IDs to preserve saved progress.

See [the source and verification record](docs/verification.md) for provenance and test coverage.

## Development checks

Development dependencies are optional for students and static hosting. Node.js 20+ and Python 3 are used for the checks:

```sh
cd practice
npm ci
npm run validate
npm test
npm run verify:math
npx playwright install chromium
```

With the preview server running from the repository root:

```sh
npm run test:browser
```

To use an installed Chromium browser instead:

```sh
BROWSER_EXECUTABLE="/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" npm run test:browser
```

Set `BASE_URL` if the server uses a different port or path. Browser checks write screenshots to the ignored `test-results/` folder. The development packages are Playwright, Ajv, and axe-core; none is requested by the student-facing page.
