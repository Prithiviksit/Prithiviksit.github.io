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

Her last message is slightly more likely to have failed in transit than to have arrived!
For example, with a one-percent transmission failure rate,

$$
\Pr(T_2=n-1\mid T_1=n)
=\frac1{1.99}\approx0.5025.
$$

Why does a ninety-nine-percent reliable channel leave Alice worse than fifty-fifty on whether her last message arrived?
Because she is conditioning on the fact that the back-and-forth stopped after her $$n$$th outgoing message.
Only two events can end the exchange there: either her $$n$$th message failed on the way to Bob, or it arrived and Bob's $$n$$th reply failed on the way back.
Both explanations involve exactly one failure, and the second requires one extra successful transmission ($$1-\varepsilon$$), making the first slightly more probable regardless of how large $$n$$ is.

For Bob, the symmetric calculation at count $$T_2=n\geq1$$ gives

$$
\begin{aligned}
\Pr(T_1=n\mid T_2=n)
&=\frac{1}{2-\varepsilon},\\
\Pr(T_1=n+1\mid T_2=n)
&=\frac{1-\varepsilon}{2-\varepsilon},
\qquad n\geq1.
\end{aligned}
$$

Whenever Bob has sent $$n$$ confirmations and hears nothing back, he assigns probability $$1/(2-\varepsilon)>1/2$$ to his last confirmation having failed.
These conditional probabilities drive the induction across all message counts.

## The equilibrium result

A strategy specifies what a player does at every possible private count, allowing randomization.
A **Bayesian Nash equilibrium** requires the action at each count to maximize expected payoff given the conditional probabilities and the other player's strategy.

**Claim.** Among Bayesian Nash equilibria in which Alice chooses $$A$$ when she observes state $$a$$, the unique equilibrium has both players choose $$A$$ at every count.
This holds for every $$\varepsilon\in(0,1)$$, however small.

### Step 1: Bob's behavior when he receives no message

If $$T_2=0$$, either the state is $$a$$ or Alice's initial message in state $$b$$ failed.
Bayes' rule gives

$$
\Pr(a\mid T_2=0)=\frac{2}{2+\varepsilon},
\qquad
\Pr(b\mid T_2=0)=\frac{\varepsilon}{2+\varepsilon}.
$$

Since Alice chooses $$A$$ in state $$a$$, playing $$A$$ gives Bob

$$
\frac{2}{2+\varepsilon}>0
$$

(one in state $$a$$ and zero in state $$b$$), whereas playing $$B$$ gives at most

$$
\frac{-4+\varepsilon}{2+\varepsilon}<0
$$

(losing two in state $$a$$ and gaining at most one in state $$b$$).
Thus Bob strictly prefers $$A$$ when $$T_2=0$$.

### Step 2: Induction upward through all message counts

Suppose Bob chooses $$A$$ at count $$n-1$$, and consider Alice at count $$n\geq1$$.
She knows the state is $$b$$, yet assigns probability $$1/(2-\varepsilon)$$ to Bob having count $$n-1$$ and therefore playing $$A$$.
Even if Bob were certain to play $$B$$ at his other possible count $$n$$, Alice's expected payoff from playing $$B$$ is at most

$$
\frac{1}{2-\varepsilon}(-2)
+\frac{1-\varepsilon}{2-\varepsilon}(1)
=-\frac{1+\varepsilon}{2-\varepsilon}<0.
$$

Playing $$A$$ guarantees zero, so Alice strictly prefers $$A$$ at count $$n$$.

Now consider Bob at count $$n$$.
He assigns probability $$1/(2-\varepsilon)$$ to Alice having count $$n$$, where she strictly plays $$A$$.
Even if Alice were certain to play $$B$$ at count $$n+1$$, the identical calculation gives

$$
\text{Bob's expected payoff from }B
\leq-\frac{1+\varepsilon}{2-\varepsilon}<0,
$$

so Bob strictly prefers $$A$$ at count $$n$$ as well.

By induction—from $$T_2=0$$ to $$T_1=1$$, then $$T_2=1$$, then $$T_1=2$$, and so on—both players strictly play $$A$$ at every finite count.
Finally, always playing $$A$$ is a Bayesian Nash equilibrium: against a partner who never switches, switching yields $$-2$$ while staying yields zero or one.

Notice what drives the unraveling after, say, a hundred messages.
Alice does not doubt that Bob knows the state is $$b$$—she knows he knows it to ninety-nine levels.
Rather, she worries that Bob sent only ninety-nine confirmations, worries that *he* worries she sent only ninety-nine, and so on all the way back to Bob at count zero.

### Why we specify Alice's action in state $$a$$

In Rubinstein's payoff table for state $$a$$, if Bob plays $$B$$, Alice gets $$0$$ whether she plays $$A$$ or $$B$$.
Because of that tie, “both players play $$B$$ at every count (even in state $$a$$)” is technically a degenerate Nash equilibrium of the game.
Stipulating that Alice plays the status-quo action $$A$$ when she sees state $$a$$ rules out that degenerate equilibrium and anchors the induction at $$T_1=0$$.

## Deep mutual knowledge without common knowledge

Each confirmation adds one more layer of mutual knowledge:

- $$T_2\geq1$$: Bob knows the state is $$b$$.
- $$T_1\geq2$$: Alice knows that Bob knows the state is $$b$$.
- $$T_2\geq2$$: Bob knows that Alice knows that Bob knows the state is $$b$$.

Yet at any finite count, the state is never common knowledge.
Writing each possible world as $$(s,T_1,T_2)$$, the indistinguishability graph forms a single infinite chain:

$$
(a,0,0)
\;\overset{2}{\longleftrightarrow}\;(b,1,0)
\;\overset{1}{\longleftrightarrow}\;(b,1,1)
\;\overset{2}{\longleftrightarrow}\;(b,2,1)
\;\longleftrightarrow\;\cdots.
$$

Here an edge labeled $$1$$ connects two worlds Alice cannot distinguish, and an edge labeled $$2$$ connects two worlds Bob cannot distinguish.
From any finite world $$(b,n,n)$$, walking $$2n$$ steps backward along this chain reaches $$(a,0,0)$$.
Thus the common-knowledge component (in the sense of the [Aumann agreement article](/fun-stuff/economics/aumann-agreement.html#what-common-knowledge-adds)) always contains $$(a,0,0)$$.

As the channel becomes arbitrarily reliable ($$\varepsilon\downarrow0$$), any fixed depth $$m$$ of mutual knowledge becomes almost certain in state $$b$$:

$$
\Pr(\text{at least }m\text{ successes}\mid b)
=(1-\varepsilon)^m\longrightarrow1
\qquad\text{as }\varepsilon\downarrow0.
$$

Even so, because the protocol keeps running until a message is lost, whichever player sent the last successful message always faces a missing reply whose conditional probability of having been lost on the way out is $$1/(2-\varepsilon)>1/2$$.

## Stopping after one message restores coordination

Paradoxically, the firms can coordinate in state $$b$$ if they **turn off the automatic confirmations** and send only a single message.
Suppose it is common knowledge that Alice's computer sends one message in state $$b$$ (which fails with probability $$\varepsilon$$) and Bob's computer never replies.

Consider the strategy pair:

- Alice plays $$A$$ in state $$a$$ and $$B$$ in state $$b$$.
- Bob plays $$B$$ if he receives the message, and $$A$$ if he receives nothing.

In state $$a$$, neither sends nor receives a message, and both play $$A$$.
In state $$b$$, Alice's expected payoff from playing $$B$$ is

$$
(1-\varepsilon)(1)+\varepsilon(-2)=1-3\varepsilon,
$$

which beats playing $$A$$ (payoff $$0$$) whenever $$\varepsilon<1/3$$.
When Bob receives the message, he knows the state is $$b$$ and knows Alice is playing $$B$$, so $$B$$ gives him $$1$$ against $$0$$.
When Bob receives nothing, our earlier calculation at $$T_2=0$$ shows that $$A$$ is strictly optimal.

Why does one unconfirmed message succeed where a hundred confirmations fail?
Because changing the protocol changes the meaning of silence.
Under the one-message rule, Alice expects no reply, so she assesses the chance that Bob got her message at the raw channel reliability $$1-\varepsilon$$.
Under the unbounded-confirmation rule, silence always means a transmission failed on the very last round, resetting the sender's confidence to $$(1-\varepsilon)/(2-\varepsilon)<1/2$$.

## How the common-knowledge articles fit together

Each article in this group isolates a different facet of higher-order knowledge:

- **[Forty cheating husbands](/fun-stuff/logics/forty-cheating-husbands.html):** Public announcements and public silences trim the common-knowledge component step by step; replacing the public announcement with asynchronous private letters freezes action for the same graph-theoretic reason as the email game.
- **[Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html):** When posterior beliefs are constant across a common-knowledge component, a common prior forces them to agree.
- **[Milgrom–Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html):** Starting from an ex ante Pareto-efficient allocation, common knowledge of willingness to trade rules out speculative gains.
- **[Kalai's commitment folk theorem](/fun-stuff/economics/kalai-commitment-folk-theorem.html):** Instead of exchanging messages over a noisy channel, players commit to binding conditional rules before play, supporting every feasible and individually rational payoff in one shot.

## Further reading

Ariel Rubinstein, [“The Electronic Mail Game: Strategic Behavior Under ‘Almost Common Knowledge,’” *American Economic Review* 79(3), 385–391 (1989)](https://arielrubinstein.org/papers/32.pdf).
Section II proves the unique-equilibrium theorem for the unbounded protocol, and Remark 1 analyzes capping the exchange at a commonly known finite number of messages.
