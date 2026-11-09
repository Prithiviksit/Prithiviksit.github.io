---
layout: fun-article
title: "Yablo's Paradox: Contradiction Without a Loop?"
description: "Yablo's infinite list, the debate about hidden self-reference, and why every finite version has a solution while the infinite version does not."
group: Logics
subtitle: "An infinite list of sentences, each looking only ahead."
lead: "The liar says, ‘This sentence is not true.’ What happens if we forbid sentences from talking about themselves—and let them talk only about what comes later?"
permalink: /fun-stuff/logics/yablo-paradox.html
published: false
---

## The list

In [*Paradox without Self-Reference*](https://www.mit.edu/~yablo/pwsr.pdf), Stephen Yablo proposes an infinite sequence:

| Sentence | What it says |
| --- | --- |
| $$S_1$$ | Every sentence after this one is untrue. |
| $$S_2$$ | Every sentence after this one is untrue. |
| $$S_3$$ | Every sentence after this one is untrue. |
| $$\vdots$$ | $$\vdots$$ |

Each sentence concerns only later sentences.
Following these references never brings us back to our starting point.

Try assigning every sentence an ordinary truth value, true or false, consistent with what it says.
Suppose some $$S_n$$ is true.
Then all later sentences are false, including $$S_{n+1}$$.
But every sentence after $$S_{n+1}$$ is also false, which makes $$S_{n+1}$$ true.
Contradiction.

So no sentence can be true.
Yet if all are false, every sentence correctly says that all later sentences are false.
They would all be true.
There is no consistent assignment.

That is [Yablo's argument](https://www.mit.edu/~yablo/pwsr.pdf).
The proof is short; the disagreement concerns what it teaches us about self-reference.

## Why infinity matters

First stop the list at sentence $$N$$, changing each claim to cover only the later sentences in this finite list.
The last sentence is true: there are no later sentences to contradict it.
Every earlier sentence is false because that last, true sentence lies ahead.

For example:

| Length | Consistent assignment, from first to last |
| --- | --- |
| 1 | True |
| 2 | False, True |
| 3 | False, False, True |
| 4 | False, False, False, True |

Every finite list has this solution.
Extending the list moves its sole true sentence one place farther out.
For any fixed position, the assigned value eventually becomes false.
But the resulting infinite assignment—all false—fails: it makes every claim correct.
**Taking a limit of the finite solutions does not produce a solution of the infinite problem.**

The reason is precise.
At every finite cutoff, an earlier sentence is false because a later true sentence provides a counterexample.
As the cutoff recedes, that counterexample moves beyond every fixed position.
There is no sentence “at infinity” where it finally settles: the list is indexed by the positive integers, which have no last member.

Infinity also changes the structure of dependence.
In a finite forward-pointing list, we can start at the end and work backward.
In Yablo's list, following references can continue forever without either stopping or returning.
**Having no circular path does not guarantee having a place to start evaluating truth.**

Still, an endless chain alone is insufficient.
If each sentence said only “The next sentence is false,” alternating true and false would work forever.
Yablo's stronger demand covers **every** later sentence: a true sentence forces an entirely false tail, which immediately makes the next sentence true too.
The combination of no endpoint and this whole-tail condition drives the contradiction.

## How philosophers react

One response accepts Yablo's challenge: perhaps we have blamed circularity for a problem that can arise without it.
[Roy Sorensen (1998)](https://doi.org/10.1093/mind/107.425.137) defends this interpretation and develops related infinite paradoxes.
The forward-only references are central to its appeal.

Another response asks whether self-reference has merely moved into the rule specifying the list.
Graham Priest argues that the uniform predicate used to generate the sequence contains a self-referential fixed point.
[Jc Beall (2001, §§2–3)](https://entailments.net/papers/yablo.pdf) develops that objection and argues that Sorensen's replies do not answer it.
Their concern is how we specify what all these sentences say, even though the displayed references never form a loop.

The distinction matters: **a circular description and a circular pattern of references are different claims**.
The debate asks whether the former is essential here and whether it undermines Yablo's advertised escape from self-reference.
Pointing out the absence of backward arrows does not, by itself, settle that dispute.

A further temptation is to say that the sentences simply lack truth values.
That abandons the demand for an ordinary true-or-false assignment, but it needs a theory of truth to explain the result.
In particular, Yablo says *untrue*: if “neither true nor false” still counts as not true, declaring every sentence truth-valueless seems to make every sentence's claim hold again.
Changing the semantics requires more than adding an “undefined” label.

The narrow lesson survives these disagreements.
The contradiction rules out a classical truth assignment satisfying these particular conditions; it does not show that infinity itself is inconsistent.
Infinity permits an endless, forward-only dependence, and the whole-tail claims make that dependence impossible to satisfy.
