# Source and verification record

The app is published at `https://xiaobo-yu.com/practice/`. This record includes the exam-prep expansion.

## Teaching sources

The curriculum begins with three exam-prep sets of five questions, followed by one five-question topic for each of Lectures 15–18. Exam prep is mapped to Homework 3 and Mock Quizzes 2A/2B in [exam-prep.md](exam-prep.md). The remaining source notes below describe the lecture section. The `Lec*_core.tex` decks determine the core coverage; the full `Lec*.tex` decks and associated sections of Ross, Westerfield & Jordan, _Fundamentals of Corporate Finance_, 13th edition (`textbook.pdf`) were checked. No `Module` deck contributes to this question set. Slides and textbook pages are not redistributed.

Each exercise is newly written and labeled `original-application`. Lecture-question sources name the exact core deck and frame; exam-prep sources name the practice sheet and question number. Textbook references name the associated section where relevant. Prediction-market replication and the detailed trading/arbitrage examples are lecture-specific extensions, not falsely attributed to the textbook.

| Lecture                    | Core frames used                                                                                                                                        | Associated textbook reading                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 15 — Capital markets       | Multiplitude of Financial Markets; Equity Markets: Where and How Stocks Trade; Return and Risk Measurement                                              | §8.3 (dealers/brokers), §12.4 (volatility), §12.5 (arithmetic/geometric averages)                           |
| 16 — Market efficiency     | The 3 Forms of Market Efficiency; Arbitrage: One Smart Guy vs. the Meme Crowd; Prediction Markets: Price by Matching Payoffs; Why Efficiency Has Limits | §12.6 (capital market efficiency); state-claim pricing and funding constraints are developed in the lecture |
| 17 — Risk & return         | Two Types of Risk; Earthquake vs. Bike Theft Insurance; Three Common Fallacies                                                                          | §§13.4–13.6 (systematic/unsystematic risk, diversification, systematic-risk principle)                      |
| 18 — CAPM & cost of equity | Beta and CAPM; Alpha; What Drives Beta?; The Divisional Hurdle Rate Trap                                                                                | §§13.6–13.7 (beta/SML), §14.2 (cost of equity), §14.5 (project/divisional discount rates)                   |

Source SHA-256 checksums at inspection:

```text
a95c6a0386d603b498895fe8f00746c90dea3db10f89c8871cbdc4780aa10b96  Lec15_Capital_Markets_Intro.tex
fae92ebddb2a31d58a654d64636af764c28b41491d9cbc03501045e870bd881e  Lec15_Capital_Markets_Intro_core.tex
522a5dd72f837ba2d54a0d0f089da52fc7d8287dc6dfa9dbcb097ca4c3a088e4  Lec16_Market_Efficiency.tex
dbe930b01a5593aad0483bc22f91cd0e6a967ea7d40b6649b0d0660d4426fe5b  Lec16_Market_Efficiency_core.tex
66c30cc9d4511ceccc687459abef7414787ad759a9491c815308dabacd84f9f7  Lec17_Risk_and_Return.tex
53b9a11cbbfbf3d27b123d0dbdbd5e004df3f2e6f303b6beaca1bea67a239f78  Lec17_Risk_and_Return_core.tex
0d23f4c82a0153ec19917d143b55cc72ab075bd6def73592d97987b86df2b631  Lec18_CAPM_Cost_of_Capital.tex
0160f6e7e7056498fb280cf414b6cab13084e868da09b7af054043e9d0481105  Lec18_CAPM_Cost_of_Capital_core.tex
a5813ce416957a7e8b09422f1cb0376d021c5ca9e416294a43115a0fc244b1f8  textbook.pdf
```

The instructor workspace has existing edits in the full Lectures 16 and 18. All source decks were read only; those edits are preserved.

## Content choices

- Adding exam prep preserves all lecture IDs, completed scores, XP, submitted answers, and unfinished sessions; a regression test compares the saved record before and after reconciling the expanded course.
- Exam prep includes ten multiple-choice concept checks and five numerical questions, all with integer answers and independently checked formulas. The visible scope notice distinguishes broader lecture practice from exam preparation.
- Five focused questions per lesson target approximately 3–5 minutes, including short feedback. The optional detailed explanations may take longer.
- Lecture 15 distinguishes compound annual return, arithmetic averages, and cumulative return; the +25%/−20% example takes $100 to $125 and back to $100, giving exactly 0% compounded annually versus a 2.5% arithmetic average.
- Lecture 16 states immediate redemption and funding assumptions for arbitrage. YES/NO claims settle at the same future date, so their prices sum to the discounted payoff. The $0.25/$0.55 state prices imply a $310 replicating value for $800/$200 terminal payoffs. Prices are not identified with physical probabilities.
- Lecture 17 distinguishes common risk in a local insurance pool from systematic risk relative to global markets. Stock count alone does not establish diversification. Corporate diversification alone does not establish positive NPV.
- Lecture 18.1 uses hypothetical inputs of 3% risk-free, 9% expected market return, and beta 2, giving a whole-number required return of 15%. The separate alpha exercise uses beta 1.4 and a 13.4% forecast, giving 2 percentage points of alpha above its 11.4% benchmark. The all-equity project example states conventional cash flows and compares its 10% IRR with its own 12% hurdle, not the parent’s 6% rate.
- Beta is an average market sensitivity, not an exact daily multiplier. Risk-premium statements are qualified as the systematic-risk/CAPM benchmark. No live company estimates are invented.
- Replacement content uses new lesson/question IDs. Revised calculation inputs in 15.1 and 18.1 also receive new question IDs so saved feedback is never paired with a changed answer. The previous curriculum fixture checks that earlier XP, scores, answer history, completed-session records, and full unfinished attempts survive the change. Old completions do not mark new topics complete.

## Checks performed

`npm test`: 18 tests pass, covering every authored answer, incorrect answers, numerical parsing and tolerance boundaries, permutations, heart deductions, review scheduling, duplicate-submission protection, combos, best scores, reset isolation, invalid content, v1 migration, multiple saved attempts, immutable answer events, adapter boundaries, failed writes, on-demand content loading, platform icon/manifest validity, and PWA resource integrity.

`npm run validate`: the manifest and all seven lesson files pass JSON Schema and semantic validation; 35 unique questions cover all five types.

`python3 tests/verify_math.py`: independently verifies all ten numerical question answers, compound versus arithmetic returns, arbitrage profit, both payoff-replication states, CAPM premiums, and project hurdle comparisons.

`npm run test:browser`: passes in headless Microsoft Edge on macOS. The suite completes the whole course using UI controls and checks:

- Correct and incorrect feedback, explanations, and local KaTeX rendering.
- Randomized choices retaining order across reload; unsubmitted choices and numerical drafts resuming after exit, reload, or closing and reopening a tab.
- Exact cumulative XP, combo bonuses, hearts, zero-heart practice, first-pass scores, and independent lesson access.
- Five-question lessons without mandatory repetitions, persistent optional review, correct answers clearing the queue, and review not changing lesson best scores.
- Two-step reset, canceled reset preserving progress, and malformed local storage being preserved for recovery.
- Keyboard selection/Enter, native dialog focus containment, and Escape dismissal.
- Desktop at 1440 × 1000; mobile at 390 × 844; narrow-layout overflow checks at 320 × 740. The longer replication and project-hurdle scenarios, feedback, math, and expanded source notes were also checked at 320px.
- No unexpected failed static resources or browser JavaScript errors in the full-course flow.
- Skipping directly to lesson four, preserving drafts across several unfinished lessons, and recording the actual submitted answer and timestamp.
- A real browser-process restart with a persistent local profile restores the same lesson and draft.
- Changes from another open tab refresh once; resuming does not create a save/reload loop.
- v1 browser storage migrates without losing XP, scores, or the unfinished draft. Replacing the prior curriculum preserves historical records, archives retired attempts, avoids inflated current mastery/completion counts, and remains stable after reload.
- A paused review remains resumable after its last correct answer clears the review queue.
- Cold homepage requests contain no lesson question files or KaTeX. The local test measured approximately 269 KB of uncompressed response bodies including service-worker shell and icon caching; deployment compression and headers can change transfer size.
- Checking and continuing an answer issue zero network requests in the tested flow. All observed application requests are same-origin GETs.
- Previously opened lessons resume and accept answers after an offline reload. Attempting an unvisited lesson offline shows a retry message, preserves other attempts, and succeeds after reconnection.
- A separate smoke check at `/site/practice/` verifies nested base paths, JSON fetching, and KaTeX assets.
- PWA manifest/installability validation in a normal Chromium profile; full-course offline download, failed update recovery, waiting/activation handoff, exact progress preservation, and isolation of other apps’ caches.
- iPhone WebKit checks for install guidance, full offline download, saved feedback/XP, and offline math. The generated native web bundle runs the same quiz and disables worker registration/install controls.
- A targeted Android Chromium and narrow iPhone WebKit check completes all 15 exam-prep questions offline, opens every explanation, and verifies exact saved progress after reloading each submitted answer. All three prep sets complete with 100% scores, without math errors or horizontal overflow.
- axe-core WCAG A/AA checks on the desktop path and mobile path, question, feedback, explanation, and matching screens, with no detected violations.

The recorded screenshots were visually inspected. Automated accessibility checks are not a full accessibility audit. Physical iOS/Android installation, the Safari application, and Firefox were not tested. The PWA suite also exercises Playwright WebKit with an iPhone viewport; see [PWA verification](pwa-and-packaging.md#verification). Student completion times and learning outcomes have not been measured.

## Publication boundary

Only `practice/` is modified on the feature branch. No production pages, site configuration, or navigation are modified. Static resource paths support a site subdirectory; no client-side route rewriting is required. The existing GitHub Pages/Jekyll build was not run locally. The app remains under `/practice/`, with no homepage or navigation link added. GitHub Pages publishes the approved branch changes behind the existing Cloudflare configuration.
