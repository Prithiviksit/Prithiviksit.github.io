---
layout: fun-article
title: "Yablo's Paradox: Contradiction Without Self-Reference?"
description: "Yablo's infinite list, the debate about hidden self-reference, and why every finite version has a solution while the infinite version does not."
group: Logics
subtitle: "An infinite list of sentences, each looking only ahead."
lead: "The liar says, ‘This sentence is not true.’ What happens if we forbid sentences from talking about themselves—and let them talk only about what comes later?"
permalink: /fun-stuff/logics/yablo-paradox.html
published: false
---

## The list

In [*Paradox without Self-Reference*](https://www.mit.edu/~yablo/pwsr.pdf), Stephen Yablo invites us to consider an infinite sequence of sentences:

| Sentence | What it says |
| --- | --- |
| $$S_1$$ | Every sentence after this one is untrue. |
| $$S_2$$ | Every sentence after this one is untrue. |
| $$S_3$$ | Every sentence after this one is untrue. |
| $$\vdots$$ | $$\vdots$$ |

Each sentence talks only about the sentences that come after it.
No matter how far we follow the chain of references, it never loops back to where it started.

Yet something goes wrong as soon as we try to assign every sentence an ordinary truth value—true or false—that matches what it says.
Suppose some sentence $$S_n$$ is true.
Then every sentence after $$S_n$$ must be false, including $$S_{n+1}$$.
It also follows that every sentence after $$S_{n+1}$$ is false—which is precisely what $$S_{n+1}$$ claims, making $$S_{n+1}$$ true after all.
That is a contradiction.

So no sentence in the list can be true.
Every sentence must therefore be false.
Wait: if every sentence is false, then for each sentence, all the sentences after it really are untrue—which makes every sentence true.
Contradiction again.
No consistent assignment of truth values is possible.

That is [Yablo's argument](https://www.mit.edu/~yablo/pwsr.pdf).
The deduction itself takes only a few lines; the real controversy is what it tells us about the role of self-reference in semantic paradoxes.

## Why infinity matters

To see what infinity is doing here, cut the list off at some finite length $$N$$, so that each sentence makes a claim only about the remaining sentences in that finite list.
Now the last sentence is vacuously true: there are no later sentences left to falsify it.
And because that last sentence is true, every earlier sentence has a true sentence ahead of it and is therefore false.

Here is how the truth values settle for the first few finite cutoffs:

| Length | Consistent assignment, from first to last |
| --- | --- |
| 1 | True |
| 2 | False, True |
| 3 | False, False, True |
| 4 | False, False, False, True |

Every finite version of the list has this unique, consistent solution.
Each time we lengthen the list by one sentence, the lone “True” shifts one step farther down.
If we watch any fixed position as the list grows past it, its truth value becomes false and stays false forever.
Yet if we take the pointwise limit of these finite solutions and declare *every* sentence in the infinite list false, the assignment collapses: an all-false tail makes every sentence true.
**The limit of the finite solutions is not a solution to the infinite problem.**

Why does the limit fail?
In every finite list, the earlier sentences are held false by a single counterexample—the true sentence at the very end.
As the cutoff recedes toward infinity, that counterexample is pushed past every fixed position and vanishes.
With no last positive integer, no final sentence remains to anchor the falsity of the ones before it.

Moving to an infinite list also changes how truth values are grounded.
In a finite list where each sentence points only forward, we can start at the end and work backward step by step.
In Yablo's infinite list, the chain of dependence runs on forever without either terminating or looping back.
**Eliminating circularity removes loops, but an infinite sequence can still lack a starting point from which truth values can be grounded.**

What turns that ungrounded chain into a paradox is how much each sentence demands.
If each sentence said only “The very next sentence is false,” we could happily alternate true and false forever.
Yablo's sentences instead quantify over **every** later sentence: a single true sentence forces the entire remainder of the list to be false, which immediately makes the very next sentence true as well.
The contradiction comes from pairing an endless chain with claims that sweep across the entire tail.

## How philosophers react

Philosophers divide over whether Yablo has genuinely banished circularity or merely relocated it.

One camp takes the construction at face value: semantic paradoxes do not require circularity after all, and blaming the Liar paradox solely on self-reference was a mistake.
[Roy Sorensen (1998)](https://doi.org/10.1093/mind/107.425.137) champions this view and develops a family of related infinite paradoxes built on strictly forward-looking chains.

The opposing camp argues that self-reference has simply moved into the rule that defines the sequence.
Graham Priest contends that the uniform predicate used to generate the infinite list contains a hidden self-referential fixed point.
[Jc Beall (2001, §§2–3)](https://entailments.net/papers/yablo.pdf) sharpens this objection and argues that Sorensen's replies do not escape it.
Even though the displayed references never form a loop, we still have to specify what all these infinitely many sentences say through a single defining rule.

The dispute turns on a distinction between **a circular description** and **a circular pattern of references**.
No sentence in the list points backward, so the reference graph has no cycles; the open question is whether defining the infinite sequence still relies on a covert fixed point.

What if we drop classical bivalence and say that the sentences are neither true nor false?
Here Yablo's wording—*untrue* rather than *false*—creates an immediate hurdle: if a sentence with no truth value still counts as not true, then declaring every sentence truth-valueless makes every later sentence untrue, which makes every sentence's claim hold all over again.
Avoiding the contradiction through truth-value gaps requires a formal semantics that explains how “untrue” behaves when bivalence fails.

Whatever stance one takes on hidden circularity, the mechanism behind the paradox is clear.
Infinity makes room for an endless, forward-only chain of dependence, and the whole-tail claims make that dependence impossible to satisfy.
