# Source and verification record

Prototype prepared on October 15, 2026, for review before public deployment.

## Teaching sources

The source files were read from the instructor’s existing Corporate Finance workspace. Questions identify the relevant file and frame title in their `source` field. “Adapted” indicates an example or idea directly adapted from that section; “original-application” indicates a newly written exercise using the checked concept. The lecture files themselves are not redistributed in this directory.

| Source                           | Concepts used                                                                                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Lec17_Risk_and_Return.tex`      | Employer concentration; systematic versus idiosyncratic risk; diversification; the two-state 50/50 portfolio; the recession-protection example; limits of stock-count rules |
| `Lec18_CAPM_Cost_of_Capital.tex` | Beta as market sensitivity; financial leverage; expected risk premiums; levered exposure versus investment skill                                                            |
| `Module_2_Risk_Return.tex`       | Definitions of expectation, variance, covariance, and correlation                                                                                                           |

Source SHA-256 checksums at inspection:

```text
66c30cc9d4511ceccc687459abef7414787ad759a9491c815308dabacd84f9f7  Lec17_Risk_and_Return.tex
0d23f4c82a0153ec19917d143b55cc72ab075bd6def73592d97987b86df2b631  Lec18_CAPM_Cost_of_Capital.tex
9a3a326e09ba51be47c94e730c46e217ab457d610388ce1c1e95aca0b14e4399  Module_2_Risk_Return.tex
```

The source workspace had existing edits in Lectures 16 and 18. Those files were only read; their edits were preserved. This prototype uses the inspected source content rather than assuming a clean committed version.

## Content choices

- Compensation for systematic risk is explicitly framed as a CAPM benchmark rather than an unconditional claim about every market or investor.
- The 50/50 portfolio’s risk elimination is labeled a special two-state example. No universal stock count is said to eliminate risk.
- The recession-protection question preserves equal 8% expected returns and distinguishes the 24% versus 26% standalone volatilities from the investor’s income exposure.
- Leverage examples specify zero interest, a one-period horizon, and omitted taxes, fees, and margin calls. Gains and losses are both amplified.
- Beta is a statistical sensitivity, not an exact realized-return multiplier. A lower portfolio beta is not equated with lower total volatility.
- No historical company-return claims or live market estimates were invented. No paid tutoring API is used.

## Checks performed

`npm test`: 14 tests pass, covering every authored answer, incorrect answers, numerical parsing and tolerance boundaries, permutations, heart deductions, review scheduling, duplicate-submission protection, combos, best scores, reset isolation, invalid content, v1 migration, multiple saved attempts, immutable answer events, adapter boundaries, failed writes, and on-demand content loading.

`npm run validate`: the manifest and all four lesson files pass JSON Schema and semantic validation; 20 unique questions cover all five types.

`python3 tests/verify_math.py`: independently verifies all four numerical question answers and every supporting mean, volatility, levered return, and portfolio beta used in the conceptual explanations.

`npm run test:browser`: passes in headless Microsoft Edge on macOS. The suite completes the whole course using UI controls and checks:

- Correct and incorrect feedback, explanations, and local KaTeX rendering.
- Randomized choices retaining order across reload; unsubmitted choices and numerical drafts resuming after exit, reload, or closing and reopening a tab.
- Exact cumulative XP, combo bonuses, hearts, zero-heart practice, first-pass scores, and independent lesson access.
- Five-question lessons without mandatory repetitions, persistent optional review, correct answers clearing the queue, and review not changing lesson best scores.
- Two-step reset, canceled reset preserving progress, and malformed local storage being preserved for recovery.
- Keyboard selection/Enter, native dialog focus containment, and Escape dismissal.
- Desktop at 1440 × 1000; mobile at 390 × 844; narrow-layout overflow checks at 320 × 740.
- No unexpected failed static resources or browser JavaScript errors in the full-course flow.
- Skipping directly to lesson four, preserving drafts across several unfinished lessons, and recording the actual submitted answer and timestamp.
- A real browser-process restart with a persistent local profile restores the same lesson and draft.
- Changes from another open tab refresh once; resuming does not create a save/reload loop.
- v1 browser storage migrates without losing XP, scores, or the unfinished draft.
- A paused review remains resumable after its last correct answer clears the review queue.
- Cold homepage requests contain no lesson question files or KaTeX. The local test measured approximately 109 KB of uncompressed response bodies including service-worker shell caching; deployment compression and headers can change transfer size.
- Checking and continuing an answer issue zero network requests in the tested flow. All observed application requests are same-origin GETs.
- Previously opened lessons resume and accept answers after an offline reload. Attempting an unvisited lesson offline shows a retry message, preserves other attempts, and succeeds after reconnection.
- A separate smoke check at `/site/practice/` verifies nested base paths, JSON fetching, and KaTeX assets.
- axe-core WCAG A/AA checks on the desktop path and mobile path, question, feedback, explanation, and matching screens, with no detected violations.

The recorded screenshots were visually inspected. Automated accessibility checks are not a full accessibility audit. Physical iOS/Android devices, Safari, and Firefox were not tested. Student completion times and learning outcomes have not been measured.

## Publication boundary

Only `practice/` is added on the feature branch. No production pages, site configuration, or navigation are modified. Static resource paths support a site subdirectory; no client-side route rewriting is required. The existing GitHub Pages/Jekyll build was not run locally. There is no deployment until the feature branch is approved and merged.
