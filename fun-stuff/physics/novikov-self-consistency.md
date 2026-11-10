---
layout: fun-article
title: "Can You Change the Past? Novikov's Self-Consistency Principle"
description: "Time travel as a global consistency problem: the physics behind Novikov's principle, a fixed-point formulation, an exactly solvable billiard-ball example, and its life in fiction."
group: Physics
subtitle: "A wormhole, a collision with your younger self, and the difference between influencing history and rewriting it."
lead: "A time traveler is told not to change the past. But even breathing moves air molecules. How could visiting the past possibly leave it untouched?"
permalink: /fun-stuff/physics/novikov-self-consistency.html
date: 2026-11-05T23:10:05-07:00
published: true
---

The familiar instruction to time travelers—do not change anything—becomes puzzling as soon as we take it literally.
Breathing changes the air.
Standing in a room changes the light, the temperature, and the motion of the people walking around you.
There is no obvious physical boundary between an insignificant disturbance and one that changes someone's life.

**Novikov's self-consistency principle** offers a different way to think about the problem.
If travel into the past is possible, the traveler's actions must fit into one consistent history.
The breathing, the conversation, and the intervention were already part of what happened.
There is no earlier version of history in which the traveler was absent, followed by a revised version in which the traveler arrived.

That sounds like a rule for writing science fiction.
It is also a serious proposal about how to formulate physics in a spacetime where causes can loop back on themselves.
Its mathematical content is easiest to see by separating three questions: what the local laws allow, whether their solutions fit together globally, and whether that fit is unique.

## How a science-fiction problem became a physics problem

In general relativity, spacetime geometry determines which paths a physical observer can follow.
A **closed timelike curve**, or CTC, is a path that always points toward the traveler's local future but eventually returns to its starting spacetime event.
A clock carried along the path keeps advancing; the difficulty appears when we try to order the entire path from an outside perspective.

This possibility did not originate with Novikov.
Gödel's [1949 rotating-universe solution](https://doi.org/10.1103/RevModPhys.21.447) showed that Einstein's equations admit geometries containing CTCs.

Science fiction did help stimulate a later, more concrete research program.
Carl Sagan's work on *Contact* prompted discussions with Kip Thorne about interstellar travel through wormholes, reflected in Morris and Thorne's [1988 paper on traversable wormholes](https://doi.org/10.1119/1.15620).
A wormhole is a hypothetical connection between regions of spacetime whose route through the connection can be much shorter than the outside route.

Morris, Thorne, and Yurtsever then argued that, **if a traversable wormhole could be created and maintained**, a time offset between its mouths could turn it into a time machine.
Differential aging of the mouths supplies the basic idea: entering one mouth can lead to an exit that external clocks label as earlier.
Their [1988 time-machine paper](https://doi.org/10.1103/PhysRevLett.61.1446) turned a question about shortcuts through space into a question about causality.

Novikov discussed the need for consistent histories in his [1989 analysis of a time machine](https://www.jetp.ras.ru/cgi-bin/dn/e_068_03_0439.pdf).
Friedman, Morris, Novikov, Echeverria, Klinkhammer, Thorne, and Yurtsever gave an explicit global formulation in [1990](https://doi.org/10.1103/PhysRevD.42.1915).
Their question was whether familiar local laws could still fit together when spacetime allowed a return to the past.

## Local laws, global histories

For readers comfortable with a little notation, a smooth closed timelike curve can be written as a path $$\gamma(\tau)$$ satisfying

$$
\gamma(0)=\gamma(T),\qquad T>0,
$$

with a future-directed tangent obeying

$$
g_{\mu\nu}\dot\gamma^\mu\dot\gamma^\nu<0.
$$

Here $$g_{\mu\nu}$$ is the spacetime metric, we use the sign convention $$(-,+,+,+)$$, and a dot means differentiation along the path.
The inequality says that the path is timelike: locally it is an allowed path for a massive observer.
The equality says that the path closes.

Ordinary equations of motion are local.
They tell a ball how to accelerate or a field how to vary in a small neighborhood.
Novikov's requirement is global: the pieces must describe the same physical state wherever the geometry makes them meet again.

For example, take a fixed spacetime $$M$$ with metric $$g$$ and a real, massless scalar field $$\phi$$ obeying

$$
\Box_g\phi=0,
$$

where $$\Box_g$$ is the wave operator in that geometry.
Suppose we have specified a local solution $$\phi_U$$ on a region $$U$$.
The consistency requirement is that there exist a sufficiently regular, single-valued field on the whole nonsingular spacetime such that

$$
\begin{cases}
\Box_g\phi=0 & \text{throughout }M,\\
\phi|_U=\phi_U. &
\end{cases}
$$

The second line means that the global field agrees with the local field we started with.
This expresses the [global-extension principle](https://doi.org/10.1103/PhysRevD.42.1915) for a field in a prescribed spacetime geometry.

Neither the existence nor the uniqueness of such an extension is guaranteed by this statement.

## History as a fixed point

We can make the global consistency condition concrete by cutting a causal loop at the exit of a wormhole.
Specify the state emerging from the exit—its arrival time, position, velocity, and any internal degrees of freedom—and call that state $$x$$.

Holding the incoming external state fixed, let the system evolve forward in time (including any collision or interaction with its younger self) until it enters the wormhole, and apply the wormhole's boundary rule to transport that state back to the exit.
When this forward evolution and transport define a return map $$F$$, global self-consistency is simply the fixed-point equation

$$
\boxed{x=F(x).}
$$

The state emerging from the wormhole exit must equal the state that the resulting history sends into the entrance.

A single classical bit sent backward in time already illustrates why **existence** and **uniqueness** of fixed points are separate questions.
Let $$x\in\{0,1\}$$ be the bit emerging from the receiver, and suppose an automatic circuit feeds $$F(x)$$ into the transmitter aimed at that receiver:

| Circuit rule | Fixed-point equation | Self-consistent histories |
| --- | --- | --- |
| Copy the bit | $$x=x$$ | Both $$0$$ and $$1$$ (nonunique) |
| Reset to $$0$$ | $$x=0$$ | Only $$0$$ (unique) |
| Flip the bit (NOT gate) | $$x=1-x$$ | Neither $$0$$ nor $$1$$ (none in $$\{0,1\}$$) |

In a discrete two-state model, the NOT-gate loop has no fixed point in $$\{0,1\}$$; by contrast, as soon as the state space is a continuous interval or manifold (where Brouwer's or Schauder's fixed-point theorem applies), a continuous return map $$F$$ naturally admits fixed points—often through a glancing or partial interaction that resolves an apparent discrete paradox.

## A billiard ball meets its younger self

To test whether continuous physics avoids the NOT-gate trap, Kip Thorne and his collaborators replaced the science-fiction “grandfather paradox” with a mechanical model: **Polchinski's billiard ball**.
Aim a billiard ball toward a wormhole mouth so that, if nothing interferes, it enters the wormhole, exits in the past before it entered, and knocks its younger self away from the entrance.
If the younger ball is knocked away, it never enters the wormhole—so how could the older ball emerge to hit it?

The fallacy in the paradox is pasting together two incompatible trajectories: using the *unperturbed* straight path to get the ball into the wormhole, and then using a *head-on collision* path that prevents it from entering.
A genuine solution must solve for the collision and the wormhole transit simultaneously as a fixed point $$x=F(x)$$.

In their [1991 billiard-ball paper](https://doi.org/10.1103/PhysRevD.44.1077), Fernando Echeverria, Gunnar Klinkhammer, and Kip Thorne proved that instead of having *no* solution, generic paradox-aimed initial trajectories admit **multiple** self-consistent solutions: a glancing blow deflects the younger ball just enough to enter the wormhole on a slightly shifted path, emerging at the exact angle needed to deliver that glancing blow!

We can verify a complete, exact self-consistent collision in elementary planar mechanics.

### An exactly solvable loop

Model the billiard ball in the plane as a frictionless, perfectly elastic disk of radius $$1/\sqrt2$$, mass $$m$$, and speed $$1$$.
Suppose the wormhole entrance sits at $$B=(0,-2)$$ and its exit sits at $$A=(1,3)$$, with the boundary rule that a disk center entering $$B$$ at time $$t$$ emerges from $$A$$ at time $$t-4$$ with the same velocity vector.

At time $$t=0$$, place the younger disk at center $$(0,0)$$ with velocity $$(1,0)$$ (moving right) and the older disk at center $$(1,1)$$ with velocity $$(0,-1)$$ (moving down).
The distance between their centers is $$\sqrt{1^2+1^2}=\sqrt2$$, which equals the sum of their radii, so they kiss at $$t=0$$ along the $$45^\circ$$ line joining $$(0,0)$$ and $$(1,1)$$.

<figure class="math-figure">
  <img src="/img/others/novikov-billiard-loop.svg" width="520" height="640" style="max-width: 520px; margin-inline: auto;" alt="Two ages of one ball touch at time zero. The younger ball approaches from the left and turns downward into entrance B at time 2. It exits mouth A at time minus 2, moves downward as the older ball, and turns right after the collision. A dashed connection links B to A through the wormhole.">
  <figcaption>A spatial diagram of one consistent history. The disks show the two ages at the collision; the arrows trace their center paths. The dashed connection is the wormhole identification, not a path through the surrounding space.</figcaption>
</figure>

Because the two disks have equal mass and collide elastically along the $$45^\circ$$ line of centers, the impact swaps their velocities:

1. At $$t=0$$, the younger disk's velocity changes from $$(1,0)$$ to $$(0,-1)$$, sending it straight down from $$(0,0)$$ to the wormhole entrance $$B=(0,-2)$$ at $$t=2$$.
2. The wormhole transports it four time units into the past to the exit $$A=(1,3)$$ at $$t=-2$$, still moving downward with velocity $$(0,-1)$$.
3. Traveling downward from $$(1,3)$$ for two time units brings the older disk to $$(1,1)$$ at $$t=0$$—the exact position and velocity needed to strike its younger self!
4. At $$t=0$$, the collision changes the older disk's velocity from $$(0,-1)$$ to $$(1,0)$$, and it rolls off to the right forever.

Every conservation law and boundary condition is satisfied: the collision itself deflects the younger ball into the wormhole so that it can emerge in the past and deliver the collision.

<details markdown="1">
<summary>Check the collision and the full trajectory</summary>

Write the incoming velocities as $$u=(1,0)$$ for the younger disk and $$v=(0,-1)$$ for the older disk.
The unit vector from the younger center to the older center is

$$
n=\frac{(1,1)}{\sqrt2}.
$$

For frictionless disks, the impulse acts along $$n$$.
For equal masses and a perfectly elastic collision, conservation of momentum and reversal of the relative normal velocity give

$$
\begin{aligned}
u'&=u-[(u-v)\cdot n]n,\\
v'&=v+[(u-v)\cdot n]n.
\end{aligned}
$$

To derive this, write the impulse on the older disk as $$Jn$$ and that on the younger disk as $$-Jn$$.
Then $$u'=u-(J/m)n$$ and $$v'=v+(J/m)n$$.
The restitution condition

$$
(u'-v')\cdot n=-(u-v)\cdot n
$$

implies $$J/m=(u-v)\cdot n$$, yielding the displayed formulas.
Here $$(u-v)\cdot n=\sqrt2$$, so

$$
\begin{aligned}
u'&=(1,0)-(1,1)=(0,-1),\\
v'&=(0,-1)+(1,1)=(1,0).
\end{aligned}
$$

Total momentum is $$m(1,-1)$$ before and after the impact.
Total kinetic energy is $$m$$ before and after it, because both speeds remain 1.

The younger center follows

$$
q_{\mathrm{young}}(t)=
\begin{cases}
(t,0),&t\leq0,\\
(0,-t),&0\leq t\leq2.
\end{cases}
$$

The older center follows

$$
q_{\mathrm{old}}(t)=
\begin{cases}
(1,1-t),&-2\leq t\leq0,\\
(1+t,1),&t\geq0.
\end{cases}
$$

The endpoint and velocity matching conditions are exactly the stipulated wormhole rule:

$$
\begin{aligned}
(q_{\mathrm{young}}(2),\dot q_{\mathrm{young}}(2^-))
&=((0,-2),(0,-1)),\\
(q_{\mathrm{old}}(-2),\dot q_{\mathrm{old}}(-2^+))
&=((1,3),(0,-1)).
\end{aligned}
$$

There is no hidden extra collision.
For $$-2\leq t\leq2$$, when both versions exist, the distance between their centers is

$$
\lVert q_{\mathrm{old}}(t)-q_{\mathrm{young}}(t)\rVert
=\sqrt2(1+|t|).
$$

It equals the sum of the radii only at $$t=0$$ and is strictly larger otherwise.
The two versions approach before the collision and separate afterward.
This verifies the entire proposed trajectory within the idealized model.

</details>

Notice that for this same incoming trajectory $$q_{\mathrm{young}}(t)=(t,0)$$ ($$t\leq0$$), a second self-consistent history also exists: nothing emerges from $$A$$, the disk rolls straight along the $$x$$-axis forever, and it never enters $$B$$.
Thus this simple planar geometry already exhibits **nonuniqueness**: specifying the initial state in the distant past does not uniquely determine whether the self-collision loop occurs or not.

## Breathing, butterfly effects, and agency

What about our opening puzzle—the traveler whose breathing disturbs the air molecules in the past?
In a self-consistent spacetime, those disturbed air molecules are not a “change” to a pre-existing history; they are part of the single fixed-point solution $$x=F(x)$$.
Novikov's principle draws no distinction between tiny perturbations (like displaced air molecules) and macroscopic actions (like warning someone of a fire): every interaction in the past is permitted so long as the global history closes consistently.

Nor does chaos or the butterfly effect prevent self-consistent loops.
High sensitivity to initial conditions means that the return map $$F$$ stretches small differences, which actually makes fixed points $$x=F(x)$$ *more* plentiful rather than scarce.

Within a self-consistent loop, actions still carry their ordinary causal force: in our billiard-ball loop, the older ball's impact is what causes the younger ball to turn downward into the wormhole, and a time traveler's warning can be the exact cause that saves someone's life.
What Novikov's principle rules out is only a history that undermines its own boundary conditions.

## Who wrote the proof? (Bootstrap paradoxes)

Suppose your older self emerges from a wormhole and hands you a notebook containing a sleek proof of a difficult theorem.
You verify every step, copy it onto a fresh pad of paper when the old notebook wears out, and years later step into the wormhole to hand that fresh copy to your younger self.
You learned the proof from the notebook, and your older self had the notebook only because you kept it.
Who discovered the proof?

This is an **ontological (or information) bootstrap loop**: every link in the chain of transmission has an immediate local explanation, yet the information content has no point of origin.

Our fixed-point equation $$x=F(x)$$ shows immediately why bootstrap loops arise.
Encode the text in the notebook as an $$n$$-bit string $$x\in\{0,1\}^n$$.
If the traveler simply copies the notebook faithfully from arrival to departure, the return map is the identity:

$$
F(x)=x,\qquad x\in\{0,1\}^n.
$$

Every one of the $$2^n$$ possible bit strings is a fixed point!
A valid proof, a grocery list, and random gibberish all satisfy $$x=F(x)$$ equally well.
**Because the copying dynamics act as the identity map on content, self-consistency alone does not select which string $$x$$ circulates around the loop.**

As philosopher David Lewis observed in [*The Paradoxes of Time Travel* (1976), pp. 148–149](https://pages.jh.edu/rrynasi1/spacetime/eprints/Lewis_David1976TheParadoxesOfTimeTravel.pdf#page=5), a closed causal loop is simply the time-like analog of a familiar philosophical question about the universe as a whole: every event inside the loop is caused by the preceding event, even if the loop as a whole has no external author.
Note too that logical justification is independent of historical authorship: once you verify each step of the proof in the notebook, you know the theorem is true, even though the proof was never “invented” by anyone.

## Self-consistency in science fiction

Science fiction and general relativity have traded ideas back and forth for decades: Carl Sagan's novel *Contact* prompted Kip Thorne's work on traversable wormholes, and Thorne's papers on billiard-ball time machines directly inspired Ted Chiang's novella *The Merchant and the Alchemist's Gate* ([as Chiang recounts in a 2019 interview](https://www.manifold1.com/episodes/ted-chiang-on-free-will-time-travel-many-worlds-genetic-engineering-and-hard-science-fiction-19/transcript)).

Several classic stories explore what a single self-consistent timeline feels like from the inside:

| Work | Role of self-consistency |
| --- | --- |
| *La Jetée* and *Twelve Monkeys* | A childhood memory of an airport turns out to be the protagonist's own future; attempts to prevent the catastrophe are already woven into how it unfolded ([production notes](https://www.gilliamdreams.com/12-monkeys-prod)). |
| *“—All You Zombies—”* and *Predestination* | Robert Heinlein's story ([adapted as *Predestination*](https://www.sonypictures.com/movies/predestination)) turns the bootstrap loop into a biological loop where the protagonist is their own mother, father, and recruiter. |
| *Los cronocrímenes* (*Timecrimes*) | Seeing a bandaged figure in the woods drives the protagonist to recreate the exact sequence of events he witnessed from the outside ([synopsis](https://magpictures.com/profile.aspx?id=c249edca-6e66-4d7d-b085-f7bac8cb827d)). |
| *Dark* | Generations of families in Winden are linked by interlocking bootstrap loops of objects, books, and parentage across 33-year cycles ([series page](https://www.netflix.com/title/80100172)). |
| *The Merchant and the Alchemist's Gate* | Ted Chiang uses Novikov-consistent time gates in medieval Baghdad and Cairo to show that even when the past cannot be altered, visiting it can transform understanding, grief, and forgiveness. |

Notice the parallel with epistemic puzzles like the [forty cheating husbands](/fun-stuff/logics/forty-cheating-husbands.html): in a self-consistent timeline, the external facts of the past never change, yet the traveler's *knowledge* of how those facts fit together changes completely.

## Must causal loops be consistent—or absent?

Novikov's self-consistency principle answers a conditional question: **if** spacetime contains closed timelike curves, how do local physical laws fit together globally?
Stephen Hawking's [chronology protection conjecture (1992)](https://doi.org/10.1103/PhysRevD.46.603) attacks the antecedent instead, arguing that quantum field fluctuations and their gravitational backreaction diverge at the threshold (Cauchy horizon) where closed timelike curves would first form, preventing any macroscopic time machine from being built.

Until quantum gravity settles whether closed timelike curves can exist, Novikov's principle resolves the logical puzzle of time travel: visiting the past does not require walking on eggshells to avoid disturbing a prior timeline, because your footsteps and breath were already part of the only past that ever happened.

## Further reading

- David Lewis (1976), [*The Paradoxes of Time Travel*](https://pages.jh.edu/rrynasi1/spacetime/eprints/Lewis_David1976TheParadoxesOfTimeTravel.pdf). Causal loops, information bootstrap paradoxes, and personal versus external time.
- Michael S. Morris and Kip S. Thorne (1988), [*Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity*](https://doi.org/10.1119/1.15620). Traversable wormholes and their origin in Carl Sagan's *Contact*.
- Michael S. Morris, Kip S. Thorne, and Ulvi Yurtsever (1988), [*Wormholes, Time Machines, and the Weak Energy Condition*](https://doi.org/10.1103/PhysRevLett.61.1446). How differential aging of wormhole mouths creates closed timelike curves.
- Igor D. Novikov (1989), [*An analysis of the operation of a time machine*](https://www.jetp.ras.ru/cgi-bin/dn/e_068_03_0439.pdf). Early formulation of the self-consistency principle.
- John Friedman et al. (1990), [*Cauchy problem in spacetimes with closed timelike curves*](https://doi.org/10.1103/PhysRevD.42.1915). The global self-consistency principle for fields and particles.
- Fernando Echeverria, Gunnar Klinkhammer, and Kip S. Thorne (1991), [*Billiard balls in wormhole spacetimes with closed timelike curves: Classical theory*](https://doi.org/10.1103/PhysRevD.44.1077). Self-consistent glancing collisions and multiplicity of solutions.
- Stephen W. Hawking (1992), [*Chronology protection conjecture*](https://doi.org/10.1103/PhysRevD.46.603). Quantum backreaction as a barrier to forming closed timelike curves.
