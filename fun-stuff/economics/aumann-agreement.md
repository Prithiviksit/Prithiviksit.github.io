---
layout: fun-article
title: "Can We Agree to Disagree? Aumann's Agreement Theorem"
description: "A four-state example and rigorous proof of Aumann's agreement theorem, explaining common knowledge, Bayesian updating, and the connection to Milgrom–Stokey's no-trade theorem."
group: Economics
subtitle: "Different information can produce different beliefs. Common knowledge of those beliefs changes the problem."
lead: "You think an event has a fifty percent chance. I think it has a one-third chance. Can we understand each other's assessments, trust each other's reasoning, and leave it there?"
permalink: /fun-stuff/economics/aumann-agreement.html
date: 2026-11-05T19:03:52-07:00
published: true
---

Two analysts study the same company.
They begin with the same view of its prospects but receive different reports.
One thinks a product launch will succeed; the other is less convinced.
There is nothing surprising about their disagreement.
They have different information.

Now suppose each analyst understands how the other reaches a conclusion.
Learning the other person's assessment is itself news: it reveals something about the report they must have received.
The analysts should update again, taking that news into account.

Robert Aumann's 1976 paper, [*Agreeing to Disagree*](https://doi.org/10.1214/aos/1176343654), gives a striking result about this process:

> If two Bayesian agents share a common prior, and their current posterior probabilities of the same event are common knowledge, those probabilities must be equal.

The demanding phrase is **common knowledge**.
It means more than each person knowing the other's probability.
We will see exactly why, then prove the result by taking a weighted average.

This is also the natural starting point for the companion article on [Milgrom–Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html).
There, people learn from each other's willingness to trade.
The same logic of conditioning on commonly known information connects the two results.

## The probability model

There is a finite set of possible states, $$\Omega$$, and an event $$E\subseteq\Omega$$ whose probability interests Alice and Bob.
A state gives a complete description of the uncertainty in the model, including which information each person receives.

Both use the same prior probability distribution $$\mathbb P$$, which assigns positive probability to every state.
They need not receive the same information.
The information structure, the common prior, and their use of Bayesian updating are part of the commonly understood model.

Each person's information divides the states into **information cells**.
Upon receiving a signal, the person learns which cell contains the true state, but cannot distinguish states within that cell.
Write $$I_i(\omega)$$ for person $$i$$'s cell when the true state is $$\omega$$, where $$i=A,B$$.
Their posterior is

$$
\mathbb P(E\mid I_i(\omega))
=\frac{\mathbb P(E\cap I_i(\omega))}{\mathbb P(I_i(\omega))}.
$$

The positive-probability assumption keeps all these conditional probabilities well defined.
The common prior is a distribution over the entire model, not merely agreement on a single headline probability such as the chance of success before seeing a report.

## Different information can produce different probabilities

Consider four equally likely states,

$$
\Omega=\{1,2,3,4\},\qquad E=\{1,4\}.
$$

Alice learns whether the state belongs to $$\{1,2\}$$ or $$\{3,4\}$$.
Bob learns whether it belongs to $$\{1,2,3\}$$ or is exactly $$4$$.
This is a numerical version of the counterexample to mere mutual knowledge in Aumann's paper.
The posteriors follow by counting equally likely states:

| State | Does $$E$$ occur? | Alice's information cell | Bob's information cell | Alice's posterior | Bob's posterior |
| --- | --- | --- | --- | --- | --- |
| 1 | Yes | $$\{1,2\}$$ | $$\{1,2,3\}$$ | $$1/2$$ | $$1/3$$ |
| 2 | No | $$\{1,2\}$$ | $$\{1,2,3\}$$ | $$1/2$$ | $$1/3$$ |
| 3 | No | $$\{3,4\}$$ | $$\{1,2,3\}$$ | $$1/2$$ | $$1/3$$ |
| 4 | Yes | $$\{3,4\}$$ | $$\{4\}$$ | $$1/2$$ | $$1$$ |

Suppose the actual state is $$1$$.
Alice's information leaves one favorable state out of two, so her probability is $$1/2$$.
Bob's leaves one favorable state out of three, so his probability is $$1/3$$.
Both calculations are correct.

More surprisingly, **each person already knows the other's probability**.
Alice considers only states $$1$$ and $$2$$ possible, and Bob's posterior is $$1/3$$ in both.
Bob considers states $$1,2,3$$ possible, and Alice's posterior is $$1/2$$ in all three.

Yet their probabilities differ.
So “we each know what the other thinks” cannot be the condition that forces agreement.

## What common knowledge adds

Common knowledge requires every level of the knowledge hierarchy.
Alice and Bob know their two probabilities; Alice knows that Bob knows them; Bob knows that Alice knows them; each knows that the other knows that the other knows them; and so on.

In our example, this hierarchy breaks quickly.
Bob considers state $$3$$ possible.
At state $$3$$, Alice's information cell would be $$\{3,4\}$$, so she would consider two possible Bob posteriors: $$1/3$$ at state $$3$$ and $$1$$ at state $$4$$.
Thus Bob does not know that Alice knows his probability.
Mutual knowledge holds at state $$1$$, but common knowledge does not.

There is a useful way to represent all these levels at once.
Start from the actual state and add every state that either person cannot distinguish from it.
Repeat from the newly added states until no more can be added.
Call the resulting set $$C$$, the **common-knowledge component**.

In this example, the following chain already reaches every state:

$$
1\;\overset{A}{\longleftrightarrow}\;2
\;\overset{B}{\longleftrightarrow}\;3
\;\overset{A}{\longleftrightarrow}\;4.
$$

An edge labeled $$A$$ or $$B$$ means that person cannot distinguish the two states.
It represents possible reasoning about information, not a message being sent.
Here $$C=\Omega$$.

An assertion is common knowledge at the actual state precisely when it holds throughout $$C$$.
Intuitively, a statement about what Alice knows must hold at every state she considers possible; a statement about what she knows Bob knows must also survive a further step through Bob's possibilities.
Allowing any finite number of such steps gives the whole component.

The important structural fact is that **$$C$$ is a union of whole information cells for each person**.
If a cell intersects $$C$$, all its states are reachable and hence belong to $$C$$.
The event $$C$$ can therefore be recognized using either person's information.

In our example, the claim that Bob's posterior is $$1/3$$ fails at state $$4$$.
It cannot be common knowledge at state $$1$$ because state $$4$$ lies in the same component.

For a version of this distinction without probabilities, see the [forty cheating husbands puzzle](/fun-stuff/logics/forty-cheating-husbands.html).
Everyone already knows that somebody is unfaithful, yet a public announcement of that fact changes what they can deduce about one another.
The article proves the forty-night result and shows why private delivery of the same message can produce a different outcome.

The [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) takes the next step: even a long exchange of acknowledgments can leave strategically important uncertainty about what the other person knows.
Its explicit payoff model shows why increasingly deep mutual knowledge need not support the same coordination as common knowledge.

## The theorem and its proof

Suppose Alice's current posterior is $$p_A$$ and Bob's is $$p_B$$.
Assume these two numbers are common knowledge at the actual state.
They must therefore remain the respective posteriors at every state in its common-knowledge component $$C$$.

Consider Alice first.
Because $$C$$ is a union of her information cells, we can partition it into disjoint cells $$D$$.
On every such cell,

$$
\mathbb P(E\mid D)=p_A,
$$

so

$$
\mathbb P(E\cap D)=p_A\,\mathbb P(D).
$$

Sum over Alice's cells inside $$C$$:

$$
\mathbb P(E\cap C)
=\sum_D\mathbb P(E\cap D)
=p_A\sum_D\mathbb P(D)
=p_A\,\mathbb P(C).
$$

Since $$\mathbb P(C)>0$$,

$$
\mathbb P(E\mid C)=p_A.
$$

Apply the same argument using Bob's information cells.
It gives

$$
\mathbb P(E\mid C)=p_B.
$$

Both numbers equal the same conditional probability, so

$$
\boxed{p_A=p_B.}
$$

That completes the proof.
Because Alice assigns the same probability $$p_A$$ to $$E$$ on every one of her information cells inside $$C$$, averaging across those cells preserves $$p_A$$.
Bob's partition divides the very same event $$C$$ into his own cells, so averaging his posterior across them preserves $$p_B$$.
Both averages equal $$\mathbb P(E\mid C)$$, and therefore $$p_A=p_B$$.
Notice that neither person needs to learn *which* cell the other observed—only the resulting posterior numbers need to be common knowledge.

## Why announcing old probabilities need not produce immediate agreement

Turning the static theorem into a back-and-forth conversation introduces a dynamic twist.
When Alice announces her probability, she is reporting the assessment she held *before* hearing Bob's announcement.
Once both speak, the public announcement itself provides new evidence, so each may need to revise that number.

Return to actual state $$1$$ in our four-state example.
Suppose Alice and Bob simultaneously and truthfully announce their current probabilities round by round, updating after each exchange.

**First round.** They announce $$1/2$$ and $$1/3$$.
Alice's announcement rules out nothing, since her initial posterior was $$1/2$$ in every state.
Bob's announcement of $$1/3$$ rules out state $$4$$, where he would have announced $$1$$.
The publicly possible states shrink to $$\{1,2,3\}$$.

At the actual state $$1$$, Alice's cell $$\{1,2\}$$ is untouched, so her updated probability stays $$1/2$$.
Bob's cell $$\{1,2,3\}$$ is also untouched, so his updated probability stays $$1/3$$.
Even after announcing their probabilities in public, they still disagree!

Why doesn't Aumann's theorem apply yet?
Because after the first round, Alice's *updated* probability is no longer $$1/2$$ at every remaining state.
If the true state were $$3$$, ruling out state $$4$$ would narrow Alice's cell from $$\{3,4\}$$ down to $$\{3\}$$ alone, dropping her updated probability to $$0$$.
Since Bob considers state $$3$$ possible, he does not yet know whether Alice's updated probability is $$1/2$$ or $$0$$.

**Second round.** At state $$1$$, Alice and Bob again announce $$1/2$$ and $$1/3$$.
Now Alice's announcement of $$1/2$$ rules out state $$3$$, where she would have announced $$0$$.
The public set shrinks to $$\{1,2\}$$, and Bob updates his probability to $$1/2$$, matching Alice:

| Information available | Publicly possible states | Alice's current posterior at state 1 | Bob's current posterior at state 1 |
| --- | --- | --- | --- |
| Before announcements | $$\{1,2,3,4\}$$ | $$1/2$$ | $$1/3$$ |
| After the first round | $$\{1,2,3\}$$ | $$1/2$$ | $$1/3$$ |
| After the second round | $$\{1,2\}$$ | $$1/2$$ | $$1/2$$ |

Repeating the exact same numbers in Round 2 conveys fresh information because Round 1 changed what Alice *would* have said in state $$3$$.
Notice too that Alice and Bob reach agreement without learning the exact state: both $$1$$ and $$2$$ remain open.

## From agreement to the logic of no trade

Now turn the probability assessment into a bet.
Suppose a contract pays one dollar if $$E$$ occurs and zero otherwise, with payoff $$X=\mathbf 1_E$$.
Two risk-neutral traders value the contract at their conditional expectations of $$X$$.
If Alice assigned probability $$0.7$$ and Bob assigned $$0.3$$, trading at a price of $$0.5$$ would seem to give both a strict expected profit—until Aumann's theorem reminds us that two unequal posteriors cannot be common knowledge under a common prior.

In fact, ruling out a mutually profitable fixed-price bet does not even require the traders' exact posteriors to become common knowledge; common knowledge that both are *willing to trade* at price $$p$$ is already enough.
Suppose the price $$p$$ and both traders' willingness to trade one unit are common knowledge on a positive-probability component $$C$$.
Writing $$\mathcal I_B$$ and $$\mathcal I_S$$ for the buyer's and seller's information partitions, willingness to trade requires, throughout $$C$$,

$$
\mathbb E[X\mid\mathcal I_B]\geq p,
\qquad
\mathbb E[X\mid\mathcal I_S]\leq p.
$$

Because $$C$$ is a union of cells for each trader, the law of iterated expectations gives

$$
\begin{aligned}
\mathbb E\!\left[\mathbb E[X\mid\mathcal I_B]\mid C\right]
&=\mathbb E[X\mid C],\\
\mathbb E\!\left[\mathbb E[X\mid\mathcal I_S]\mid C\right]
&=\mathbb E[X\mid C].
\end{aligned}
$$

The buyer's inequality implies $$\mathbb E[X\mid C]\geq p$$, while the seller's implies $$\mathbb E[X\mid C]\leq p$$, forcing $$\mathbb E[X\mid C]=p$$.
Since every state has positive probability, neither trader's conditional expectation can beat $$p$$ strictly at any state in $$C$$: both traders must be indifferent throughout $$C$$.

The companion [Milgrom–Stokey article](/fun-stuff/economics/milgrom-stokey.html) generalizes this argument to arbitrary state-contingent allocations and risk-averse traders.
Starting from an ex ante Pareto-efficient allocation, averaging conditional utility gains over $$C$$ turns any interim speculative gain into an ex ante Pareto improvement—a contradiction.
When traders are strictly risk averse, strict concavity also rules out nonzero consumption trades that would leave everyone indifferent in expected utility.

## Where the assumptions bite

Two ingredients drive Aumann's result:

- **The common prior.** If Alice and Bob start with different prior distributions over $$\Omega$$, they can openly disagree even without private signals—say, $$0.7$$ versus $$0.3$$—and that disagreement can be full common knowledge.
- **Common knowledge of current beliefs about the same event.** Two people who agree on the probability of $$E$$ can still make opposite choices because their payoffs, outside options, or attitudes toward risk differ.

Aumann's theorem shows that under a shared prior, another person's posterior belief works just like a piece of data: once both sides fully absorb what each other's conclusions reveal, different private signals cannot sustain a commonly known disagreement.
The [Milgrom–Stokey no-trade theorem](/fun-stuff/economics/milgrom-stokey.html) applies the exact same logic to a counterparty's willingness to buy or sell.

For the original statement, proof, and four-state example, see [Aumann (1976), *Agreeing to Disagree*, pages 1236–1238](https://www.haverford.edu/sites/default/files/Aumann1976.pdf).
