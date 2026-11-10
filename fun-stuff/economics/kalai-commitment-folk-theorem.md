---
layout: fun-article
title: "Cooperation by Commitment: Kalai's Folk Theorem"
description: "An approachable proof of the commitment folk theorem, with an expanded Prisoner's Dilemma, jointly controlled lotteries, and the role of voluntary participation."
group: Economics
subtitle: "How binding conditional choices can support cooperation in a game played only once."
lead: "Defection is dominant in the Prisoner's Dilemma. But what if the choice made first is which binding rule will play on your behalf?"
permalink: /fun-stuff/economics/kalai-commitment-folk-theorem.html
date: 2026-11-05T19:03:52-07:00
published: true
---

The usual explanation for cooperation in the Prisoner's Dilemma invokes the future.
Cooperate today because your partner can punish you tomorrow.
But suppose there is no tomorrow: the game will be played exactly once.

There is another possibility.
Before playing, each person can choose a binding device that conditions its action on the device chosen by the other person.
Changing your device can then change what your opponent's device does.

Adam Tauman Kalai, Ehud Kalai, Ehud Lehrer, and Dov Samet establish how far this idea can go in [*A Commitment Folk Theorem*](https://doi.org/10.1016/j.geb.2009.09.008).
For a finite two-player game, a suitably constructed voluntary commitment game can support every feasible, individually rational payoff pair in Nash equilibrium.
The original game need only be played once.

We will first construct the expansion that supports cooperation in the Prisoner's Dilemma.
Then we will introduce a jointly controlled lottery and use it to prove the general theorem.
The key distinction throughout is between a promise that can be broken and a rule that actually determines play.

## The original Prisoner's Dilemma

Each player chooses cooperation, $$C$$, or defection, $$D$$.
Use the following familiar numerical payoffs, with the row player's payoff listed first:

| Row \ Column | $$C$$ | $$D$$ |
| --- | --- | --- |
| $$C$$ | $$(3,3)$$ | $$(0,5)$$ |
| $$D$$ | $$(5,0)$$ | $$(1,1)$$ |

Defection strictly dominates cooperation.
Against $$C$$, it gives five instead of three; against $$D$$, it gives one instead of zero.
Thus $$(D,D)$$ is the unique Nash equilibrium, even though both players prefer $$(C,C)$$.

A declaration that both intend to cooperate leaves this calculation unchanged.
So does an unconditional commitment by one player to cooperate: the other player would still prefer to defect.
The useful commitment must depend on what the other person commits to do.

## Expand the game by choosing delegates

The paper illustrates conditional commitment through the choice of a delegate.
We can express its example using four options:

- $$F$$, a **flexible delegate**, cooperates against another $$F$$ and defects against every other option.
- $$T$$, a **tough delegate**, always defects.
- $$C^0$$ means playing $$C$$ directly, without delegating.
- $$D^0$$ means playing $$D$$ directly, without delegating.

Delegation is binding and has no cost in this example.
Both players choose simultaneously.
The delegates then observe the opponent's delegate type, or that the opponent chose direct play, and execute their rules.
They do not revise their instructions afterward.

The direct-play choices are **neutral**: a delegate can react to the fact that someone declined delegation, but its action cannot depend on whether that person's direct choice was $$C$$ or $$D$$.
In particular, $$F$$ defects against either neutral choice.
This preserves the option of making an ordinary private choice in the original game.

Substitute the resulting actions into the original payoff table.
The expanded game is

| Row \ Column | $$F$$ | $$T$$ | $$C^0$$ | $$D^0$$ |
| --- | --- | --- | --- | --- |
| $$F$$ | $$(3,3)$$ | $$(1,1)$$ | $$(5,0)$$ | $$(1,1)$$ |
| $$T$$ | $$(1,1)$$ | $$(1,1)$$ | $$(5,0)$$ | $$(1,1)$$ |
| $$C^0$$ | $$(0,5)$$ | $$(0,5)$$ | $$(3,3)$$ | $$(0,5)$$ |
| $$D^0$$ | $$(1,1)$$ | $$(1,1)$$ | $$(5,0)$$ | $$(1,1)$$ |

The lower-right block is exactly the original Prisoner's Dilemma.
The expansion adds choices while retaining the original options and payoffs.

**Claim.** Choosing $$F$$ is weakly dominant for each player, and $$(F,F)$$ is a strict Nash equilibrium that produces cooperation.

For the row player, $$F$$ gives payoffs $$3,1,5,1$$ across the four columns.
Compared with $$T$$ or $$D^0$$, it gives a strictly higher payoff against $$F$$ and the same payoff against every other option.
Compared with $$C^0$$, it gives a strictly higher payoff in every column.
The column player's calculation is symmetric.

In particular, against $$F$$, staying with $$F$$ gives three, while switching to $$T$$ or $$D^0$$ gives one and switching to $$C^0$$ gives zero.
Thus neither player wants to change their chosen device at $$(F,F)$$.

The tempting deviation in the original game was to defect while the opponent cooperated.
Here, switching from $$F$$ to a defection option also switches the opponent's prescribed action from cooperation to defection, eliminating the payoff of five.
Note that $$(D^0,D^0)$$ also remains a Nash equilibrium of the expanded game—if the opponent plays $$D^0$$, switching unilaterally to $$F$$ still yields one—so the delegate expansion adds the cooperative equilibrium $$(F,F)$$ alongside the original equilibrium rather than replacing it.

## Why conditioning on devices is well defined

The flexible delegate does not attempt to solve the circular instruction “cooperate if and only if the opponent cooperates,” which would leave both $$(C,C)$$ and $$(D,D)$$ consistent when both players adopt it.
Instead, $$F$$ inspects the opponent's chosen **device**: against $$F$$ it outputs $$C$$, and against any other option it outputs $$D$$.
Every pair of devices maps to a unique pair of actions without any circular evaluation.

In the general model, a commitment space specifies the set of permissible devices together with a deterministic resolution rule that maps each device profile into an action profile of the underlying game.
A Nash equilibrium is then an equilibrium in the choice of devices.

## Why the general theorem needs a lottery

The Prisoner's Dilemma has a symmetric pure outcome, $$(C,C)$$, that improves on $$(D,D)$$ for both players.
Other games require correlated randomization to share the gains from cooperation.
Consider the paper's fight-or-relinquish example (writing “yield” for relinquishing):

| Row \ Column | Fight | Yield |
| --- | --- | --- |
| Fight | $$(2,2)$$ | $$(10,0)$$ |
| Yield | $$(0,10)$$ | $$(0,0)$$ |

Fighting strictly dominates yielding, so the unique Nash equilibrium of the original game is $$(2,2)$$.
No pure outcome gives both players more than two, whereas a fifty-fifty lottery between the two asymmetric outcomes gives

$$
\frac12(10,0)+\frac12(0,10)=(5,5).
$$

Independent fifty-fifty randomization cannot achieve $$(5,5)$$ because it also puts weight on both fighting and both yielding, giving each player only

$$
\frac14(2)+\frac14(10)+\frac14(0)+\frac14(0)=3.
$$

Achieving a total expected payoff of ten requires exactly one fighter in every realization; giving both players five requires correlating who fights and who yields.

## A fair coin controlled by two people

Each player privately chooses a bit, zero or one, before seeing the other's choice.
The devices use whether the bits match to assign roles:

| First bit | Second bit | Assigned outcome |
| --- | --- | --- |
| 0 | 0 | Row fights, column yields |
| 0 | 1 | Row yields, column fights |
| 1 | 0 | Row yields, column fights |
| 1 | 1 | Row fights, column yields |

If the column player randomizes fifty-fifty between $$0$$ and $$1$$, then either bit chosen by the row player produces each outcome with probability one-half—and so does any mixture over the row player's bits.
By symmetry, the same holds with the players reversed.
This is a **jointly controlled lottery**: as long as one player randomizes uniformly, the other player cannot skew the outcome distribution.

To turn this lottery into an equilibrium, let each player choose either a bit-carrying lottery device or direct play.
When both choose lottery devices, the devices execute the table above; when either player chooses direct play, a lottery device fights.
When both players randomize uniformly over their bits, each gets an expected payoff of five.
Changing one's bit distribution leaves that payoff at five, while opting out to direct play faces a fighting opponent and yields at most two.

Notice why the commitment must be binding *after* the coin flip as well as before it.
If the lottery merely recommended actions, the player told to yield would defect to fighting and get two instead of zero.
Because the devices execute the assigned actions automatically, a player can deviate only by choosing a different device **before** seeing the opponent's bit.

## The continuous lottery and its proof

A binary coin handles a fifty-fifty split; to implement an arbitrary probability distribution over finitely many outcomes, replace the bit with a real number in $$[0,1)$$.
Each player submits $$r_1,r_2\in[0,1)$$, and the devices compute

$$
z=(r_1+r_2)\bmod1,
$$

the fractional part of their sum.

**Lottery lemma.** If either player's number is drawn uniformly from $$[0,1)$$ and independently of the other's, then $$z$$ is uniform on $$[0,1)$$ regardless of how the other number is chosen.

To verify this, fix $$r_1=x\in[0,1)$$ and let $$r_2$$ be uniform on $$[0,1)$$.
For any $$0\leq t\leq1$$,

$$
\begin{aligned}
\Pr(z<t\mid r_1=x)
&=\int_0^{1-x}\mathbf1_{\{x+y<t\}}\,dy
+\int_{1-x}^{1}\mathbf1_{\{x+y-1<t\}}\,dy\\
&=\max\{t-x,0\}+\min\{t,x\}\\
&=t.
\end{aligned}
$$

Because this holds for every fixed $$x$$, it also holds for any independent distribution over $$r_1$$, and by symmetry when the roles of the two players are swapped.

To implement target probabilities—say $$1/5$$, $$3/10$$, and $$1/2$$ across three outcomes—partition $$[0,1)$$ into subintervals of those lengths:

$$
[0,1/5),\qquad[1/5,1/2),\qquad[1/2,1),
$$

and select the outcome whose interval contains $$z$$.
So long as one player draws $$r_i$$ uniformly and independently, the other player cannot alter the resulting outcome probabilities.

## State the folk theorem precisely

Let the underlying finite game have action sets $$S_1,S_2$$ and payoff functions $$u_1,u_2$$.
For any probability distribution $$\gamma$$ over pure action profiles $$S_1\times S_2$$, write

$$
u_i(\gamma)=\sum_{s\in S_1\times S_2}\gamma(s)u_i(s).
$$

A payoff pair is **feasible** if it equals $$u(\gamma)$$ for some distribution $$\gamma$$ (that is, lies in the convex hull of the pure-strategy payoff pairs).

Player $$i$$'s **minmax payoff** is

$$
v_i
=\min_{\sigma_{-i}\in\Delta(S_{-i})}
\max_{s_i\in S_i}u_i(s_i,\sigma_{-i}),
$$

where $$\Delta(S_{-i})$$ is the set of the opponent's mixed strategies.
This is the lowest expected payoff the opponent can hold player $$i$$ down to when player $$i$$ best-responds; by the minimax theorem, it is also the payoff player $$i$$ can guarantee on their own.

A feasible distribution $$\gamma$$ is **individually rational** when

$$
u_1(\gamma)\geq v_1,
\qquad
u_2(\gamma)\geq v_2.
$$

In our Prisoner's Dilemma, $$v_1=v_2=1$$; in the fight-or-yield game, $$v_1=v_2=2$$.

**Commitment folk theorem.** For every finite two-player game, there exists a single voluntary commitment space whose set of Nash-equilibrium payoffs is exactly the set of feasible, individually rational payoffs of the original game.

A single universal menu of devices works for every target distribution $$\gamma$$ at once.
We now construct that menu and prove both inclusions.

## Build the universal commitment space

Fix an ordering of the pure action profiles in $$S_1\times S_2$$.
For any distribution $$\gamma$$, partition $$[0,1)$$ into consecutive half-open intervals of lengths $$\gamma(s)$$ in that order (assigning empty intervals to zero-probability profiles), and let $$f_\gamma(z)$$ denote the profile whose interval contains $$z$$.
Whenever $$z$$ is uniform on $$[0,1)$$, $$f_\gamma(z)$$ has distribution $$\gamma$$.

Each player selects a device specified by a triple

$$
d_i=(\gamma_i,r_i,s_i),
$$

consisting of a proposed distribution $$\gamma_i$$ (or $$\bot$$ to opt out), a lottery number $$r_i\in[0,1)$$, and a fallback action $$s_i\in S_i$$.
The resolution rule is

$$
R(d_1,d_2)=
\begin{cases}
f_{\gamma_1}\bigl((r_1+r_2)\bmod1\bigr),
&\gamma_1=\gamma_2\ne\bot,\\
(s_1,s_2),&\text{otherwise}.
\end{cases}
$$

When both players propose the same distribution, the jointly controlled lottery selects the action profile; when their proposals disagree or either player opts out with $$\bot$$, both devices fall back to playing $$(s_1,s_2)$$.

Notice how opting out preserves voluntary participation: the neutral device $$(\bot,0,s_i)$$ unconditionally plays $$s_i$$, and the opponent's device responds with its fallback action $$s_{-i}$$ without being able to condition on *which* action $$s_i$$ the opting-out player chose.

## Prove that every individually rational distribution is supported

Fix any target distribution $$\gamma$$ with $$u_i(\gamma)\geq v_i$$ for $$i=1,2$$.
For each player $$i$$, let $$\psi_i\in\Delta(S_i)$$ be a minmax mixture against player $$-i$$, so that

$$
u_{-i}(s_{-i},\psi_i)\leq v_{-i}
\qquad\text{for every }s_{-i}\in S_{-i}.
$$

Now have each player $$i$$ randomize over devices as follows:

- Propose $$\gamma_i=\gamma$$ with probability one.
- Draw $$r_i$$ uniformly from $$[0,1)$$.
- Independently draw the fallback action $$s_i$$ according to $$\psi_i$$.

On the equilibrium path, the proposals match and the lottery lemma produces $$\gamma$$, giving each player expected payoff $$u_i(\gamma)$$.

Consider any pure deviation $$d_i'=(\gamma_i',r_i',s_i')$$ by player $$i$$:

- **If $$\gamma_i'=\gamma$$**, the proposals still match. Because the opponent's lottery number $$r_{-i}$$ is uniform and independent, the lottery lemma keeps the outcome distribution equal to $$\gamma$$ for any choice of $$r_i'$$, and the fallback $$s_i'$$ is unused. Player $$i$$ still gets $$u_i(\gamma)$$.
- **If $$\gamma_i'\neq\gamma$$ (including $$\gamma_i'=\bot$$)**, the mismatch triggers the fallback profile $$(s_i',s_{-i})$$. Since the opponent's fallback $$s_{-i}$$ is drawn from the minmax mixture $$\psi_{-i}$$, player $$i$$ gets at most $$v_i\leq u_i(\gamma)$$.

Because no pure device can improve on $$u_i(\gamma)$$, no randomized deviation can either.
Notice why pre-drawing the fallback action inside the device is essential when the minmax punishment $$\psi_{-i}$$ is mixed: after a mismatch, the deviator's device must play its pre-committed $$s_i'$$ rather than observing the realized draw from $$\psi_{-i}$$ and best-responding to it ex post.

## Why no other equilibrium payoffs are possible

Every pair of devices outputs a pure action profile of the original game, so any equilibrium mixture over devices induces a feasible payoff pair.

To verify individual rationality, take any Nash equilibrium of the commitment game and consider player $$i$$'s neutral devices $$(\bot,0,s_i)$$.
Against the opponent's equilibrium mixture over devices, opting out triggers the opponent's marginal fallback distribution, call it $$\sigma_{-i}\in\Delta(S_{-i})$$.
Because the opponent's fallback cannot depend on which $$s_i$$ player $$i$$ pairs with $$\bot$$, player $$i$$ can pick the best response $$s_i\in S_i$$ against $$\sigma_{-i}$$ and secure at least

$$
\max_{s_i\in S_i}u_i(s_i,\sigma_{-i})
\geq
\min_{\tau_{-i}\in\Delta(S_{-i})}
\max_{s_i\in S_i}u_i(s_i,\tau_{-i})
=v_i.
$$

Hence every equilibrium payoff pair is both feasible and individually rational.

## What commitment changes

Compare the commitment folk theorem with three related frameworks:

- **Correlated equilibrium vs. commitment:** A correlated equilibrium of the original game sends private action recommendations that players must willingly obey *after* seeing their recommendation. A binding device shifts the decision *before* the lottery draw: in the fight-or-yield game, neither player can walk away from a “yield” outcome once the coin has been flipped, which is why $$(5,5)$$ becomes sustainable.
- **Repeated games vs. one-shot commitment:** Classical folk theorems enforce cooperation by threatening punishment in future periods. Conditional commitment compresses action and reaction into a single play: deviating to another device immediately triggers the opponent's fallback punishment in the same round, while the jointly controlled lottery replaces role-alternation across time.
- **Complete vs. incomplete information:** Unlike the [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) (where players communicate over a noisy channel) or the [Myerson–Satterthwaite theorem](/fun-stuff/economics/myerson-satterthwaite.html) (where traders hold private valuations and must be given incentives to report them), Kalai et al.'s theorem operates under complete information about payoffs: its contribution is showing that conditional rules, protected opt-outs, and jointly controlled randomness suffice to support the entire feasible, individually rational payoff set in a single shot.

## Further reading

Adam Tauman Kalai, Ehud Kalai, Ehud Lehrer, and Dov Samet, [“A Commitment Folk Theorem,” *Games and Economic Behavior* 69(1), 127–137 (2010)](https://doi.org/10.1016/j.geb.2009.09.008).
The [author-hosted published paper](https://www.tau.ac.il/~samet/papers/commitments.pdf) presents the delegate expansion in Example 2, the fight-or-relinquish game in Example 3, and the universal commitment space in Section 4.2.
