---
layout: fun-article
title: "Rubinstein's Email Game: Why One More Confirmation May Not Help"
description: "A numerical version and rigorous proof of Rubinstein's email game, explaining higher-order uncertainty, the no-message condition, and connections to common knowledge."
group: Economics
subtitle: "Reliable messages, unreliable coordination, and the importance of knowing what someone else knows."
lead: "You receive good news and tell your partner. They confirm receipt. You confirm their confirmation. After a hundred messages, what could still prevent you from acting together?"
permalink: /fun-stuff/economics/rubinstein-email-game.html
date: 2026-11-05T19:03:52-07:00
published: true
---

Two firms would benefit from adopting a new technology together.
Adopting alone would be costly.
One firm learns that conditions favor the change and emails the other.
The other replies, the first acknowledges the reply, and the confirmations continue.

Each message is highly reliable.
After enough confirmations, it seems that the firms should be able to proceed.

Ariel Rubinstein's 1989 [*Electronic Mail Game*](https://arielrubinstein.org/papers/32.pdf) makes this intuition uncomfortable.
In a particular communication protocol, even an arbitrarily long finite exchange fails to support the desired coordination in equilibrium, once behavior in the no-message state is fixed.
The problem concerns what each firm believes about the other's information and resulting actions.

We will use a numerical special case of Rubinstein's original model and prove that statement carefully.
We will then change the protocol and see coordination become possible.
This makes the game a useful companion to the [forty cheating husbands puzzle](/fun-stuff/logics/forty-cheating-husbands.html): both turn on the information contained in a missing response, but here actions follow incentives rather than a mandatory rule.

## A coordination problem with two states

Call the players Alice and Bob.
Each chooses between $$A$$, keeping the status quo, and $$B$$, switching.
The state is either $$a$$ or $$b$$, with a common prior

$$
\Pr(a)=\frac23,
\qquad
\Pr(b)=\frac13.
$$

The payoff pairs below list Alice's payoff first.
These are Rubinstein's payoff tables with the coordination reward set to one and the loss from switching alone set to two.

**State $$a$$: keeping the status quo together is best.**

| Alice \ Bob | $$A$$ | $$B$$ |
| --- | --- | --- |
| $$A$$ | $$(1,1)$$ | $$(0,-2)$$ |
| $$B$$ | $$(-2,0)$$ | $$(0,0)$$ |

**State $$b$$: switching together is best.**

| Alice \ Bob | $$A$$ | $$B$$ |
| --- | --- | --- |
| $$A$$ | $$(0,0)$$ | $$(0,-2)$$ |
| $$B$$ | $$(-2,0)$$ | $$(1,1)$$ |

The person who switches alone loses two; the person who stays receives zero.
In state $$b$$, if Alice believes Bob will switch with probability $$q$$, her expected payoff from switching is

$$
q\cdot1+(1-q)(-2)=3q-2.
$$

Staying gives zero regardless of Bob's action.
Switching is therefore strictly better exactly when

$$
q>\frac23.
$$

Alice does not need certainty that Bob will switch.
But she needs enough confidence to justify the downside risk.

If state $$b$$ were publicly revealed, both switching would be a strict Nash equilibrium and would give both players one.
Both staying would also be an equilibrium.
Common knowledge makes the efficient equilibrium available; it does not by itself select it.

## The email protocol

Alice alone initially learns the state.
The computers then follow a fixed protocol:

1. In state $$a$$, no message is sent.
2. In state $$b$$, Alice's computer automatically sends Bob a message.
3. Whenever a computer receives a message, it automatically sends a confirmation, including confirmations of confirmations.
4. Each transmission independently fails with probability $$\varepsilon\in(0,1)$$. The first failure ends the exchange.

Sending messages is automatic, so choosing their content or withholding a reply is not part of either player's strategy.
After the exchange, the players simultaneously choose $$A$$ or $$B$$.

Each sees only the number of messages their own computer **sent**.
Write these counts as $$T_1$$ for Alice and $$T_2$$ for Bob.
Alice also knows the state, but her count already identifies it: $$T_1=0$$ exactly in state $$a$$.
There is no additional information from timestamps, a public transcript, or a report identifying the failed message.
The model, protocol, payoffs, and failure probability are common knowledge.

The first few possible outcomes are:

| What happened | Alice's count $$T_1$$ | Bob's count $$T_2$$ |
| --- | --- | --- |
| State $$a$$, so no message was sent | 0 | 0 |
| Alice's initial message failed | 1 | 0 |
| Bob received it, but his confirmation failed | 1 | 1 |
| Alice received that confirmation, but her next message failed | 2 | 1 |
| Bob received that message, but his next confirmation failed | 2 | 2 |

In state $$b$$ the exchange ends after finitely many transmissions with probability one.
The probability that the first $$m$$ transmissions all succeed is

$$
(1-\varepsilon)^m\longrightarrow0
\qquad\text{as }m\longrightarrow\infty.
$$

The counts can nevertheless be arbitrarily large.

## Why a reliable channel leaves substantial uncertainty

Suppose Alice sees $$T_1=n\geq1$$.
There are exactly two possible endings:

- Her last message failed, so Bob sent only $$n-1$$ messages.
- Her last message arrived, but Bob's reply failed, so Bob sent $$n$$ messages.

To reach Alice's $$n$$th transmission, the preceding $$2n-2$$ transmissions must have succeeded.
The unconditional probabilities of the two outcomes are therefore

$$
\begin{aligned}
\Pr(T_1=n,T_2=n-1)
&=\frac13(1-\varepsilon)^{2n-2}\varepsilon,\\
\Pr(T_1=n,T_2=n)
&=\frac13(1-\varepsilon)^{2n-1}\varepsilon.
\end{aligned}
$$

Conditioning on Alice's count gives

$$
\begin{aligned}
\Pr(T_2=n-1\mid T_1=n)
&=\frac{1}{2-\varepsilon},\\
\Pr(T_2=n\mid T_1=n)
&=\frac{1-\varepsilon}{2-\varepsilon}.
\end{aligned}
$$

Her last message is more likely to have failed than to have arrived.
For example, with a one-percent transmission failure rate,

$$
\Pr(T_2=n-1\mid T_1=n)
=\frac1{1.99}\approx0.5025.
$$

There is no contradiction with messages being reliable.
Alice is conditioning on a completed exchange in which her last outgoing message has no received confirmation.
Either that message failed, or it arrived and the reply failed.
Both explanations contain one failure, and the second also requires one additional successful transmission.
Their relative likelihoods do not depend on how many earlier messages succeeded.

For Bob, the corresponding calculation is

$$
\begin{aligned}
\Pr(T_1=n\mid T_2=n)
&=\frac{1}{2-\varepsilon},\\
\Pr(T_1=n+1\mid T_2=n)
&=\frac{1-\varepsilon}{2-\varepsilon},
\qquad n\geq1.
\end{aligned}
$$

Bob is uncertain whether his last reply failed or Alice received it and her next message failed.
These are the conditional probabilities that drive the equilibrium proof.

## The equilibrium result

A strategy specifies what a player does at every possible private count, allowing randomization.
A **Bayesian Nash equilibrium** requires the action at each count to maximize expected payoff, given the conditional probabilities and the other player's strategy.
Every finite count has positive probability here.

**Claim.** Among Bayesian Nash equilibria in which Alice chooses $$A$$ when she observes state $$a$$, the only equilibrium has both players choose $$A$$ at every count.
This holds for every $$\varepsilon\in(0,1)$$, however small.

The qualification about Alice's behavior in state $$a$$ is part of Rubinstein's original proposition.
We will return to why it matters after the proof.

### First establish Bob's behavior with no messages

If $$T_2=0$$, either the state is $$a$$ or Alice's initial message in state $$b$$ failed.
Bayes' rule gives

$$
\Pr(a\mid T_2=0)=\frac{2}{2+\varepsilon},
\qquad
\Pr(b\mid T_2=0)=\frac{\varepsilon}{2+\varepsilon}.
$$

By the stated condition, Alice chooses $$A$$ in state $$a$$.
Bob's payoff from $$A$$ is therefore

$$
\frac{2}{2+\varepsilon}>0:
$$

he gets one in state $$a$$ and zero in state $$b$$, whatever Alice does there.
His payoff from $$B$$ is at most

$$
\frac{-4+\varepsilon}{2+\varepsilon}<0.
$$

The bound gives Bob the best possible payoff of one in state $$b$$, while accounting for the loss of two against Alice's $$A$$ in state $$a$$.
Thus Bob strictly prefers $$A$$ when $$T_2=0$$.

### Then work upward through the message counts

Suppose we have established that Bob chooses $$A$$ at count $$n-1$$.
Consider Alice at count $$n$$.
She knows that the state is $$b$$, but assigns probability $$1/(2-\varepsilon)$$ to Bob having count $$n-1$$ and therefore choosing $$A$$.

Even if Bob always chooses $$B$$ at his other possible count, $$n$$, Alice's payoff from $$B$$ is at most

$$
\frac{1}{2-\varepsilon}(-2)
+\frac{1-\varepsilon}{2-\varepsilon}(1)
=-\frac{1+\varepsilon}{2-\varepsilon}<0.
$$

Choosing $$A$$ gives zero, so Alice strictly chooses $$A$$ at count $$n$$.

Now consider Bob at count $$n$$.
He assigns probability $$1/(2-\varepsilon)$$ to Alice having count $$n$$, where we have just established that she chooses $$A$$.
Even if Alice always switches at her other possible count, $$n+1$$, the same bound applies:

$$
\text{Bob's expected payoff from }B
\leq-\frac{1+\varepsilon}{2-\varepsilon}<0.
$$

Bob therefore strictly chooses $$A$$ at count $$n$$.

Starting from Bob's count zero, this establishes Alice's count one, then Bob's count one, then Alice's count two, and so on.
Induction covers every finite count.
The strict inequalities also rule out mixing with positive probability on $$B$$ at any of these counts.

Finally, always choosing $$A$$ is indeed an equilibrium: against a partner who always stays, switching gives $$-2$$, while staying gives either zero or one.
This proves existence and uniqueness within the stated class.

The proof does not require Alice to think that Bob is probably ignorant of the state after hundreds of messages.
She knows that he knows it.
The difficulty is that his information leaves room for a lower-count partner, whose incentives depend on a still lower count.
The no-message behavior propagates through that entire chain.

### Why the qualification matters

Under these payoff tables, both players always choosing $$B$$ is also a Bayesian Nash equilibrium.
In state $$b$$, switching against a switching partner gives one.
In state $$a$$, Alice gets zero whether she switches or stays when Bob switches, so she has no profitable deviation.
Bob also prefers switching against Alice's always-switch strategy.

This equilibrium fails the proposition's condition that Alice choose $$A$$ in state $$a$$.
The condition selects the natural status-quo behavior in the state favoring it; it cannot simply be omitted from a claim about Nash equilibrium.

## Lots of knowledge without common knowledge

Each successful confirmation adds a level of knowledge.
Bob's receipt of the first message tells him that the state is $$b$$.
Alice's receipt of his reply tells her that Bob knows it.
Bob's receipt of her next message tells him that Alice knows that he knows it.
The hierarchy can become arbitrarily deep.

But it never becomes common knowledge at a finite count.
To see why, describe a possible world by the state and both counts.
The worlds are connected by the following chain:

$$
(a,0,0)
\;\overset{2}{\longleftrightarrow}\;(b,1,0)
\;\overset{1}{\longleftrightarrow}\;(b,1,1)
\;\overset{2}{\longleftrightarrow}\;(b,2,1)
\;\longleftrightarrow\;\cdots.
$$

An edge labeled $$1$$ joins worlds Alice cannot distinguish; an edge labeled $$2$$ does the same for Bob.
At any finite point, following these individual possibilities backward eventually reaches state $$a$$.
The assertion that the state is $$b$$ therefore fails somewhere in the common-knowledge component.
This is exactly the graph-based definition used in the [Aumann article](/fun-stuff/economics/aumann-agreement.html#what-common-knowledge-adds).

For any fixed number of successful transmissions $$m$$,

$$
\Pr(\text{at least }m\text{ successes}\mid b)
=(1-\varepsilon)^m\longrightarrow1
\qquad\text{as }\varepsilon\downarrow0.
$$

Thus increasingly reliable communication makes any fixed finite depth of mutual knowledge increasingly likely.
Yet the equilibrium established above still prescribes $$A$$ everywhere.
The probability that an unconfirmed last message failed approaches one-half, rather than zero.

The relevant comparison is with a benchmark in which the state is publicly revealed and efficient coordination is available.
We should not obtain that benchmark merely by substituting $$\varepsilon=0$$ into a protocol that stops only when a transmission fails: in state $$b$$, that literal protocol would never stop.

## A different protocol can support switching

The absence of common knowledge alone does not prove that coordination is impossible.
Payoffs and communication rules determine whether the remaining uncertainty is tolerable.
Rubinstein's paper makes this point by considering a known finite stopping rule.

The simplest version sends **one message and no acknowledgments**.
Everyone knows in advance that this is the entire communication stage.
Alice sends the message automatically in state $$b$$, and it fails with probability $$\varepsilon$$ as before.
Bob now observes whether he received it.

Consider the following strategies:

- Alice chooses $$A$$ in state $$a$$ and $$B$$ in state $$b$$.
- Bob chooses $$B$$ if the message arrives, and $$A$$ otherwise.

In state $$a$$, Alice faces Bob's $$A$$ and strictly prefers $$A$$.
In state $$b$$, her expected payoff from $$B$$ is

$$
(1-\varepsilon)(1)+\varepsilon(-2)=1-3\varepsilon.
$$

This exceeds the zero payoff from $$A$$ when $$\varepsilon<1/3$$.
If Bob receives the message, he knows both the state and Alice's prescribed action, so he strictly prefers $$B$$.
If he receives nothing, the earlier no-message calculation makes $$A$$ strictly optimal.

These strategies therefore form a Bayesian Nash equilibrium for $$\varepsilon<1/3$$.
Conditional on state $$b$$, successful coordination occurs with probability $$1-\varepsilon$$.
Alice accepts a small risk of switching alone.

There is still no common knowledge of state $$b$$ when the message arrives: Alice cannot distinguish receipt from loss, and a Bob who received nothing cannot distinguish loss from state $$a$$.
Nevertheless, the incentives support switching.

What changed is the meaning of an absent acknowledgment.
In the one-message protocol, no acknowledgment is expected, and Alice evaluates the ordinary delivery probability $$1-\varepsilon$$.
In the continuing-confirmation protocol, the final missing acknowledgment leaves two possible endings with probabilities close to one-half, sustaining the induction.

## How the common-knowledge articles fit together

The [forty cheating husbands puzzle](/fun-stuff/logics/forty-cheating-husbands.html) shows how a public announcement and successive public silences eliminate possible worlds.
Its delayed-letter variant shows how uncertainty about other people's receipt can prevent the deduction from starting.
The email game adds explicit payoffs: the players may act without certainty, but only when their beliefs make doing so worthwhile.

[Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html) restricts beliefs that are common knowledge under a common prior.
The email game gives a concrete communication process in which increasingly deep knowledge falls short of that condition.
There is no contradiction with Aumann when both players know state $$b$$ at the actual world: their certainty is not common knowledge throughout the component.

[Milgrom–Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html) combines common knowledge of a proposed trade's acceptability with an initially efficient allocation.
The email game has a different economic starting point.
In state $$b$$, moving from $$(A,A)$$ to $$(B,B)$$ would give both players a strict gain.
Those gains exist, but the continuing-confirmation protocol and the specified no-message behavior prevent that outcome in equilibrium.
The result is not an application of the no-trade theorem.

Across the articles, the useful question is what one person's information allows them to infer about another person's information and actions.
Rubinstein's example shows why a long sequence of private confirmations need not provide the confidence that a coordination decision requires.

The [commitment folk theorem](/fun-stuff/economics/kalai-commitment-folk-theorem.html) explores another way to change the strategic situation: players choose binding conditional rules before those rules act on their behalf.
Its Prisoner's Dilemma expansion and jointly controlled lottery show what becomes possible with suitable commitment devices in a complete-information game.
These devices change the available choices, so their cooperation result does not contradict the email game's equilibrium analysis.

## Further reading

Ariel Rubinstein, [“The Electronic Mail Game: Strategic Behavior Under ‘Almost Common Knowledge,’” *American Economic Review* 79(3), 385–391 (1989)](https://arielrubinstein.org/papers/32.pdf).
The numerical example above specializes the original model; Section II gives the conditional equilibrium result, and Remark 1 considers a commonly known finite limit on transmissions.
