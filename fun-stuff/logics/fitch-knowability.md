---
layout: fun-article
title: "Can every truth be known?"
description: "How every truth being knowable can imply every truth is known—and why this is not the liar paradox. With Tennant’s restriction and Williamson’s objection."
group: Logics
subtitle: "Fitch’s paradox of knowability · Tennant’s restriction · Williamson’s challenge"
lead: "A modest hope—that no truth is forever beyond discovery—has a startling logical consequence: every truth is already known."
permalink: /fun-stuff/logics/fitch-knowability.html
---

## 0. The gap between possible and actual knowledge

Imagine a sealed box containing a red ball. Nobody has opened it. The ball’s color is unknown, but discovering it seems perfectly possible. “Every truth can be known” sounds compatible with a world full of unopened boxes.

Fitch’s paradox asks whether that compatibility survives when “every truth” includes truths about _ignorance_ itself.  It shows that a seemingly modest philosophical claim
> Every truth could, in principle, be known.

logically implies a much stronger and implausible claim:
> Every truth is already known.

Fitch's paradox of knowability is probably one of the most surprising results in epistemic logic. Remarkably, it does not rely on self-reference, unlike the Liar paradox or Gödel's incompleteness theorem. 



### The philosophical motivation

The idea stems from the difference between the two positions about the relationship between truth and knowledge.

*Realism:* Some facts may be true even if no one could ever discover them.

*Anti-realism (verificationism):* Truth is fundamentally connected to our capacity to verify it. If a statement is true, it must at least be possible for someone to know it.
Everything true is knowable.

### Let's add some "math"


Let $$Kp$$ mean that $$p$$ is known and $$\Diamond Kp$$ that it is possible for $$p$$ to be known. The unrestricted knowability principle is the schema

$$
p \longrightarrow \Diamond Kp. \tag{KP}
$$

This is the anti-realist's knowability principle--seemingly much weaker than its counterpart of classical consequence, _omniscience_:

$$
p \longrightarrow Kp.
$$



## 1. The proof in a few steps





Use two elementary principles: knowledge is factive, and knowing a conjunction entails knowing each conjunct.

$$
Kq \longrightarrow q, \qquad K(q\land r)\longrightarrow (Kq\land Kr).
$$

Let's consider a proposition $$p$$ that is true but unknown. Think of something like "there is a buried Roman coin at a certain location, but nobody knows it exists". Then another proposition is true:

$$
q := p\land\neg Kp.
$$

In words:
> "The coin is buried there, and nobody knows that it is buried there."

Universal knowability says that this whole conjunction $$q$$ can be known. But suppose it were known:

$$
K(p\land\neg Kp).
$$

Conjunction elimination gives both $$Kp$$ and $$K\neg Kp$$. Factivity applied to the latter gives $$\neg Kp$$. We obtain

$$
Kp\land\neg Kp,
$$

a contradiction. Consequently,

$$
\boxed{\neg\Diamond K(p\land\neg Kp)}.
$$

It is impossible to know that a particular truth is unknown.


Recall that KP applies to _every_ true proposition.
Therefore, it must also apply to $q=p\land\neg Kp$:

$$
(p\land\neg Kp)\rightarrow
\Diamond K(p\land\neg Kp).
$$

But we just proved that its consequent is impossible.
Hence,

$$
\boxed{\neg(p\land\neg Kp)}.
$$

In classical propositional logic, this is equivalent to

$$
\boxed{p\rightarrow Kp}.
$$

Since $p$ was arbitrary:

$$
\boxed{\forall p\,(p\rightarrow Kp)}.
$$

Every truth is known!


> **The crucial distinction:** $$p\land\neg Kp$$ can be true. What cannot be true is that this entire conjunction is known. Consistency of a proposition does not guarantee consistency of knowing it.


## 2. Tennant: restrict which truths must be knowable
Neil Tennant wants to preserve anti-realism without accepting that everything is known.

His proposed solution is ingenious: the knowability principle should apply only to propositions whose being known is logically consistent.

He calls these *Cartesian propositions*.

Neil Tennant proposes applying knowability only to *Cartesian* propositions: those for which assuming knowledge does not yield inconsistency. Schematically,

$$
p\longrightarrow\Diamond Kp \quad\text{only when } Kp\nvdash\bot.
$$

This blocks the original substitution: $$p\land\neg Kp$$ fails the eligibility test. The issue then becomes whether the restriction has an independent philosophical justification and how its consistency test treats necessary background truths.

## 3. Williamson: can ignorance be hidden inside an eligible truth?

In *Tennant on Knowable Truth* (2000), Timothy Williamson challenges the ad-hoc restriction with a modified construction. 


Let $$n$$ rigidly name an actual number of books, and let $$E(n)$$ mean that this number is even. Since the number of books is fixed, in the relevant modal interpretation, either $E(n)$ is necessarily true or $\neg E(n)$ is necessarily true. But we may not know which.


Consider

$$
r:=p\land(Kp\to E(n)).
$$

This is much less obviously problematic than Fitch's original proposition $q$.

If $$p$$ is true but unknown, $$r$$ is true because the conditional has a false antecedent. If $$r$$ is known, conjunction elimination and factivity yield $$Kp$$ and $$Kp\to E(n)$$, hence $$E(n)$$. Knowability of $$r$$ would therefore imply possible evenness; rigid numerical parity makes that actual evenness. Repeating with oddness produces a contradiction—*if both constructed propositions qualify as Cartesian*.

That qualification is disputed. Tennant’s 2001 reply counts necessary truths in the consistency test: if $$n$$ is necessarily odd, knowledge of the evenness construction is inconsistent, and conversely. On that reading, the restriction blocks one application. 

## 4. Why this is different from a self-referential paradox

The liar sentence says, “This sentence is false.” It refers to itself, producing a feedback loop between its own content and its truth status. Fitch needs no sentence that names itself and no diagonal construction. Start with any ordinary $$p$$—a ball’s color, for example—and form a new statement about $$p$$’s epistemic status.

Fitch is closer to a Moore-style puzzle: “It is raining, but I do not know that it is raining” may describe reality correctly even though knowing its entire content is impossible. The obstruction is epistemic structure rather than semantic self-reference.

## 5. What the paradox leaves open

The result exposes how demanding the word “every” is. An assurance about discovering ordinary facts becomes a much stronger claim when it covers arbitrary compounds involving knowledge.

One can restrict knowability, revise its modal or temporal interpretation, or reconsider the logic. In intuitionistic logic the argument yields $$p\to\neg\neg Kp$$, without generally licensing the final step to $$p\to Kp$$. 


## Further reading

1. Frederic B. Fitch (1963), “A Logical Analysis of Some Value Concepts,” *The Journal of Symbolic Logic* 28: 135–142.
2. Neil Tennant (1997), *The Taming of the True*, Chapter 8.
3. Timothy Williamson (2000), [“Tennant on Knowable Truth,”](https://doi.org/10.1111/1467-9329.00113) *Ratio* 13: 99–114.
4. Neil Tennant (2001), [“Is Every Truth Knowable? Reply to Williamson,”](https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/a/4597/files/2014/07/tennant_ratio2001-1w66fnw.pdf) *Ratio* 14: 263–280.
5. Berit Brogaard and Joe Salerno, [“Fitch’s Paradox of Knowability,”](https://plato.stanford.edu/entries/fitch-paradox/) *Stanford Encyclopedia of Philosophy* (overview and further debate).
