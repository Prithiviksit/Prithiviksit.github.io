---
layout: fun-article
title: "Can every truth be known?"
description: "How every truth being knowable can imply every truth is known—and why this is not the liar paradox. With Tennant’s restriction and Williamson’s objection."
group: Logics
subtitle: "Fitch’s paradox of knowability · Tennant’s restriction · Williamson’s challenge"
lead: "A modest hope—that no truth is forever beyond discovery—has a startling logical consequence: every truth is already known."
permalink: /fun-stuff/logics/fitch-knowability.html
---

## 1. The gap between possible and actual knowledge

Imagine a sealed box containing a red ball. Nobody has opened it. The ball’s color is unknown, but discovering it seems perfectly possible. “Every truth can be known” sounds compatible with a world full of unopened boxes.

Fitch’s paradox asks whether that compatibility survives when “every truth” includes truths about ignorance itself. Let $$Kp$$ mean that $$p$$ is known and $$\Diamond Kp$$ that it is possible for $$p$$ to be known. The unrestricted knowability principle is the schema

$$
p \longrightarrow \Diamond Kp.
$$

Its classical consequence is much stronger:

$$
p \longrightarrow Kp.
$$

This is a conflict among assumptions about truth, knowledge, and possibility. It does not establish that human beings are omniscient.

## 2. The proof in a few steps

Use two elementary principles: knowledge is factive, and knowing a conjunction entails knowing each conjunct.

$$
Kq \longrightarrow q, \qquad K(q\land r)\longrightarrow (Kq\land Kr).
$$

Assume there is a true but unknown proposition $$p$$. Then another proposition is true:

$$
q := p\land\neg Kp.
$$

In words: “$$p$$ is true, and $$p$$ is not known.” Universal knowability says that this whole conjunction can be known. But suppose it were known:

$$
K(p\land\neg Kp).
$$

Conjunction elimination gives both $$Kp$$ and $$K\neg Kp$$. Factivity applied to the latter gives $$\neg Kp$$. We obtain

$$
Kp\land\neg Kp,
$$

a contradiction. Since these principles hold throughout the relevant possible situations, knowing the conjunction is impossible. Yet knowability required it to be possible. Thus the assumptions rule out $$p\land\neg Kp$$; in classical logic, this yields $$p\to Kp$$.

> **The crucial distinction:** $$p\land\neg Kp$$ can be true. What cannot be true is that this entire conjunction is known. Consistency of a proposition does not guarantee consistency of knowing it.

## 3. Why opening the box does not solve it

Opening the box can teach you that the ball is red. It cannot make you know, in that same epistemic situation, that the ball is red and its redness is unknown. The act of learning defeats the second conjunct.

You might later know that its color *was* unknown yesterday. That is a different proposition, with a time index held fixed:

$$
K_{t_1}(p\land\neg K_{t_0}p),\qquad t_0<t_1.
$$

This entails knowledge at $$t_1$$ and ignorance at $$t_0$$, which are compatible. The formal paradox therefore requires care about how knowledge, time, and possibility are interpreted. Replacing knowledge-in-a-possible-situation with later knowledge of an earlier situation changes the principle being tested.

## 4. Tennant: restrict which truths must be knowable

Neil Tennant proposes applying knowability only to *Cartesian* propositions: those for which assuming knowledge does not yield inconsistency. Schematically,

$$
p\longrightarrow\Diamond Kp \quad\text{only when } Kp\nvdash\bot.
$$

This blocks the original substitution: $$p\land\neg Kp$$ fails the eligibility test. The issue then becomes whether the restriction has an independent philosophical justification and how its consistency test treats necessary background truths.

## 5. Williamson: can ignorance be hidden inside an eligible truth?

In *Tennant on Knowable Truth* (2000), Timothy Williamson challenges the restriction with a modified construction. Let $$n$$ rigidly name an actual number of books, and let $$E(n)$$ mean that this number is even. Consider

$$
r:=p\land(Kp\to E(n)).
$$

If $$p$$ is true but unknown, $$r$$ is true because the conditional has a false antecedent. If $$r$$ is known, conjunction elimination and factivity yield $$Kp$$ and $$Kp\to E(n)$$, hence $$E(n)$$. Knowability of $$r$$ would therefore imply possible evenness; rigid numerical parity makes that actual evenness. Repeating with oddness produces a contradiction—*if both constructed propositions qualify as Cartesian*.

That qualification is disputed. Tennant’s 2001 reply counts necessary truths in the consistency test: if $$n$$ is necessarily odd, knowledge of the evenness construction is inconsistent, and conversely. On that reading, the restriction blocks one application. The disagreement concerns the eligibility test itself; Williamson’s proposed refutation should not be presented as uncontested.

## 6. Why this is different from a self-referential paradox

The liar sentence says, “This sentence is false.” It refers to itself, producing a feedback loop between its own content and its truth status. Fitch needs no sentence that names itself and no diagonal construction. Start with any ordinary $$p$$—a ball’s color, for example—and form a new statement about $$p$$’s epistemic status.

| Feature | Liar | Fitch |
| --- | --- | --- |
| Problematic statement | “This sentence is false.” | “$$p$$ is true and unknown.” |
| Self-reference required? | Yes, in the familiar formulation. | No. |
| Where contradiction arises | Assigning the sentence a classical truth value. | Assuming the whole conjunction can be known. |
| Pressure on a theory | Its treatment of truth and self-reference. | Its universal knowability principle and epistemic logic. |

Fitch is closer to a Moore-style puzzle: “It is raining, but I do not know that it is raining” may describe reality correctly even though knowing its entire content is impossible. The obstruction is epistemic structure rather than semantic self-reference.

## 7. What the paradox leaves open

The result exposes how demanding the word “every” is. An assurance about discovering ordinary facts becomes a much stronger claim when it covers arbitrary compounds involving knowledge.

One can restrict knowability, revise its modal or temporal interpretation, or reconsider the logic. In intuitionistic logic the argument yields $$p\to\neg\neg Kp$$, without generally licensing the final step to $$p\to Kp$$. None of these responses is simply “ignore the tricky sentence”; each changes a substantive commitment.

## Further reading

1. Frederic B. Fitch (1963), “A Logical Analysis of Some Value Concepts,” *The Journal of Symbolic Logic* 28: 135–142.
2. Neil Tennant (1997), *The Taming of the True*, Chapter 8.
3. Timothy Williamson (2000), [“Tennant on Knowable Truth,”](https://doi.org/10.1111/1467-9329.00113) *Ratio* 13: 99–114.
4. Neil Tennant (2001), [“Is Every Truth Knowable? Reply to Williamson,”](https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/a/4597/files/2014/07/tennant_ratio2001-1w66fnw.pdf) *Ratio* 14: 263–280.
5. Berit Brogaard and Joe Salerno, [“Fitch’s Paradox of Knowability,”](https://plato.stanford.edu/entries/fitch-paradox/) *Stanford Encyclopedia of Philosophy* (overview and further debate).
