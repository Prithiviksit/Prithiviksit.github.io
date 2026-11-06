---
layout: fun-article
title: "Cooperation by Commitment: Kalai's Folk Theorem"
description: "An approachable proof of the commitment folk theorem, with an expanded Prisoner's Dilemma, jointly controlled lotteries, and the role of voluntary participation."
group: Economics
subtitle: "How binding conditional choices can support cooperation in a game played only once."
lead: "Defection is dominant in the Prisoner's Dilemma. But what if the choice made first is which binding rule will play on your behalf?"
permalink: /fun-stuff/economics/kalai-commitment-folk-theorem.html
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
Here, changing from $$F$$ to a defection option also changes the opponent's prescribed action from cooperation to defection.
The attractive payoff of five is no longer available through that deviation.

This supports cooperation, but does not eliminate every bad equilibrium.
For example, $$(D^0,D^0)$$ remains an equilibrium: switching alone to $$F$$ still yields one.
The theorem we are building toward concerns which payoffs can be supported, not a prediction that players must select the best equilibrium.

## Why conditioning on devices is well defined

The flexible delegate does not attempt to solve the instruction “cooperate if the opponent cooperates.”
That instruction would be ambiguous when both players use it: both cooperation and defection would satisfy it.

Instead, $$F$$ checks the opponent's selected **device**.
Against $$F$$ it outputs $$C$$; against anything else it outputs $$D$$.
Every pair of devices determines exactly one pair of actions.
No circular calculation of the other device's eventual output is needed.

This distinction is essential in the general model.
A commitment space specifies permissible devices and a deterministic rule mapping each pair of devices into an action profile of the original game.
A Nash equilibrium is then an equilibrium in the choice of those devices.

## Why the general theorem needs a lottery

The Prisoner's Dilemma has an attractive pure outcome, $$(C,C)$$.
Other games require correlated randomization to share the gains from cooperation.
Consider the paper's fight-or-relinquish example, writing “yield” for relinquishing:

| Row \ Column | Fight | Yield |
| --- | --- | --- |
| Fight | $$(2,2)$$ | $$(10,0)$$ |
| Yield | $$(0,10)$$ | $$(0,0)$$ |

Fighting strictly dominates yielding, and the unique Nash equilibrium gives $$(2,2)$$.
No pure outcome gives both players more than two.
But a fair lottery between the two outcomes with exactly one fighter gives

$$
\frac12(10,0)+\frac12(0,10)=(5,5).
$$

Independent fifty-fifty choices do not implement this lottery.
They also produce both fighting and both yielding, giving each player only

$$
\frac14(2)+\frac14(10)+\frac14(0)+\frac14(0)=3.
$$

More generally, achieving total expected payoff ten requires exactly one player to fight with probability one.
Independent randomization can guarantee this only by assigning the roles deterministically, which gives one player zero.
To give both five, the roles must be correlated.

## A fair coin controlled by two people

Each player privately chooses a bit, zero or one, before seeing the other's choice.
The devices use whether the bits agree to decide who fights:

| First bit | Second bit | Assigned outcome |
| --- | --- | --- |
| 0 | 0 | Row fights, column yields |
| 0 | 1 | Row yields, column fights |
| 1 | 0 | Row yields, column fights |
| 1 | 1 | Row fights, column yields |

If the column player chooses each bit with probability one-half, either fixed bit chosen by the row player produces each outcome with probability one-half.
Any randomization by the row player simply averages these identical lotteries.
The same argument applies with the players reversed.

This is a **jointly controlled lottery**: either player's uniform randomization prevents the other from changing the outcome probabilities unilaterally.
The players supply independent randomness, and the devices turn it into a correlated action profile.

To make the lottery an equilibrium, let each player choose either a lottery device carrying a bit or direct play.
Two lottery devices execute the table; against direct play, a lottery device fights.
With independent fair bits, each player gets five.
Changing one's bit does not change that expected payoff.
Switching to direct play faces an opponent who fights, so the deviator gets at most two.
Thus the fair lottery is supported by an equilibrium of this expanded game.

The commitment matters after the draw as well.
If the devices merely recommended the actions, the player told to yield would prefer to fight and obtain two instead of zero.
Binding devices execute the selected actions, so the relevant deviation is a change of device **before** the other player's random choice is observed.
There is no later option to reject an unfavorable draw.

## The continuous lottery and its proof

A fair coin covers a fifty-fifty split.
To implement an arbitrary distribution over finitely many outcomes, use numbers in $$[0,1)$$.
Each player supplies a number, $$r_1$$ or $$r_2$$, and define

$$
z=(r_1+r_2)\bmod1.
$$

In words, add the numbers and keep the fractional part.

**Lottery lemma.** If either number is uniform on $$[0,1)$$ and independent of the other player's choice, then $$z$$ is uniform, regardless of that other choice.

To prove it, fix $$r_1=x\in[0,1)$$ and let $$r_2$$ be uniform.
For $$0\leq t\leq1$$,

$$
\begin{aligned}
\Pr(z<t\mid r_1=x)
&=\int_0^{1-x}\mathbf1_{\{x+y<t\}}\,dy
+\int_{1-x}^{1}\mathbf1_{\{x+y-1<t\}}\,dy\\
&=\max\{t-x,0\}+\min\{t,x\}\\
&=t.
\end{aligned}
$$

This is the uniform distribution function.
The result holds for every fixed $$x$$, hence also for any independent randomized choice of $$x$$ by averaging.
Symmetry proves the claim for either player.

For example, to implement probabilities $$1/5$$, $$3/10$$, and $$1/2$$ over three outcomes, assign them the intervals

$$
[0,1/5),\qquad[1/5,1/2),\qquad[1/2,1).
$$

The interval containing $$z$$ selects the outcome.
Neither player can change these probabilities while the other supplies an independent uniform number.
The numbers must be chosen before observing the other player's draw; otherwise one could deliberately choose the sum.

## State the folk theorem precisely

Let the original finite game have action sets $$S_1,S_2$$ and payoff functions $$u_1,u_2$$.
The game, including its payoffs, and the rules of the commitment space are common knowledge.
For a distribution $$\gamma$$ over action profiles, write

$$
u_i(\gamma)=\sum_{s\in S_1\times S_2}\gamma(s)u_i(s).
$$

A payoff pair is **feasible** if it equals $$u(\gamma)$$ for some such distribution.
This is the convex hull of the pure-outcome payoff pairs.
The distribution need not be a correlated equilibrium of the original game.

Player $$i$$'s minmax payoff is

$$
v_i
=\min_{\sigma_{-i}\in\Delta(S_{-i})}
\max_{s_i\in S_i}u_i(s_i,\sigma_{-i}),
$$

where $$\Delta(S_{-i})$$ denotes the opponent's mixed actions and payoffs against a mixed action are evaluated in expectation.
This is the lowest payoff an opponent can hold player $$i$$ to when player $$i$$ best responds to that mixed action.
By the finite minimax theorem applied to payoff function $$u_i$$, it also equals the payoff player $$i$$ can guarantee by choosing an appropriate mixed action.

A feasible distribution is **individually rational** when

$$
u_1(\gamma)\geq v_1,
\qquad
u_2(\gamma)\geq v_2.
$$

In our Prisoner's Dilemma, both minmax payoffs are one.
In the fight-or-yield game, both are two.

**Commitment folk theorem.** For every finite two-player game, there is one voluntary commitment space whose Nash-equilibrium payoff set is exactly the feasible, individually rational payoff set of the original game.
Mixed strategies over devices are allowed.

“One” matters: the same menu of devices works for all the target distributions.
The construction uses a continuum of devices, allowing arbitrary real-valued probabilities.
We will prove both that every desired payoff is attainable and that equilibrium payoffs cannot fall outside the stated set.

## Build the universal commitment space

Fix an ordering of all pure action profiles.
For any distribution $$\gamma$$, partition $$[0,1)$$ into consecutive half-open intervals with lengths $$\gamma(s)$$ in that order.
Let $$f_\gamma(z)$$ be the action profile assigned to the interval containing $$z$$.
Zero-probability profiles receive empty intervals.
Thus a uniform $$z$$ produces precisely distribution $$\gamma$$.

Each player chooses a device consisting of three entries:

$$
d_i=(\gamma_i,r_i,s_i).
$$

The entries are a proposed distribution $$\gamma_i$$, a lottery number $$r_i\in[0,1)$$, and a fallback action $$s_i\in S_i$$.
In place of a proposed distribution, the player may submit $$\bot$$, meaning “opt out.”

The fixed rule for the resulting action profile is

$$
R(d_1,d_2)=
\begin{cases}
f_{\gamma_1}\bigl((r_1+r_2)\bmod1\bigr),
&\gamma_1=\gamma_2\ne\bot,\\
(s_1,s_2),&\text{otherwise}.
\end{cases}
$$

Matching proposals activate the jointly controlled lottery.
Different proposals, or either player's opting out, activate the fallback actions.
For each pair of chosen devices, the output is deterministic and uniquely defined.
Randomness enters through the players' mixed choices of devices.

This construction is voluntary in the precise sense used earlier.
The neutral device $$(\bot,0,s_i)$$ always plays $$s_i$$.
Moreover, the opponent's output is its own fallback action, regardless of which neutral action $$s_i$$ was selected.
So the opponent can respond to opting out without conditioning on the private action chosen when opting out.

## Prove that every individually rational distribution is supported

Fix a target distribution $$\gamma$$ satisfying $$u_i(\gamma)\geq v_i$$ for both players.
For each player $$i$$, choose a mixed action $$\psi_i$$ that minmaxes the other player.
By definition, it satisfies

$$
u_{-i}(s_{-i},\psi_i)\leq v_{-i}
\qquad\text{for every }s_{-i}\in S_{-i},
$$

where the arguments indicate the other player's action and player $$i$$'s punishment mixture.
Such a mixture exists because the original action sets are finite.

Consider the following independent mixed device choices by the two players:

- Propose the target $$\gamma$$ with probability one.
- Draw $$r_i$$ uniformly on $$[0,1)$$.
- Independently draw the fallback action $$s_i$$ from $$\psi_i$$.

Both proposals match, so the lottery lemma implies that the resulting action profile has distribution $$\gamma$$.
Each player receives expected payoff $$u_i(\gamma)$$.

Now fix any alternative pure device chosen by player $$i$$.
There are two cases.

**The alternative still proposes $$\gamma$$.**
The opponent's lottery number remains independent and uniform.
Whatever number the deviator chooses, the resulting distribution remains $$\gamma$$.
Changing the fallback action has no effect because the proposals match.
The deviation gives exactly $$u_i(\gamma)$$.

**The alternative proposes something else, including opting out.**
The mismatch activates the fallback actions.
The deviator's selected action faces the opponent's punishment mixture $$\psi_{-i}$$, so the deviation gives at most

$$
v_i\leq u_i(\gamma).
$$

Every pure-device deviation is therefore unprofitable.
An arbitrary randomized deviation, even one correlating its proposal, number, and fallback action, is an average of these pure-device payoffs and cannot do better.
This establishes a Nash equilibrium with outcome distribution $$\gamma$$.

Notice how the proof handles punishments that require randomization.
The opponent draws its fallback action when choosing the device.
The permitted response rule makes the deviator execute its own already-selected fallback action after a mismatch; it cannot switch to a new action conditional on the opponent's realized fallback draw.
Allowing arbitrary additional response programs would change the game and could invalidate this bound.
The theorem constructs a suitable menu of devices, rather than asserting that every possible menu works.

## Why no other equilibrium payoffs are possible

Feasibility follows immediately: whatever the devices do, their output is a pure action profile of the original game.
Random device choices induce a distribution over those profiles.

For individual rationality, fix an equilibrium and consider player $$i$$'s neutral options.
Against the opponent's equilibrium device mixture, the opponent's response to a neutral device has some mixed-action distribution $$\sigma_{-i}$$.
The privacy condition means this distribution is the same for every neutral action player $$i$$ might choose.

Player $$i$$ can therefore choose the best neutral action and obtain

$$
\max_{s_i\in S_i}u_i(s_i,\sigma_{-i})
\geq
\min_{\tau_{-i}\in\Delta(S_{-i})}
\max_{s_i\in S_i}u_i(s_i,\tau_{-i})
=v_i.
$$

An equilibrium must give at least as much as this available deviation.
Thus its payoff is individually rational.
Together with the construction, this proves the claimed equality of payoff sets, including the boundary where one or both players receive exactly their minmax payoff.

## What commitment changes

A correlated recommendation leaves the recipient free to change actions after seeing it.
A binding device moves the strategic choice earlier: the player chooses a rule before the other player's random device is realized, and that rule subsequently determines the action.
This is why the fight-or-yield lottery can give $$(5,5)$$ even though a recommendation to yield would not be obeyed in the original game.

The result resembles a repeated-game folk theorem in the payoffs it makes available.
Its incentives come from a different source.
Instead of future punishment, a change of device activates a different response in the same play of the underlying game.
The jointly controlled lottery supplies the correlation that repeated play could otherwise generate by alternating roles.

The [Rubinstein email game](/fun-stuff/economics/rubinstein-email-game.html) makes the communication protocol central: a long exchange of confirmations can leave uncertainty that prevents coordination.
Here the players choose binding conditional rules from a commonly understood menu.
That is a change in the available strategic choices, not merely another exchange of messages.
The [Aumann article](/fun-stuff/economics/aumann-agreement.html) supplies the distinction between shared information and common knowledge that helps keep these assumptions clear.

Nor does the theorem overturn [Myerson–Satterthwaite](/fun-stuff/economics/myerson-satterthwaite.html).
The theorem proved here concerns a complete-information game with known payoffs.
Myerson–Satterthwaite concerns private valuations and the incentives to report them, alongside participation and budget constraints.
A construction for known payoffs does not remove those reporting constraints.

The commitment theorem identifies what a sufficiently rich, binding, voluntary institution can support.
It leaves open which such devices are available in a particular setting and how players select among their equilibria.
Its constructive insight is that conditional commitment, protected outside options, and jointly controlled randomness can support the entire feasible individually rational payoff set in a single play.

## Further reading

Adam Tauman Kalai, Ehud Kalai, Ehud Lehrer, and Dov Samet, [“A Commitment Folk Theorem,” *Games and Economic Behavior* 69(1), 127–137 (2010)](https://doi.org/10.1016/j.geb.2009.09.008).
The [author-hosted published paper](https://www.tau.ac.il/~samet/papers/commitments.pdf) contains the delegate expansion in Example 2, the fight-or-relinquish game in Example 3, and the general construction in Section 4.2.
The numerical Prisoner's Dilemma payoffs and the binary lottery walkthrough above provide explicit calculations for those mechanisms.
