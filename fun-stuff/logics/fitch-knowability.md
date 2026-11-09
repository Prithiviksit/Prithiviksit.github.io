---
layout: fun-article
title: "Can every truth be known?"
description: "How every truth being knowable can imply every truth is known—and why this is not the liar paradox. With Tennant’s restriction and Williamson’s objection."
group: Logics
subtitle: "Fitch’s paradox of knowability · Tennant’s restriction · Williamson’s challenge"
lead: "A modest hope—that no truth is forever beyond discovery—has a startling logical consequence: every truth is already known."
permalink: /fun-stuff/logics/fitch-knowability.html
date: 2026-10-08T20:37:03-06:00
published: true
---

## 0. The gap between possible and actual knowledge

Imagine a sealed box containing a red ball.
Nobody has opened it.
The ball’s color is unknown, yet discovering it seems perfectly possible.
“Every truth can be known” sounds completely compatible with a world full of unopened boxes.

Fitch’s paradox asks whether that compatibility survives when “every truth” includes truths about _ignorance_ itself.
It shows that a modest-sounding philosophical claim—

> Every truth could, in principle, be known.

—logically implies an extravagant one:

> Every truth is already known.

Published by Frederic Fitch in 1963, this is one of the most startling results in epistemic logic.
Unlike the Liar paradox or Gödel's incompleteness theorem, the proof uses no self-reference at all.

### The philosophical motivation

The puzzle grows out of an old debate over how truth relates to our capacity to know.

*Realism* holds that truth is independent of what anyone can establish: some facts may hold even if no one could ever discover them.

*Anti-realism (verificationism)* ties truth to verification: if a statement is true, it must at least be possible, in principle, for someone to come to know it.
Everything true is knowable.

### Putting the principle in symbols

Let $$Kp$$ mean that $$p$$ is known (by someone, at some time) and $$\Diamond Kp$$ mean that it is possible for $$p$$ to be known.
The unrestricted knowability principle is the schema

$$
p \longrightarrow \Diamond Kp. \tag{KP}
$$

To an anti-realist, this looks far more modest than _omniscience_, the claim that every truth is already known:

$$
p \longrightarrow Kp.
$$

Fitch's proof collapses the gap between the two.

## 1. The proof in a few steps

The argument relies on just two elementary rules about knowledge: knowledge is factive (only truths can be known), and knowing a conjunction entails knowing each conjunct.

$$
Kq \longrightarrow q, \qquad K(q\land r)\longrightarrow (Kq\land Kr).
$$

Suppose some proposition $$p$$ is true but never known—for instance, “there is a Roman coin buried at this spot, and nobody ever learns of it.”
Then the compound proposition

$$
q := p\land\neg Kp
$$

is also true.
In words:

> “The coin is buried there, and nobody knows that it is buried there.”

Could anyone ever know this conjunction $$q$$?
Suppose someone did:

$$
K(p\land\neg Kp).
$$

Distributing knowledge across the conjunction gives both $$Kp$$ and $$K\neg Kp$$.
Applying factivity to the second conjunct gives $$\neg Kp$$.
Together, we get

$$
Kp\land\neg Kp,
$$

a contradiction.
Consequently, $$q$$ can never be known:

$$
\boxed{\neg\Diamond K(p\land\neg Kp)}.
$$

No one can know that a specific truth is unknown.

Now bring in the knowability principle.
Because KP applies to _every_ true proposition, it applies in particular to $$q=p\land\neg Kp$$:

$$
(p\land\neg Kp)\rightarrow
\Diamond K(p\land\neg Kp).
$$

We just proved that the right-hand side is impossible.
By modus tollens, the left-hand side must be false:

$$
\boxed{\neg(p\land\neg Kp)}.
$$

In classical propositional logic, $$\neg(p\land\neg Kp)$$ is equivalent to

$$
\boxed{p\rightarrow Kp}.
$$

Since $$p$$ was arbitrary,

$$
\boxed{\forall p\,(p\rightarrow Kp)}.
$$

Every truth is known.

> **The crucial distinction:** $$p\land\neg Kp$$ can easily be true. What is impossible is *knowing* that entire conjunction at once: the act of knowing $$p$$ falsifies the second conjunct $$\neg Kp$$.

## 2. Tennant: restrict which truths must be knowable

To rescue anti-realism from omniscience, Neil Tennant proposes restricting which propositions the knowability principle covers.
Why demand that a proposition be knowable when knowing it is logically self-defeating?

Tennant calls a proposition $$p$$ *Cartesian* if assuming $$Kp$$ is logically consistent, and restricts KP to Cartesian propositions:

$$
p\longrightarrow\Diamond Kp \quad\text{only when } Kp\nvdash\bot.
$$

Because $$K(p\land\neg Kp)$$ entails a contradiction using only the basic laws of knowledge, Fitch's conjunction $$p\land\neg Kp$$ is not Cartesian and falls outside the scope of the principle.
Whether this restriction solves the problem depends on whether complex truths can still smuggle in an unknowable conjunction without failing the consistency test.

## 3. Williamson: can ignorance be hidden inside an eligible truth?

In *Tennant on Knowable Truth* (2000), Timothy Williamson argues that restricting KP to Cartesian propositions is not enough.

Let $$n$$ rigidly designate the actual number of books on a shelf, and let $$E(n)$$ mean that $$n$$ is even.
Because $$n$$ fixes that number across possible worlds, either $$E(n)$$ is necessarily true or $$\neg E(n)$$ is necessarily true—even if we have not counted the books and do not know which holds.

Now take a true but unknown proposition $$p$$ and form the compound

$$
r:=p\land(Kp\to E(n)).
$$

Unlike Fitch's conjunction $$q$$, knowing $$r$$ does not look immediately self-contradictory.
Because $$p$$ is true and $$Kp$$ is false, the conditional $$Kp\to E(n)$$ has a false antecedent, making $$r$$ true.

What happens if someone comes to know $$r$$?
Conjunction elimination and factivity yield $$Kp$$ and $$Kp\to E(n)$$, hence $$E(n)$$.
So if $$r$$ is knowable, it is possible that $$E(n)$$ holds; and because numerical parity is rigid, possible evenness implies actual evenness.
Running the exact same construction with $$\neg E(n)$$ in place of $$E(n)$$ implies that $$n$$ is also odd—provided both constructed propositions qualify as Cartesian.

Tennant (2001) replies that they do not both qualify.
If the consistency test $$Kp\nvdash\bot$$ is allowed to draw on necessary mathematical truths, then when $$n$$ is actually odd, $$E(n)$$ is necessarily false, so assuming $$Kr$$ is inconsistent after all.
On that reading, only one of the two constructions is Cartesian, and Williamson's pincer argument is blocked.

## 4. Epistemic blindspots vs. self-reference

The Liar sentence—“This sentence is false”—creates a paradox by referring to itself, tying its content directly to its own truth value.
Fitch's proof needs no self-reference and no diagonalization.
Start with an ordinary fact $$p$$, such as the color of a ball in a closed box, and conjoin it with the fact that $$p$$ is unknown.

The mechanism is what Roy Sorensen calls an *epistemic blindspot*, familiar from G. E. Moore's paradox: “It is raining, but I do not know that it is raining.”
The state of affairs can easily obtain, yet no one can coherently know the whole conjunction at once.
The barrier is built into the logic of knowledge rather than semantic circularity.

## 5. Other ways out

Besides restricting which propositions count as knowable, philosophers have explored several ways to block the collapse into omniscience.
One option is to change the background logic: the final step from $$\neg(p\land\neg Kp)$$ to $$p\to Kp$$ relies on double-negation elimination, which intuitionistic logic rejects.
In intuitionistic logic the argument yields $$p\to\neg\neg Kp$$—no truth is forever unknowable—without licensing the final step to $$p\to Kp$$.
Other approaches revise the modal or temporal interpretation of knowability, distinguishing what is true *now* from what can be learned *later* after the state of ignorance has passed.

## Further reading

1. Frederic B. Fitch (1963), “A Logical Analysis of Some Value Concepts,” *The Journal of Symbolic Logic* 28: 135–142.
2. Neil Tennant (1997), *The Taming of the True*, Chapter 8.
3. Timothy Williamson (2000), [“Tennant on Knowable Truth,”](https://doi.org/10.1111/1467-9329.00113) *Ratio* 13: 99–114.
4. Neil Tennant (2001), [“Is Every Truth Knowable? Reply to Williamson,”](https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/a/4597/files/2014/07/tennant_ratio2001-1w66fnw.pdf) *Ratio* 14: 263–280.
5. Berit Brogaard and Joe Salerno, [“Fitch’s Paradox of Knowability,”](https://plato.stanford.edu/entries/fitch-paradox/) *Stanford Encyclopedia of Philosophy* (overview and further debate).
