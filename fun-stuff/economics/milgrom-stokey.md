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

The mistake is comparing the offer price $$p$$ with the unconditional mean dividend, $$1/2$$.
A price of $$0.4$$ looks attractive against $$1/2$$, yet conditional on the informed seller accepting, the expected dividend drops to $$0.2$$.
Because the seller accepts only when $$\theta\leq p$$, the buyer acquires the asset exclusively in the states where it is worth less than the price.

To generalize this adverse-selection insight beyond a single posted-price offer to arbitrary trading mechanisms, Milgrom and Stokey isolate two structural conditions: properties of the initial allocation and what traders know when they agree to trade.

## Two assumptions that do the work

The first is **efficiency before the new information arrives**.
An allocation is *ex ante Pareto efficient* if no feasible alternative can make everyone at least as well off in expected utility, and someone strictly better off, when evaluated before the private signals arrive.

This assumption removes pre-existing motives to trade.
A farmer who wants insurance and an investor who can bear crop risk may both benefit from a contract even without different information; that is a gain from risk sharing.
Milgrom–Stokey starts after all such gains from risk sharing and reallocation have been exhausted.

For a concrete efficient benchmark, imagine two people with the same strictly concave utility function $$u$$ sharing a risky total endowment $$2e$$ equally in every state.
For any feasible division $$x_1+x_2=2e$$, concavity gives

$$
u(x_1)+u(x_2)\leq2u(e)
$$

state by state, and therefore in expectation under a common prior.
No feasible reallocation can raise one person's ex ante expected utility without lowering the other's, so equal sharing is ex ante Pareto efficient.

The second assumption is **common knowledge of willingness to trade**.
At the moment the trade is agreed upon, everyone knows the trade is feasible and acceptable to all parties, everyone knows that everyone knows this, and so on—after incorporating everything learned from prices, offers, and acceptances.
Notice that traders do not need to reveal their private signals or converge to identical posterior beliefs; only their mutual willingness to carry out the trade needs to become common knowledge.

Below we prove the theorem under a **common prior** (every trader starts with the same prior probability distribution over states and updates by Bayes' rule); the original paper shows that the same argument goes through under a slightly broader condition called *concordant beliefs*.

## A precise no-trade statement

Consider finitely many states $$\omega\in\Omega$$, each assigned positive probability by the common prior.
There are finitely many traders, indexed by $$i$$, and one consumption good in each state.
Trader $$i$$ starts with an endowment $$e_i(\omega)$$ and has an increasing, concave utility function $$u_i$$.
Assume the initial allocation $$e$$ is ex ante Pareto efficient across all feasible state-contingent allocations.

Let $$x_i(\omega)$$ denote a proposed post-trade allocation, satisfying nonnegative consumption and market clearing in every state:

$$
\sum_i x_i(\omega)=\sum_i e_i(\omega)
\qquad\text{in every state}.
$$

Let $$\mathcal I_i$$ denote trader $$i$$'s information partition at the time of agreement, after absorbing any information conveyed by the trading process itself.

Finally, let $$C$$ be a nonempty event on which the trade's acceptability is common knowledge: $$C$$ is a union of information cells for every trader, and throughout $$C$$,

$$
\mathbb E\!\left[u_i(x_i)-u_i(e_i)\mid\mathcal I_i\right]\geq0
\qquad\text{for every }i.
$$

Because $$C$$ is a union of cells for every trader, each trader knows whether $$C$$ has occurred.

**Claim.** Throughout $$C$$, every trader is indifferent between $$x$$ and $$e$$ given their information: $$\mathbb E[u_i(x_i)-u_i(e_i)\mid\mathcal I_i]=0$$.
Moreover, if every $$u_i$$ is strictly concave, then $$x_i(\omega)=e_i(\omega)$$ for every trader $$i$$ and every state $$\omega\in C$$.

## The proof: an agreed improvement would already be an improvement before the news

Define an auxiliary state-contingent allocation $$y$$ that implements the trade $$x$$ when $$C$$ occurs and leaves the endowment $$e$$ untouched otherwise:

$$
y_i(\omega)=
\begin{cases}
x_i(\omega),&\omega\in C,\\
e_i(\omega),&\omega\notin C.
\end{cases}
$$

Because $$x$$ and $$e$$ both clear the market in every state, $$y$$ is feasible state by state.

Write $$\mathbf 1_C$$ for the indicator of $$C$$.
Trader $$i$$'s ex ante expected utility gain from moving to $$y$$ is

$$
\begin{aligned}
\mathbb E[u_i(y_i)-u_i(e_i)]
&=\mathbb E\!\left[\mathbf 1_C\bigl(u_i(x_i)-u_i(e_i)\bigr)\right]\\
&=\mathbb E\!\left[\mathbf 1_C\,
\mathbb E\!\left[u_i(x_i)-u_i(e_i)\mid\mathcal I_i\right]\right]\\
&\geq0.
\end{aligned}
$$

The middle step applies the law of iterated expectations: because $$C$$ is measurable with respect to each trader's information $$\mathcal I_i$$, the indicator $$\mathbf 1_C$$ factors inside the conditional expectation.
The final inequality uses acceptability on $$C$$.

Suppose some trader had a strictly positive conditional gain at some state in $$C$$.
Because every state has positive prior probability, that trader would enjoy a strictly positive ex ante expected gain from $$y$$, while every other trader would do at least as well—contradicting the ex ante Pareto efficiency of $$e$$.
Hence every trader's conditional expected gain must be zero throughout $$C$$.

Now suppose each $$u_i$$ is strictly concave and $$y$$ differs from $$e$$ for some trader at some state in $$C$$.
The fifty-fifty mixture $$(e+y)/2$$ is also feasible, and concavity gives

$$
\mathbb E\!\left[u_i\!\left(\frac{e_i+y_i}{2}\right)\right]
\geq\frac12\mathbb E[u_i(e_i)]+
\frac12\mathbb E[u_i(y_i)]
\geq\mathbb E[u_i(e_i)],
$$

with a strict first inequality for any trader whose consumption changes on a positive-probability state.
That again produces an ex ante Pareto improvement over $$e$$, a contradiction.
Therefore $$x_i(\omega)=e_i(\omega)$$ for every trader and every state in $$C$$.

## Why “both want to trade” is not enough

The proof pinpoints why mutual willingness to trade based on private signals alone is fragile.
If the event on which both parties want to trade is not common knowledge, the indicator $$\mathbf 1_C$$ cannot be pulled across every trader's conditional expectation simultaneously, and interim gains cannot be stitched into an ex ante improvement.
Once both parties condition on the fact that the counterparty is also willing to trade—as in our uniform posted-price example—the apparent gains vanish.

Notice also the role of strict concavity.
Under risk neutrality, if an asset's payoff $$\theta$$ were publicly known, two traders could swap it at price $$\theta$$ with zero expected gain for both.
Strict risk aversion rules out even these zero-surplus consumption swaps, because any state-contingent transfer introduces risk that a fifty-fifty blend would strictly improve upon.

## The connection to Aumann's agreement theorem

[Aumann's agreement theorem](/fun-stuff/economics/aumann-agreement.html) proves that two Bayesian agents with a common prior must assign the same probability to an event whenever their posterior probabilities are common knowledge.
Both proofs turn on the exact same step: conditioning on a common-knowledge component $$C$$ that is a union of cells for every agent.

Where Aumann averages posterior probabilities over $$C$$ to force agreement on beliefs, Milgrom and Stokey average conditional utility gains over $$C$$ to rule out speculative gains.
Importantly, Milgrom–Stokey requires less information to become public: traders never need to learn each other's exact posterior probabilities, only that everyone finds the proposed trade acceptable.

## The connection to Myerson–Satterthwaite

Both Milgrom–Stokey and [Myerson–Satterthwaite](/fun-stuff/economics/myerson-satterthwaite.html) study bilateral trade under private information, yet they start from opposite benchmarks:

| | Myerson–Satterthwaite | Milgrom–Stokey |
| --- | --- | --- |
| Starting point | The initial allocation leaves genuine gains from trade. | The initial allocation is already ex ante Pareto efficient. |
| Private information | The buyer's and seller's private valuations $$v$$ and $$c$$. | Signals about an uncertain state of the world $$\omega$$. |
| Central constraint | Truthful reporting and voluntary participation require information rents that exceed the efficient surplus. | Commonly known interim gains would imply an ex ante Pareto improvement. |
| Conclusion | No truthful, voluntary, budget-balanced mechanism achieves 100% of the efficient trades (though a posted price captures 75% in the uniform case). | No commonly acceptable speculative trade gives anyone a strict expected gain; under strict risk aversion, no consumption trade occurs at all. |

In the [uniform Myerson–Satterthwaite model](/fun-stuff/economics/myerson-satterthwaite.html), where $$v,c\sim U[0,1]$$ independently, posting a fixed price of $$1/2$$ gives the buyer an ex ante expected gain of

$$
\int_{1/2}^1\int_0^{1/2}\left(v-\frac12\right)dc\,dv
=\frac1{16},
$$

and the seller the same $$1/16$$ by symmetry.
Because both strictly prefer the posted-price market to never trading, the initial no-trade allocation is *not* ex ante Pareto efficient—which is why positive trade occurs there without violating Milgrom–Stokey.

## What drives real-world trading volume?

Because the no-trade theorem is deductive, it doubles as a diagnostic tool: whenever informed parties trade in equilibrium, at least one premise of the theorem has been relaxed.
Real markets generate volume through liquidity shocks and life-cycle consumption needs, unshared background risks (so the initial allocation is not ex ante Pareto efficient), or differences in prior beliefs.
What Milgrom and Stokey show is that once pre-existing gains from risk sharing and reallocation are exhausted, *private signals alone* cannot generate mutually beneficial trade among rational Bayesian agents.

For the original theorem, including concordant beliefs and the distinction between weak and strict risk aversion, see Section 2 (Theorem 1, pages 21–22) of [Milgrom and Stokey (1982)](https://web.stanford.edu/~milgrom/publishedarticles/Information%20Trade%20and%20Common%20Knowledge.pdf).
