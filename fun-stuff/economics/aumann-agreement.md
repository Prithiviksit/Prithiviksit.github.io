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

That is the proof.
If Alice reports the same probability on every one of her cells inside $$C$$, averaging across those cells must preserve that probability.
Bob's different partition gives another way of averaging over exactly the same event under exactly the same prior.
The two averages cannot differ.

Neither person needs to know which of the other's information cells has occurred.
The proof requires common knowledge of the posterior numbers, not disclosure of the underlying signals.

## Why announcing old probabilities need not produce immediate agreement

A subtlety matters when we turn the theorem into a conversation.
Announcing a probability reveals a calculation made *before* the announcement.
The listener's response may change what each person should believe now.
Common knowledge of yesterday's opinions is not common knowledge of today's posteriors.

Return to actual state $$1$$ in our four-state example.
Suppose Alice and Bob simultaneously announce their current probabilities, publicly and truthfully, and this protocol is understood by both.
They then update before the next round.

**First round.** They announce $$1/2$$ and $$1/3$$.
Alice's announcement excludes nothing: her initial posterior was $$1/2$$ everywhere.
Bob's announcement excludes state $$4$$.
The public set of possible states becomes $$\{1,2,3\}$$.

At the actual state, Alice still considers $$\{1,2\}$$ possible, so her updated probability remains $$1/2$$.
Bob still considers $$\{1,2,3\}$$ possible, so his remains $$1/3$$.
They have publicly announced their probabilities and still disagree.

There is no contradiction.
At state $$3$$, Alice would now know the state is $$3$$, because the public announcement has removed $$4$$ from her cell.
Her updated probability there would be zero.
Bob cannot exclude that possibility, so Alice's *current* probability is not common knowledge.

**Second round.** At actual state $$1$$, they again announce $$1/2$$ and $$1/3$$.
This time Alice's announcement excludes state $$3$$, where she would have announced zero.
The public set shrinks to $$\{1,2\}$$.
Both now assign probability $$1/2$$ to $$E$$.

| Information available | Publicly possible states | Alice's current posterior at state 1 | Bob's current posterior at state 1 |
| --- | --- | --- | --- |
| Before announcements | $$\{1,2,3,4\}$$ | $$1/2$$ | $$1/3$$ |
| After the first round | $$\{1,2,3\}$$ | $$1/2$$ | $$1/3$$ |
| After the second round | $$\{1,2\}$$ | $$1/2$$ | $$1/2$$ |

The second announcement repeats the same numbers but conveys new information because the public information has changed what Alice would say in another state.
No one reveals the exact state: $$1$$ and $$2$$ remain possible.
Agreement does not require complete information.
The theorem itself is a restriction on commonly known current beliefs; this example supplies a particular communication process that reaches them.

## From agreement to the logic of no trade

Imagine a claim that pays one dollar if $$E$$ occurs and zero otherwise.
Let $$X=\mathbf 1_E$$ denote its payoff.
Two risk-neutral traders value it at their respective conditional expectations of $$X$$.

If one assigns probability $$0.7$$ and the other $$0.3$$, a price of $$0.5$$ appears to offer both a strict gain.
But if those two *current* probabilities were common knowledge under a common prior, Aumann's theorem would require them to be equal.
That particular explanation for a knowingly mutually profitable bet cannot hold.

The link goes further.
We can rule out strict gains from this fixed-price bet without requiring the exact posterior probabilities to be common knowledge.
Suppose a fixed price $$p$$ and both traders' willingness to trade one unit are common knowledge on a positive-probability component $$C$$.
Write $$\mathcal I_B$$ and $$\mathcal I_S$$ for the buyer's and seller's information.
Willingness to participate requires, throughout $$C$$,

$$
\mathbb E[X\mid\mathcal I_B]\geq p,
\qquad
\mathbb E[X\mid\mathcal I_S]\leq p.
$$

Because $$C$$ is known to each trader, averaging either conditional expectation over $$C$$ gives the same number:

$$
\begin{aligned}
\mathbb E\!\left[\mathbb E[X\mid\mathcal I_B]\mid C\right]
&=\mathbb E[X\mid C],\\
\mathbb E\!\left[\mathbb E[X\mid\mathcal I_S]\mid C\right]
&=\mathbb E[X\mid C].
\end{aligned}
$$

The buyer's inequality implies $$\mathbb E[X\mid C]\geq p$$, while the seller's implies $$\mathbb E[X\mid C]\leq p$$.
Thus $$\mathbb E[X\mid C]=p$$.
Neither participation inequality can be strict at any state in $$C$$: with positive state probabilities, that would make its average strict too.
Both traders must be indifferent throughout $$C$$.

This is the simple betting version of the no-trade logic.
It uses common knowledge of acceptance, which is a weaker informational requirement than common knowledge of the exact posterior numbers.
Risk neutrality still permits trades that leave both sides indifferent.

The [Milgrom–Stokey article](/fun-stuff/economics/milgrom-stokey.html) extends the argument to general reallocations and risk-averse traders.
It assumes the initial allocation is ex ante Pareto efficient and uses common knowledge of the proposed trade's acceptability.
Averaging the conditional utility gains on $$C$$ would turn any strict gain into an ex ante Pareto improvement, contradicting that initial efficiency.
Strict concavity also rules out changes in consumption that would otherwise leave everyone indifferent.

The shared step is averaging over a commonly known event.
Aumann applies it to beliefs and obtains agreement.
Milgrom–Stokey applies it to utility gains and combines it with initial efficiency to obtain no trade.
The latter does not require every posterior belief to become common knowledge or every private signal to become public.

## What the theorem does and does not demand

The common prior is substantive.
If Alice and Bob begin with different priors, publicly known disagreement can persist even without private information.
For example, with no signals at all, one can assign $$E$$ probability $$0.7$$ and the other $$0.3$$; both numbers can be common knowledge because the distributions they condition are different.

Agreement also concerns the same event.
Two people can agree completely about a project's chances and disagree about whether it is worth pursuing because they have different costs, preferences, or risk tolerance.
The theorem does not identify a common probability with a common decision.

Finally, ordinary conversation rarely supplies the exact assumptions in the theorem.
The participants may not share a probability model, know how the other's evidence was selected, report precise current probabilities, or carry out all the required updates.
Nothing here turns every unresolved argument into proof of irrationality.

Aumann's result asks us to treat someone else's considered belief as information.
Under a common prior and the common-knowledge conditions, different current probabilities cannot form a settled, commonly understood disagreement.
The [no-trade theorem](/fun-stuff/economics/milgrom-stokey.html) asks us to apply the same discipline to a counterparty's willingness to buy or sell.

For the original statement, proof, and distinction between mutual and common knowledge, see [Aumann (1976), *Agreeing to Disagree*, pages 1236–1238](https://www.haverford.edu/sites/default/files/Aumann1976.pdf).
