---
layout: fun-article
title: "When Information Cannot Create Trade: The Milgrom–Stokey Theorem"
description: "An approachable account of the Milgrom–Stokey no-trade theorem, with a uniform example, a rigorous common-knowledge proof, and a comparison with Myerson–Satterthwaite."
group: Economics
subtitle: "Why a willing counterparty is information, and why speculation needs more than different private signals."
lead: "You have good news about an asset and want to buy. Someone else is willing to sell. Before celebrating, ask what their willingness to sell tells you."
permalink: /fun-stuff/economics/milgrom-stokey.html
date: 2026-11-05T19:03:52-07:00
published: true
---

Suppose you receive a private report suggesting that a company's prospects are better than the market thinks.
Buying its shares seems like an obvious opportunity.
But the person selling to you may have a private report too.
If they are informed and rational, their willingness to take the other side should affect your assessment of the trade.

This observation creates a puzzle.
Different information seems to explain why people want to trade: one person is optimistic, another pessimistic.
Yet when both sides account for what trading decisions reveal, that apparent opportunity can disappear.

Paul Milgrom and Nancy Stokey's 1982 paper, [*Information, Trade and Common Knowledge*](https://doi.org/10.1016/0022-0531(82)90046-1), makes this argument precise.
Starting from an allocation that is already efficient before new information arrives, their no-trade result rules out mutually acceptable speculative gains under appropriate belief and knowledge assumptions.
With strict risk aversion, it rules out nonzero net trades in consumption altogether.

The result is related to the [Myerson–Satterthwaite impossibility theorem](/fun-stuff/economics/myerson-satterthwaite.html), but the starting point matters.
Myerson–Satterthwaite asks why we cannot realize all the gains that genuinely different valuations create.
Milgrom–Stokey asks whether private information alone can create a reason to trade after the gains from reallocating resources and sharing risk have already been exhausted.

The underlying logic of common knowledge appears especially clearly in [Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html).
That companion article starts with probabilities and explains why merely knowing each other's views is weaker than making those views common knowledge.

The [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) explores a different consequence of higher-order uncertainty.
There, both players would gain from coordinating, but a particular exchange of unreliable confirmations can prevent them from doing so in equilibrium.
Unlike the no-trade theorem, its conclusion does not start from an efficient allocation.

## A uniform example: the seller's acceptance is news

An asset will pay a dividend $$\theta$$, where

$$
\theta\sim U[0,1].
$$

There is one seller who owns the asset and one potential buyer.
Both are risk neutral and care about the same dividend.
They share the uniform prior, but the seller learns $$\theta$$ before trading and the buyer does not.
There are no liquidity needs, transaction costs, or other reasons to transfer the asset.

Suppose the buyer offers a price $$p\in[0,1]$$.
The seller accepts exactly when $$\theta\leq p$$, apart from an irrelevant tie.
From the buyer's perspective, acceptance therefore changes the distribution of the dividend:

$$
\theta\mid\{\text{seller accepts}\}\sim U[0,p].
$$

For $$p>0$$, the expected dividend conditional on buying is

$$
\mathbb E[\theta\mid\theta\leq p]
=\frac1p\int_0^p\theta\,d\theta
=\frac p2.
$$

So the buyer's expected gain conditional on trade is $$p/2-p=-p/2$$.
Equivalently, the expected gain before knowing whether the seller accepts is

$$
\int_0^p(\theta-p)\,d\theta=-\frac{p^2}{2}<0.
$$

Every positive offer loses money on average.
At $$p=0$$, trade has probability zero.
Randomizing over such offers cannot help, because it only averages nonpositive expected payoffs.

The mistake would be to compare the price with the unconditional mean dividend, $$1/2$$.
A price of $$0.4$$ looks attractive against that mean.
But when the informed seller accepts, the conditional mean is only $$0.2$$.
The buyer purchases precisely in the states where the asset is least valuable.

This calculation proves a no-trade result for this particular posted-price game.
It illustrates the inference behind the broader theorem; it does not by itself cover every bargaining institution.
For that, we need to state what the theorem assumes about the initial allocation and what traders know when they agree.

## Two assumptions that do the work

The first is **efficiency before the new information arrives**.
An allocation is *ex ante Pareto efficient* if no feasible alternative can make everyone at least as well off in expected utility, and someone strictly better off, when evaluated before the private signals arrive.

This assumption removes pre-existing motives to trade.
A farmer who wants insurance and an investor who can bear crop risk may both benefit from a contract even without different information.
That is a gain from risk sharing.
Milgrom–Stokey starts after such gains have been exhausted.

For a concrete efficient allocation, imagine two people with the same strictly concave utility function sharing a risky total endowment equally in every state.
For any alternative division $$x_1+x_2=2e$$, concavity gives

$$
u(x_1)+u(x_2)\leq2u(e).
$$

This inequality holds in each state, hence also in expectation under a common prior.
No alternative division can raise one person's expected utility without lowering the other's.
Equal sharing is therefore ex ante efficient, even though the total endowment may be uncertain.

The second assumption concerns **common knowledge of willingness to trade**.
Everyone knows the proposed trade is feasible and acceptable to everyone; everyone knows that everyone knows this; and so on.
The relevant information includes what people infer from offers, acceptances, prices, and other observed trading behavior.

This is stronger than two people separately finding a trade attractive before hearing from each other.
Their willingness must survive the information conveyed by the trading process itself.
It does not require them to reveal their signals or end up with identical posterior beliefs.

We will prove a version with a **common prior**: everyone begins with the same probability distribution over states and updates using their own information.
Different signals can still produce different posterior beliefs.
The common prior is a sufficient belief restriction for the version below; the original paper also allows a more general restriction called *concordant beliefs*.

## A precise no-trade statement

Consider finitely many states $$\omega\in\Omega$$, each assigned positive probability by the common prior.
There are finitely many traders, indexed by $$i$$, and one consumption good in each state.
Trader $$i$$ initially receives $$e_i(\omega)$$ and has an increasing, concave utility function $$u_i$$.
The initial allocation is ex ante Pareto efficient among all feasible state-contingent allocations.
This is a strong efficiency benchmark, not merely efficiency within a restricted set of securities.

Let $$x_i(\omega)$$ describe a proposed allocation after trading.
Feasibility means nonnegative consumption and

$$
\sum_i x_i(\omega)=\sum_i e_i(\omega)
\qquad\text{in every state}.
$$

No outside resources are added.
Let $$\mathcal I_i$$ denote trader $$i$$'s information at the time of agreement, including inferences from observed trading behavior.
In a finite state space, an information set tells the trader which collection of states remains possible.

Finally, let $$C$$ be a nonempty event on which the trade's acceptability is common knowledge.
Formally, $$C$$ is a union of information sets for every trader, and throughout $$C$$,

$$
\mathbb E\!\left[u_i(x_i)-u_i(e_i)\mid\mathcal I_i\right]\geq0
\qquad\text{for every }i.
$$

The union-of-information-sets condition means that each trader can tell whether $$C$$ has occurred, and that this fact survives every level of reasoning about what others know.
At a state where acceptability is common knowledge, one can take $$C$$ to be the corresponding common-knowledge component.

**Claim.** On $$C$$, every trader must be indifferent between the proposed allocation and the initial allocation, given their information.
If all utilities are strictly concave, then $$x_i(\omega)=e_i(\omega)$$ for every trader and every state in $$C$$.

The first conclusion rules out a mutually acceptable trade with a strict expected gain for someone.
The second rules out changes in consumption even when everyone would otherwise be indifferent.
It does not rule out swapping two financial portfolios that deliver exactly the same consumption in every state.

## The proof: an agreed improvement would already be an improvement before the news

Construct an alternative allocation $$y$$ that carries out the proposed trade on $$C$$ and keeps the initial allocation everywhere else:

$$
y_i(\omega)=
\begin{cases}
x_i(\omega),&\omega\in C,\\
e_i(\omega),&\omega\notin C.
\end{cases}
$$

This allocation is feasible state by state.
We use it as a welfare comparison; it need not itself be a contract available in the trading institution.

Write $$\mathbf 1_C$$ for the indicator that $$C$$ occurs.
The ex ante expected utility gain from $$y$$ is

$$
\begin{aligned}
\mathbb E[u_i(y_i)-u_i(e_i)]
&=\mathbb E\!\left[\mathbf 1_C\bigl(u_i(x_i)-u_i(e_i)\bigr)\right]\\
&=\mathbb E\!\left[\mathbf 1_C\,
\mathbb E\!\left[u_i(x_i)-u_i(e_i)\mid\mathcal I_i\right]\right]\\
&\geq0.
\end{aligned}
$$

The middle equality is the law of iterated expectations.
Crucially, $$C$$ is known given each trader's information, so its indicator can be taken outside that trader's conditional expectation.
The last inequality is voluntary participation on $$C$$.

If any trader's conditional gain were strictly positive at a state in $$C$$, that trader's ex ante gain from $$y$$ would also be strictly positive: every state has positive prior probability.
Everyone else would weakly gain.
That would contradict the ex ante Pareto efficiency of the initial allocation.

Therefore every conditional gain must equal zero throughout $$C$$.
This proves the first conclusion.

To obtain the stronger conclusion, suppose all utilities are strictly concave and $$y$$ differs from $$e$$ for some trader in some state.
Consider the feasible allocation halfway between them, $$(e+y)/2$$.
Concavity gives

$$
\mathbb E\!\left[u_i\!\left(\frac{e_i+y_i}{2}\right)\right]
\geq\frac12\mathbb E[u_i(e_i)]+
\frac12\mathbb E[u_i(y_i)]
\geq\mathbb E[u_i(e_i)].
$$

Strict concavity makes the first inequality strict for a trader whose consumption changes in a positive-probability state.
Again, everyone weakly gains and someone strictly gains, contradicting initial efficiency.
Hence $$y=e$$, which means $$x=e$$ throughout $$C$$.
This proves the no-trade conclusion.

The argument is short because initial efficiency is doing substantial work.
If a new allocation were knowingly acceptable after the news, we could apply it only on that commonly known event and construct an improvement evaluated before the news.
Initial efficiency rules that out.

## Why “both want to trade” is not enough

Suppose two people independently calculate that they would benefit from a bet using only their private signals.
It does not follow that they will still want it after learning that the other person agrees.
The uniform example showed the simplest version of this problem: the seller's acceptance changed the buyer's conditional expectation.

The proof identifies the exact mathematical role of common knowledge.
If the event on which trade looks mutually attractive is not known to each person, its indicator cannot simply be pulled out of both conditional expectations.
The proposed conversion of interim gains into an ex ante Pareto improvement then fails.

So the theorem does not assume everyone has the same information.
It requires that willingness to trade withstand the information revealed by the agreement process.
Nor does the theorem require prices to reveal every private signal.
Traders can retain different private information without being able to sustain a mutually acceptable speculative gain.

Risk neutrality also requires care.
If an asset's dividend is publicly known to be $$\theta$$, two risk-neutral traders can exchange it for exactly $$\theta$$ and both be indifferent.
There can be positive trading volume without a strict gain.
The strict-risk-aversion part of the theorem closes the corresponding indifference loophole for net consumption trades.

## The connection to Aumann's agreement theorem

[Aumann's theorem](/fun-stuff/economics/aumann-agreement.html) says that two Bayesian agents with a common prior must assign the same probability to an event if their current posterior probabilities are common knowledge.
Its proof uses the same conditional-expectation step as the no-trade proof above.
On a commonly known event $$C$$, averaging either person's posterior gives the common prior conditioned on $$C$$.
Two different posterior numbers cannot both be constant on that event.

This helps explain why two informed traders cannot sustain a publicly understood speculative opportunity merely by pointing to different beliefs.
For a risk-neutral bet on the same event, commonly known posterior probabilities must agree, leaving no price that gives both a strict expected gain.

Milgrom–Stokey asks less of the information revealed by an agreement: the exact posterior probabilities need not be common knowledge.
Common knowledge that the trade is acceptable is enough, given the initial-efficiency assumptions.
The proof averages conditional utility gains over $$C$$ and shows that any strict improvement would already improve on the initial allocation ex ante.

Thus the two results share a proof idea while drawing different conclusions.
Aumann rules out commonly known differences in posterior probabilities.
Milgrom–Stokey combines common knowledge of willingness to trade with initial efficiency to rule out speculative gains; it does not conclude that all private beliefs must become identical.

## The connection to Myerson–Satterthwaite

Both results make the counterparty's private information part of the problem.
You cannot evaluate a trade while treating the other person's participation as unrelated to what they know.
Both also use the right to refuse a trade.
But they identify different limits.

| | Myerson–Satterthwaite | Milgrom–Stokey, in the version above |
| --- | --- | --- |
| Starting point | The initial allocation leaves genuine gains from trade. | The initial allocation is ex ante Pareto efficient. |
| Private information | The buyer's and seller's different valuations. | Signals about an uncertain economic state. |
| Central constraint | Truthful reporting and participation require information rents that efficient trade cannot finance. | Commonly known interim gains would imply an ex ante Pareto improvement. |
| Conclusion | No truthful, voluntary, self-financing mechanism realizes every efficient trade. | No commonly acceptable speculative trade makes anyone strictly better off; strict concavity rules out changes in consumption. |

There is a particularly concrete way to see why the two theorems do not conflict.
In the [uniform Myerson–Satterthwaite example](/fun-stuff/economics/myerson-satterthwaite.html), values $$v$$ and $$c$$ are independent and uniform on $$[0,1]$$.
A fixed price of $$1/2$$ gives the buyer an expected gain of

$$
\int_{1/2}^1\int_0^{1/2}\left(v-\frac12\right)dc\,dv
=\frac1{16}.
$$

The seller receives the same expected gain by symmetry.
Thus both prefer this trading opportunity to the original no-trade allocation, even before learning their own values.
That original allocation is not ex ante Pareto efficient, so it fails a central premise of Milgrom–Stokey.

The difference is deeper than “bicycles versus stocks.”
An asset can generate genuine gains from risk sharing or liquidity provision, and private information can interfere with realizing them.
Conversely, a purely speculative bet can have no remaining gains to exploit before the arrival of signals.
The economic starting point determines which theorem speaks to the problem.

## What this leaves open

Actual trading can reflect new consumption needs, changes in exposures, incomplete risk sharing, different preferences, or belief differences that do not come from a common prior.
These possibilities change the premises rather than contradict the theorem.
In particular, someone selling to meet a liquidity need is conveying different information from someone whose only reason to sell is a pessimistic signal.

Milgrom–Stokey therefore gives a useful question to ask about a model of speculative trade: once existing gains from reallocating resources are exhausted, what allows both sides to remain willing to trade after interpreting each other's actions?
Different private signals alone are not enough under the assumptions we have proved.

The companion [Myerson–Satterthwaite article](/fun-stuff/economics/myerson-satterthwaite.html) starts one step earlier, when genuine gains remain, and asks how much a trading rule can achieve despite private information.
Together, the two results separate the existence of gains from trade from our ability to realize them.

The finite-state argument above presents a common-prior version of the no-trade logic.
For the original theorem, including concordant beliefs and its distinction between weak and strict risk aversion, see Section 2, especially Theorem 1 on pages 21–22 of [Milgrom and Stokey (1982)](https://web.stanford.edu/~milgrom/publishedarticles/Information%20Trade%20and%20Common%20Knowledge.pdf).
