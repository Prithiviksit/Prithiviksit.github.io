# Adding a lesson

The hierarchy is course → units → lesson files → questions. The renderer and scoring rules use question types, not specific finance questions.

1. Copy a lesson JSON file into `courses/corporate-finance/`.
2. Give the lesson and every question a new, stable, lowercase hyphenated ID. IDs must be unique across the course.
3. Set the title, description, estimated minutes, and icon (`chart`, `radar`, `layers`, `bolt`, or `book`).
4. Write the questions, correct answers, concise explanations, detailed intuition, misconceptions, and source references.
5. Add the filename to a unit’s `lessons` array in `course.json`. Order determines the path and prerequisite sequence. Add a unit there if needed.
6. Run schema validation, independent numerical verification, and browser checks. Inspect long questions and equations at a narrow mobile width.

No engine edits are needed. Existing IDs identify saved progress; renaming or deleting IDs requires a deliberate storage migration or a communicated reset. The current runtime stops and preserves incompatible saved data instead of silently deleting it. Adding new IDs is compatible with existing progress.

## Common question fields

| Field | Purpose |
| --- | --- |
| `id` | Stable identity, such as `expected-return` |
| `type` | One of the five supported types below |
| `topic` | Short label above the exercise |
| `prompt` | The exact task; specify horizon, units, and assumptions |
| `context` | Optional scenario or instruction |
| `table` | Optional `headers` and `rows` arrays; each row must match the header count |
| `explanation` | Concise feedback shown after both correct and incorrect answers |
| `detail` | Longer prewritten explanation under “Why?” |
| `misconception` | Why a tempting incorrect answer fails |
| `source` | `file`, `section`, and `kind`: `adapted` or `original-application` |

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
  "id": "new-premium-example",
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
    "kind": "original-application"
  }
}
```

## Editorial checks

Separate expected from realized returns and systematic exposure from standalone volatility. State borrowing costs and other simplifying assumptions in leverage problems. Explain why an answer makes economic sense. Use hypothetical scenarios instead of unsupported current company claims. Cite a checked source section; label new examples as original applications. Verify every numerical answer and any numbers mentioned in conceptual explanations independently.

`tests/validate.mjs` checks the JSON schemas and cross-field constraints, including duplicate IDs, answer references, sequence permutations, and table dimensions. `tests/verify_math.py` deliberately checks that every numerical question has an independent calculation. Extend that script when adding numerical questions. Browser tests currently exercise this 20-question prototype and its intended progression; update fixture-specific counts when the curriculum changes.
