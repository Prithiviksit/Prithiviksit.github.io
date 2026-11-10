---
layout: fun-article
title: "Why Good Trades Fail: The Myerson–Satterthwaite Theorem"
description: "An approachable proof of the Myerson–Satterthwaite impossibility theorem with independent uniform valuations, plus fixed-price trade and the exact subsidy needed for efficiency."
group: Economics
subtitle: "One buyer, one seller, and a conflict between honest reporting, voluntary participation, and paying the bills."
lead: "A buyer values something more than its owner does. There is money to be made by trading. Why can no bargaining rule reliably make every such trade happen?"
permalink: /fun-stuff/economics/myerson-satterthwaite.html
date: 2026-11-05T19:03:52-07:00
published: true
---

Suppose you want to buy a used bicycle.
Its owner would be willing to part with it for 40 dollars, and you would be willing to pay 70.
A price of 55 makes you both better off.
The potential gain from trade is 30 dollars; the price determines how you divide it.

If those values were public, arranging the trade would be easy.
But the owner does not know your maximum price, and you do not know the owner's minimum.
You have a reason to sound less enthusiastic than you are.
The owner has a reason to insist that the bicycle is particularly hard to give up.

Perhaps a clever bargaining rule could solve this problem.
Ask both sides for their values, set a fair price, and trade whenever the buyer values the bicycle more.
Or run an auction, introduce a mediator, or allow several rounds of offers.

The **Myerson–Satterthwaite theorem** identifies a limit to all these approaches.
With independent private values drawn from overlapping intervals, under the regularity conditions stated below, no rule can simultaneously induce honest reporting, make participation worthwhile for every type, finance itself, and realize every gain from trade.
The result comes from Roger Myerson and Mark Satterthwaite's 1983 paper, [*Efficient Mechanisms for Bilateral Trading*](https://doi.org/10.1016/0022-0531(83)90048-0).

We can see the entire conflict in an example with two uniform distributions.
The proof uses the envelope theorem to calculate what honest reporting requires us to leave each trader, then compares those payoffs with the surplus available.

For a related result with a different starting point, see the companion article on [Milgrom–Stokey's no-trade theorem](/fun-stuff/economics/milgrom-stokey.html).

## A market inside a unit square

There is one indivisible object, one seller, and one buyer.
Write the buyer's value as $$v$$ and the seller's value as $$c$$.
Think of $$c$$ as the opportunity cost of giving up the object.
Assume

$$
v\sim U[0,1],\qquad c\sim U[0,1],
$$

independently.
Each person knows their own value, but knows only the distribution of the other person's value.
Both distributions are common knowledge.
The numbers can represent hundreds of dollars, so $$v=0.7$$ means a willingness to pay 70 dollars.

People are risk neutral, and money enters utility dollar for dollar.
If trade occurs at price $$p$$, the buyer gains $$v-p$$ and the seller gains $$p-c$$, relative to keeping their money and the object where they were.
Their combined gain is

$$
(v-p)+(p-c)=v-c.
$$

Thus **efficient trade** means transferring the object whenever $$v>c$$ and leaving it with the seller whenever $$v<c$$.
Either decision is efficient when the values are equal.
There are no transaction costs or external effects in this example.

Because the joint density is one on the unit square, the expected gain under efficient trade is

$$
\mathbb E[\text{efficient gains from trade}]
=\int_0^1\int_0^v(v-c)\,dc\,dv
=\int_0^1\frac{v^2}{2}\,dv
=\frac16.
$$

This is the total expected surplus available to divide between the two people if no money comes from outside.

## Four requirements that sound reasonable

A **mechanism** is a rule that takes the two reported values and determines whether trade occurs and what each person pays or receives.
We will allow random trade and transfers even when no trade occurs.
We also allow the amount collected from the buyer to differ from the amount paid to the seller.
These freedoms make the impossibility stronger.

Let $$q(v,c)\in[0,1]$$ be the probability of trade, $$t_B(v,c)$$ the payment collected from the buyer, and $$t_S(v,c)$$ the payment made to the seller.
For a randomized mechanism, these transfers denote expected payments over its internal randomization.
Assume the functions are measurable and all expected transfers are finite.

Our four requirements are:

1. **Efficiency.** Trade occurs with probability one when $$v>c$$ and zero when $$v<c$$.
2. **Honest reporting is a best response.** For every value, telling the truth maximizes expected utility when the other person tells the truth. The expectation is over the other person's unknown value. This is *Bayesian incentive compatibility*; it allows ties between truth and other reports.
3. **Participation is voluntary after learning one's own value.** Every buyer type and every seller type expects to do at least as well by participating as by walking away. This is *interim individual rationality*.
4. **No expected outside subsidy.** Expected receipts cover expected payments:

$$
\mathbb E[t_B(v,c)-t_S(v,c)]\geq0.
$$

The last requirement is deliberately weak.
We allow deficits in some realizations if surpluses elsewhere cover them on average.
Requiring the buyer's payment to equal the seller's receipt in every realization would be stricter.

The participation requirement is also modest.
Someone can sometimes regret participating after seeing the other person's value; we ask only that participation be worthwhile given their own information when they enter.
Requiring both people to benefit in every realization would again be stricter.

**Claim.** In the independent-uniform example, no mechanism satisfies all four requirements.

Why consider rules that ask for values directly?
The *revelation principle* supplies the connection to more elaborate bargaining games.
Take an equilibrium of any such game and let a mediator ask for values, then simulate the equilibrium strategies associated with those reports.
If lying to the mediator were profitable, playing the strategy of that other type would have been a profitable deviation in the original game.
Consequently, any equilibrium achieving the four requirements would yield a truthful direct mechanism achieving them too.
The direct-mechanism impossibility therefore rules out that equilibrium as well.

## Why splitting the difference does not solve the problem

A natural proposal is to trade whenever the reported buyer value exceeds the reported seller value, at the midpoint of their reports.
If everyone tells the truth, this is efficient and both sides benefit.
The difficulty is getting them to tell the truth.

Suppose the seller reports honestly, while a buyer with true value $$v$$ reports $$r$$.
Trade occurs for seller values $$c\leq r$$, at price $$(r+c)/2$$.
The buyer's expected payoff is

$$
\int_0^r\left(v-\frac{r+c}{2}\right)dc
=vr-\frac{3r^2}{4}.
$$

This strictly concave expression is maximized at $$r=2v/3$$, which lies in the permitted report interval.
For every $$v>0$$, reporting this smaller number yields $$v^2/3$$, whereas reporting truthfully yields only $$v^2/4$$.
The buyer accepts a lower chance of getting the object in exchange for a better price when trade occurs.

So this particular proposal fails.
To establish an impossibility theorem, we must show why *every* proposal fails.

## What honest reporting costs on the buyer's side

Let the buyer's expected payoff from reporting truthfully be

$$
U_B(v)=\int_0^1\bigl[vq(v,c)-t_B(v,c)\bigr]dc.
$$

This is an expected gain relative to not participating, conditional on the buyer knowing $$v$$.
Incentive compatibility says that reporting truthfully solves the buyer's choice of report:

$$
U_B(v)=\max_{r\in[0,1]}
\int_0^1\bigl[vq(r,c)-t_B(r,c)\bigr]dc,
\qquad r=v\text{ is optimal}.
$$

For the calculation, assume the interim expected payoff from a report is smooth enough to apply the usual **envelope theorem**.
The short technical note below explains why the resulting formulas do not depend on an extra smoothness restriction in this example.

The envelope theorem says to differentiate the objective with respect to the true value, holding the optimal report fixed.
An extra dollar of value matters only when the buyer receives the object.
Thus the marginal payoff is exactly the probability of trade:

$$
U_B'(v)=\int_0^1q(v,c)\,dc=v.
$$

The last equality uses efficiency: a buyer with value $$v$$ buys whenever $$c<v$$, an event with probability $$v$$.
Integrating from zero to $$v$$ gives

$$
\boxed{U_B(v)=U_B(0)+\int_0^v x\,dx
=U_B(0)+\frac{v^2}{2}.}
$$

Voluntary participation requires $$U_B(0)\geq0$$.
Averaging over buyer types yields

$$
\mathbb E[U_B(v)]
=U_B(0)+\int_0^1\frac{v^2}{2}\,dv
\geq\frac16.
$$

The buyer alone must receive at least the entire expected efficient surplus.
These payoffs are **information rents**: gains the mechanism must leave to different types so that they prefer their own outcomes to those assigned to other types.
They arise from incentive constraints, even if nobody has any special bargaining power.

## The seller needs information rents too

Define the seller's expected payoff relative to keeping the object as

$$
U_S(c)=\int_0^1\bigl[t_S(v,c)-cq(v,c)\bigr]dv.
$$

Incentive compatibility again makes the truthful report optimal:

$$
U_S(c)=\max_{r\in[0,1]}
\int_0^1\bigl[t_S(v,r)-cq(v,r)\bigr]dv,
\qquad r=c\text{ is optimal}.
$$

Apply the envelope theorem with respect to the seller's true opportunity cost.
An extra dollar of cost reduces the payoff by a dollar whenever the seller gives up the object.
Under efficient trade, that happens with probability $$1-c$$, so

$$
U_S'(c)=-\int_0^1q(v,c)\,dv=-(1-c).
$$

Integrating from $$c$$ to one gives

$$
\boxed{U_S(c)=U_S(1)+\int_c^1(1-x)\,dx
=U_S(1)+\frac{(1-c)^2}{2}.}
$$

Voluntary participation requires $$U_S(1)\geq0$$.
Consequently,

$$
\mathbb E[U_S(c)]
=U_S(1)+\int_0^1\frac{(1-c)^2}{2}\,dc
\geq\frac16.
$$

The seller must also receive at least the entire expected efficient surplus.

<details markdown="1">
<summary>Technical note: why differentiability is harmless here</summary>

Neither the trade threshold nor the transfer functions need to be differentiable point by point.
Under the efficient allocation, comparing the truthful report with a report $$h>0$$ higher, and then reversing the comparison, gives

$$
vh\leq U_B(v+h)-U_B(v)\leq(v+h)h
$$

and

$$
-(1-c)h\leq U_S(c+h)-U_S(c)\leq-(1-c-h)h,
$$

whenever both types lie in $$[0,1]$$.
For the buyer, these bounds use the trade probabilities $$v$$ and $$v+h$$; for the seller, they use $$1-c$$ and $$1-c-h$$.
Divide by $$h$$ and let it approach zero.
The corresponding comparisons with a lower type give the same left derivatives.
Thus incentive compatibility itself implies $$U_B'(v)=v$$ and $$U_S'(c)=-(1-c)$$ in the interior.
The same bounds ensure continuity at the endpoints, so integration gives exactly the two formulas above.
This is the incentive-compatibility envelope argument written out directly.

</details>

## The contradiction

Add the buyer's and seller's payoffs in any realization:

$$
\underbrace{vq-t_B}_{\text{buyer gain}}
+\underbrace{t_S-cq}_{\text{seller gain}}
=(v-c)q-(t_B-t_S).
$$

Their combined gains equal the surplus created by trade minus any money retained by the mechanism.
Taking expectations, efficiency and the absence of an expected subsidy imply

$$
\mathbb E[U_B(v)]+\mathbb E[U_S(c)]
=\frac16-\mathbb E[t_B-t_S]
\leq\frac16.
$$

But truthful reporting and voluntary participation require

$$
\mathbb E[U_B(v)]+\mathbb E[U_S(c)]
\geq\frac16+\frac16=\frac13.
$$

There is only $$1/6$$ to divide, while the incentive and participation constraints require at least $$1/3$$.
This contradiction proves the claim.

The conflict comes from having to make a single pricing rule work across *all* possible types.
For any specific pair of values with $$v>c$$, a price between $$c$$ and $$v$$ would satisfy both traders.
Once the price depends on their private reports, however, each trader has an incentive to shade their report toward the middle.
Countering that shading requires leaving both the buyer and the seller expected information rents that sum to $$1/3$$—twice the $$1/6$$ of total expected surplus that efficient trade generates.

Compare this with the [commitment folk theorem](/fun-stuff/economics/kalai-commitment-folk-theorem.html), where players know each other's payoffs and can use binding conditional devices to achieve every feasible, individually rational outcome.
Here the barrier is asymmetric information: neither party knows the other's valuation, and eliciting those valuations truthfully consumes more surplus than the trade creates.

## A simple compromise: post a price

Instead of asking the traders to report their values, fix a take-it-or-leave-it price $$p\in[0,1]$$ in advance and trade if and only if both accept.
The buyer accepts when $$v\geq p$$ and the seller accepts when $$c\leq p$$.

Posting a fixed price satisfies incentive compatibility, voluntary participation, and budget balance effortlessly: the buyer pays exactly what the seller receives, neither trader can influence the price by misreporting, and every completed trade leaves both at least as well off.
The sacrifice is efficiency.
Trade occurs only when

$$
c\leq p\leq v,
$$

which is stricter than $$c<v$$: for instance, at $$p=1/2$$, a seller with cost $$0.2$$ and a buyer with value $$0.4$$ miss out on a mutually beneficial trade worth $$0.2$$.

<figure class="math-figure">
  <picture>
    <source media="(max-width: 600px)" srcset="/img/others/myerson-satterthwaite-trade-mobile.svg">
    <img src="/img/others/myerson-satterthwaite-trade.svg" alt="Two unit squares with seller value on the horizontal axis and buyer value on the vertical axis. Efficient trade fills the triangle above the diagonal. A fixed price of one half captures only the upper-left quarter of the square; two other triangles contain missed beneficial trades.">
  </picture>
  <figcaption>Every point represents one possible pair of values. Efficiency requires the whole region above the diagonal. A fixed price of one half permits only the upper-left square. Areas measure probabilities; gains from trade also depend on the distance above the diagonal.</figcaption>
</figure>

The expected surplus captured by a posted price $$p$$ is

$$
\begin{aligned}
\int_0^p\int_p^1(v-c)\,dv\,dc
&=\int_0^p\left[\frac{1-p^2}{2}-c(1-p)\right]dc\\
&=\frac{p(1-p)}{2}\\
&=\frac18-\frac12\left(p-\frac12\right)^2.
\end{aligned}
$$

Choosing $$p=1/2$$ maximizes this expected surplus over all posted prices, achieving $$1/8$$ compared with the first-best benchmark $$1/6$$—that is,

$$
\frac{1/8}{1/6}=\frac34
$$

of the total available gains from trade.
Allowing more general second-best mechanisms, such as the Chatterjee–Samuelson double auction, raises the captured fraction slightly—to twenty-seven thirty-seconds, or about eighty-four percent—while still falling short of full efficiency.

## How much outside funding would restore efficiency?

Our envelope calculation also answers the quantitative question: if an outside sponsor is willing to subsidize the market, how much expected subsidy is needed to achieve full efficiency?

Combining the accounting identity with the two information-rent formulas gives

$$
\mathbb E[t_S-t_B]
=U_B(0)+U_S(1)+\frac16
\geq\frac16.
$$

An expected subsidy of $$1/6$$ is not only necessary; it is sufficient.
Ask both parties for their values, transfer the object whenever $$v\geq c$$, charge the buyer the seller's reported cost $$c$$, and pay the seller the buyer's reported value $$v$$:

$$
q(v,c)=\mathbf 1\{v\geq c\},\qquad
t_B(v,c)=c\,q(v,c),\qquad
t_S(v,c)=v\,q(v,c).
$$

This is the two-sided **Vickrey–Clarke–Groves (VCG)** mechanism.
Facing any seller report $$s$$, the buyer pays $$s$$ if they buy, so reporting their true value $$v$$ buys if and only if $$v\geq s$$; facing any buyer report $$b$$, the seller receives $$b$$ if they sell, so reporting $$c$$ sells if and only if $$b\geq c$$.
Truthful reporting is a dominant strategy for both parties, participation yields $$v-c\geq0$$ in every trade, and the outside sponsor pays a deficit of $$v-c$$ whenever trade occurs—an expected subsidy of

$$
\int_0^1\int_0^v(v-c)\,dc\,dv=\frac16,
$$

matching the lower bound.

## What the theorem tells us about markets

While uniform distributions make the integrals elementary, the theorem holds generally: whenever the buyer's and seller's independent private values are drawn from continuous, strictly positive densities on bounded intervals whose interiors overlap (with quasilinear utilities), no mechanism can simultaneously achieve ex post efficiency, Bayesian incentive compatibility, interim individual rationality, and expected budget balance.
See Section 3 of [Myerson and Satterthwaite (1983)](https://bpb-us-e1.wpmucdn.com/campuspress-test.yale.edu/dist/3/352/files/2011/01/1983-bilateral-trade.pdf) for the general proof and the second-best double auction.

Both hypotheses—overlapping supports and interim participation—are essential:

- **Overlapping valuations:** If the buyer's minimum possible value exceeds the seller's maximum possible cost, posting any fixed price between the two intervals achieves full efficiency without a subsidy.
- **Interim vs. ex ante participation:** If the buyer and seller could sign a binding contract *before* learning their own valuations $$v$$ and $$c$$, they could agree up front to pay an equal lump-sum entry fee to fund the VCG subsidy. The impossibility arises because each party already knows their valuation when deciding whether to participate, so the lowest-value buyer and highest-cost seller will refuse any positive entry fee.

Together with the [Milgrom–Stokey no-trade theorem](/fun-stuff/economics/milgrom-stokey.html), Myerson–Satterthwaite maps out the two fundamental limits of trade under private information: Milgrom–Stokey shows why private signals about a common value cannot generate new speculative gains starting from an efficient allocation, while Myerson–Satterthwaite shows why private valuations prevent bargaining from capturing every genuine gain from trade.
