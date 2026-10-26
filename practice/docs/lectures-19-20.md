# Lectures 19–20: question and source map

Two independently accessible five-question lessons follow Lecture 18. Each targets 3–5 minutes and mixes multiple choice with numerical input. All seven new calculation answers are whole numbers. The source decks and exercise sheets were read only, including the instructor’s current uncommitted lecture edits. No Module slides or actual exams were used.

Lecture 19 follows its core deck and Exercise_Lec19. Lecture 20 has no separate core deck, so its coverage follows the core tax-shield, valuation, WACC, and recapitalization slides in Lec20_Capital_Structure_Taxes and Exercise_Lec20. Both use Ross, Westerfield & Jordan, *Fundamentals of Corporate Finance*, 13th edition, Chapter 16. Sections 16.2–16.3 support the no-tax material; §16.4 covers corporate taxes; §§16.5–16.6 motivate limits to debt. The chapter’s Business and Financial Risk (Q23) exercise supports the delevering formula.

| Lecture | Item | Type | Focus / answer | Corresponding exercise |
| --- | --- | --- | --- | --- |
| 19 | 1 | Multiple choice | Homemade leverage replicates equivalent cash flows | Exercise 19, Q4 |
| 19 | 2 | Number | MM II: 12 + 1 × (12 − 4) = **20%** | Exercise 19, Q1 |
| 19 | 3 | Number | WACC: (100/150) × 14 + (50/150) × 8 = **12%** | Exercise 19, Q2 |
| 19 | 4 | Number | Asset beta: 3 / (1 + 2) = **1** | Core slide; Chapter 16, Business and Financial Risk (Q23) |
| 19 | 5 | Multiple choice | Higher EPS alone does not establish value creation | Core slide; Exercise 19, Q3–4; Chapter 16, financial leverage |
| 20 | 1 | Number | Annual tax shield: 25% × 8% × $100m = **$2m** | Exercise 20, Q1 |
| 20 | 2 | Number | Levered value: $360m + 25% × $160m = **$400m** | Exercise 20, Q2 |
| 20 | 3 | Number | After-tax WACC: 0.5 × 18 + 0.5 × 8 × 0.75 = **12%** | Exercise 20, Q3 |
| 20 | 4 | Number | Announcement price: ($480m + 20% × $120m) / 12m = **$42** | Exercise 20, Q4 |
| 20 | 5 | Multiple choice | Distress costs and unusable deductions can limit borrowing | Exercise 20, Q4(c) |

The no-tax questions hold operating assets and investment fixed. Delevering beta explicitly assumes zero debt beta. Tax-shield present values assume permanent debt, usable deductions, and tax-shield risk equal to debt risk. WACC uses market-value weights. The buyback question specifies an unexpected, credible announcement that is immediately priced before any debt issuance or repurchase; subsequent repurchases occur at fair value.

## Reading labels across the app

All 45 questions have explicit `source.lecture` and `source.chapters` metadata. “Why?” retains the explanation and misconception but displays only a concise label such as **Lecture 19 · Chapter 16** under **Related reading**. It never displays authoring filenames, exercise numbers, section titles, or attribution boilerplate. Detailed provenance stays in the lesson JSON for instructors.

For exam prep, the lecture reference points to the lecture teaching that concept, rather than the homework/mock-quiz filename. Related chapters for lecture-specific extensions provide background; they do not claim that prediction-market or beta-driver examples appear verbatim in the textbook. Existing questions keep their IDs, prompts, answers, and explanations, so saved answers remain compatible.

Source SHA-256 checksums at inspection:

```text
40501ecabe736b37fb41ae070af25581e27906f8a4c8231bb7855cf23791b1d6  Lec19_Capital_Structure_Intro_core.tex
3f3114981b00fe87cffb9fbfb4e132e3aed6cfff937e21140a03b2873b7552e6  Lec19_Capital_Structure_Intro.tex
f6068d51da7aa35e0bb4fe1b72696c6d241d9c6721e3c7ff0d80b82116f7c7f8  Lec20_Capital_Structure_Taxes.tex
5bd1e4cc0bc8eb975e8d611818d72de02fd3240726dd861173db066d1ca5ffb3  exercises/Exercise_Lec19.tex
8c04fe1ca09478514c272ed1e1534bc0da3977cee6051f76d6a572e70cb9325b  exercises/Exercise_Lec20.tex
```
