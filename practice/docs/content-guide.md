# Adding a lesson

The hierarchy is course → units → lesson files → questions. The renderer and scoring rules use question types, not specific finance questions.

1. Copy a lesson JSON file into `courses/corporate-finance/`.
2. Give the lesson and every question a new, stable, lowercase hyphenated ID. IDs must be unique across the course.
3. Set the title, description, estimated minutes, and icon (`chart`, `radar`, `layers`, `bolt`, or `book`).
4. Write the questions, correct answers, concise explanations, detailed intuition, misconceptions, and source references.
5. Add `{ "file": "your-lesson.json" }` to a unit’s `lessons` array in `course.json`, then run `npm run content:index`. This copies lesson metadata and question IDs/topics into the lightweight index; prompts, answers, and explanations remain in the separately fetched lesson file. Order determines the suggested path only; every lesson is independently accessible. Add a unit there if needed.
6. Target five focused questions and approximately 3–5 minutes per lesson. Each lesson should explain its own assumptions and require no earlier app completion. Missed answers enter optional review without extending the lesson.
7. After changing lesson metadata or question IDs/topics, rerun `npm run content:index`. Run schema validation, independent numerical verification, and browser checks. Inspect long questions and equations at a narrow mobile width.
8. Run `npm run pwa:assets` and commit the generated `sw-assets.js` whenever publishing changes to the shell, lessons, or bundled assets. `npm run pwa:check` catches a stale index. This creates a fresh, verified static cache; see [storage and caching](progress-storage.md).

No engine edits are needed. Keep existing IDs for unchanged questions, but give replacements new IDs. The runtime archives attempts containing retired IDs and preserves all earlier XP, scores, and answer history; it does not reset progress. Archived attempts are retained for export, not offered as current lessons. Adding new IDs leaves compatible saved attempts resumable. See the curriculum migration in the storage guide.

## Common question fields

| Field           | Purpose                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `id`            | Stable identity, such as `expected-return`                                                                 |
| `type`          | One of the five supported types below                                                                      |
| `topic`         | Short label above the exercise                                                                             |
| `prompt`        | The exact task; specify horizon, units, and assumptions                                                    |
| `context`       | Optional scenario or instruction                                                                           |
| `table`         | Optional `headers` and `rows` arrays; each row must match the header count                                 |
| `explanation`   | Concise feedback shown after both correct and incorrect answers                                            |
| `detail`        | Longer prewritten explanation under “Why?”                                                                 |
| `misconception` | Why a tempting incorrect answer fails                                                                      |
| `source`        | `lecture` number and `chapters` array for students; `file`, `section`, `kind`, and optional `textbook`/`exercise` for authoring provenance |

Content is plain text and is HTML-escaped. Inline math uses `\(...\)`; display math uses `$$...$$`. JSON requires backslashes to be escaped, so write `"\\(E[R]=8\\%\\)"`. KaTeX runs with `trust: false`. Arbitrary HTML is not supported.

## Type-specific fields

**Multiple choice:** exactly four `{ "id", "text" }` options, with `answer` equal to one option ID. Avoid positional wording such as “all of the above” because options are randomized. Only one answer may be correct.

**True/false:** `answer` is a JSON boolean, not the strings `"true"` or `"false"`. The interface labels choices True and False.

**Matching:** `pairs` is an array of `{ "id", "left", "right" }`. Each ID identifies a correct pair; a separate answer field is unnecessary. Make each match unambiguous. Definitions are shuffled. The entire matching item counts as one question and one possible heart loss.

**Sequence:** `items` is an array of `{ "id", "text" }`. `answer` lists every item ID once, in the correct order. Choose a workflow with a clear intended sequence; do not pretend economically interchangeable steps have a unique order. The initial sequence is shuffled and deliberately differs from the answer.

**Numerical:** `answer` is a number; `unit` is a display label. Specify both nonnegative `absoluteTolerance` and `relativeTolerance`. The grading rule is:

```text
abs(student_answer - answer) <= max(absoluteTolerance,
                                   abs(answer) * relativeTolerance)
```

A small machine-precision allowance avoids rejecting a value exactly on the tolerance boundary. For percentage returns, 8 means 8%, not 0.08. Signed decimal input and an optional trailing `%` are accepted. Empty strings, scientific notation, thousands separators, mixed text, and nonfinite numbers are rejected. For a zero answer, relative tolerance alone gives zero tolerance; choose an absolute tolerance if rounding is allowed.

## Example numerical question

```json
{
  "id": "lec18-premium-example",
  "type": "numerical",
  "topic": "Risk premiums",
  "prompt": "A fund has an expected one-year return of 9%. The one-year risk-free rate is 3%. What is the expected risk premium in percentage points?",
  "answer": 6,
  "unit": "percentage points",
  "absoluteTolerance": 0.01,
  "relativeTolerance": 0,
  "explanation": "The expected premium is 6 percentage points: 9% − 3%.",
  "detail": "The premium is expected compensation above the return for waiting. It is not a guaranteed realized bonus.",
  "misconception": "Use a difference in returns over the same horizon, not a ratio.",
  "source": {
    "file": "Lec18_CAPM_Cost_of_Capital.tex",
    "section": "The CAPM Equation: Breaking Down the Formula",
    "kind": "original-application",
    "lecture": 18,
    "chapters": [13]
  }
}
```

## Editorial checks

Separate expected from realized returns and systematic exposure from standalone volatility. State borrowing costs and other simplifying assumptions in leverage problems. Explain why an answer makes economic sense. Use hypothetical scenarios instead of unsupported current company claims. For lecture lessons, use only the relevant `Lec` lecture/core deck and associated textbook chapters, never `Module` decks. The exam-prep unit instead uses `homework3_core.tex`, `mock_quiz_a_core.tex`, and `mock_quiz_b_core.tex`; cite the relevant practice question number and keep the original source documents outside the public site. Mark this unit `kind: "exam-prep"` and include a `notice` about exam scope. Other units use `kind: "lecture"`. Cite the checked lecture frame in `source.file`/`source.section`, add the textbook title and section in `source.textbook` where relevant, and label new examples as original applications. Set `source.lecture` explicitly and supply integer chapter numbers in `source.chapters` for every question, including exam prep. The app displays only these fields as Related reading; filenames, exercise identifiers, section titles, and attribution boilerplate stay out of the student dialog. Keep detailed authoring references in the JSON and documentation. For lecture-specific extensions, chapter labels indicate related background, not a claim that the textbook contains that exact exercise. Verify every numerical answer and any numbers mentioned in conceptual explanations independently.

`tests/validate.mjs` checks the JSON schemas and cross-field constraints, including duplicate IDs, answer references, sequence permutations, table dimensions, and agreement between the course index and each lesson file. `tests/verify_math.py` deliberately checks that every numerical question has an independent calculation. Extend that script when adding numerical questions. The current validation enforces three mixed multiple-choice/numerical exam-prep sets first, followed by Lectures 15–20, with five questions per lesson, 3–5 minute estimates, whole-number prep calculations, an exam-scope notice, and sources matching each section. Extend that coverage rule when the curriculum expands. Browser tests exercise this 45-question course and open lesson access; update fixture-specific counts when the curriculum changes.
