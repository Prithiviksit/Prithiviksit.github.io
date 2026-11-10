---
layout: fun-article
title: "Norton's Dome: Can Newton's Laws Leave the Future Open?"
description: "Norton's dome, the objections from Davies, Malament, and Fletcher, and what Newton's first law contributes to the question of determinism."
group: Physics
subtitle: "A particle at rest, a singular summit, and the gap between satisfying an equation and specifying a physical theory."
lead: "Put a particle exactly at the top of a frictionless dome. With no push, can it wait for a minute and then slide away? One surprisingly simple equation says yes."
permalink: /fun-stuff/physics/nortons-dome.html
date: 2026-11-06T23:20:12-07:00
published: true
---


Textbook Newtonian mechanics looks like the archetype of determinism: specify every particle's initial position and velocity along with the forces acting on it, and Newton's second law fixes a unique trajectory for all future time.
In 2003, philosopher of science John D. Norton introduced a strikingly simple counterexample—a frictionless dome on which a point particle sitting motionless at the apex can remain at rest forever or spontaneously slide off at any time $$T\geq0$$ in any radial direction, while obeying $$F=ma$$ at every instant.

Evaluating what Norton's dome actually shows requires separating three questions:

1. **Does the delayed slide solve the equation of motion?** (Yes—it is a smooth $$C^3$$ solution.)
2. **Where does the nonuniqueness come from geometrically and dynamically?** (From the failure of local Lipschitz continuity and unbounded curvature at the apex, as analyzed by [David Malament](https://sites.socsci.uci.edu/~dmalamen/bio/papers/NortonDome.pdf), [Samuel Fletcher](https://philsci-archive.pitt.edu/8833/4/dome_100711.pdf), and [Gruff Davies](https://blog.gruffdavies.com/2017/12/24/newtonian-physics-is-deterministic-sorry-norton/).)
3. **Does $$F=ma$$ exhaust the content of Newton's laws, or does Newton's first law independently rule out spontaneous departure from a force-free equilibrium?**

## Norton's original argument

In [Norton's setup](https://sites.pitt.edu/~jdnorton/Goodies/Dome/), a point mass $$m$$ rests without friction on a rigid, rotationally symmetric dome in a uniform downward gravitational field $$g$$.
Let $$r$$ measure arc length **along the surface** from the apex and $$h$$ measure the vertical drop below the apex:

$$
h(r)=\frac{2k}{3g}r^{3/2},\qquad k>0,
$$

where the dimensional constant $$k$$ has units of $$\text{length}^{1/2}/\text{time}^2$$ (Norton sets $$k=1$$ by choosing units).

<figure class="math-figure">
  <img src="/img/others/nortons-dome.svg" width="640" height="780" style="max-width: 640px; margin-inline: auto;" alt="A regenerated surface of revolution of Norton's dome, with a point particle at its apex. A meridional cross-section below distinguishes surface distance r, horizontal distance x, and vertical drop h. The highlighted arc follows the actual dome profile rather than treating r as a horizontal coordinate.">
  <figcaption>The dome and a vertical cross-section, regenerated from its arc-length parametrization. The gold arc measures r; the dashed horizontal and vertical segments measure x and h. The dot represents a point particle, not a ball with a finite radius. The illustrated dome is truncated before its profile becomes vertical.</figcaption>
</figure>

Along any radial meridian, the downward tangent angle $$\theta$$ satisfies $$\sin\theta=dh/dr$$ because $$r$$ is arc length.
The tangential component of gravity therefore gives

$$
\begin{aligned}
F_{\parallel}&=mg\frac{dh}{dr}=mk\sqrt r,\\
\ddot r&=k\sqrt r.
\end{aligned}
$$

With initial condition $$r(0)=\dot r(0)=0$$, one obvious solution is permanent rest, $$r(t)=0$$.
Yet for every waiting time $$T\geq0$$, the family

$$
r(t)=
\begin{cases}
0,&t\leq T,\\
\displaystyle\frac{k^2}{144}(t-T)^4,&t>T
\end{cases}
$$

also satisfies $$\ddot r=k\sqrt r$$ at every instant $$t\geq0$$, including $$t=T$$!
The particle sits motionless at the apex until time $$T$$ and then slides down along an arbitrary radial direction—with no external push, no noise, and no rule assigning probabilities to different waiting times $$T$$ or directions.

<details markdown="1">
<summary>Check the trajectory at the joining time</summary>

For $$t>T$$,

$$
\begin{aligned}
\dot r(t)&=\frac{k^2}{36}(t-T)^3,\\
\ddot r(t)&=\frac{k^2}{12}(t-T)^2
=k\sqrt{r(t)}.
\end{aligned}
$$

Both derivatives approach zero at $$T$$ and match the stationary branch.
The second derivative also exists at $$T$$ itself and is zero.
Thus the equation holds there as well.
There is no jump in velocity, no impulse, and no instant with positive acceleration but zero tangential force.

The trajectory is $$C^3$$, meaning that its first three derivatives exist and are continuous.
Its fourth derivative does not exist at $$T$$: the one-sided values are zero and $$k^2/6$$.
A classical solution of this second-order equation needs two derivatives, not four.

</details>

Notice how this differs from an ordinary unstable equilibrium, such as a ball balanced on top of a spherical hill.
On a sphere, tiny perturbations grow exponentially, yet the *exact* initial state $$r(0)=\dot r(0)=0$$ has only one solution: permanent rest.
On Norton's dome, the exact initial state $$r(0)=\dot r(0)=0$$ itself branches into infinitely many solutions.

## Davies's objections: the outer rim and the apex

In a widely read critique, [Gruff Davies](https://blog.gruffdavies.com/2017/12/24/newtonian-physics-is-deterministic-sorry-norton/) raises two objections to the dome: first, that the profile $$h(r)\propto r^{3/2}$$ becomes unphysical at large $$r$$; second, that the non-Lipschitz singularity at $$r=0$$ is a mathematical technicality shared with ordinary smooth domes.
Let us examine each in turn.

### Truncating the dome before its rim turns vertical

Because $$r$$ measures arc length along the surface, Euclidean geometry requires $$|dh/dr|=|\sin\theta|\leq1$$, which bounds how far the dome can extend:

$$
\frac{k\sqrt r}{g}\leq1,
\qquad
r\leq\frac{g^2}{k^2}.
$$

At $$r=g^2/k^2$$, the dome wall becomes vertical ($$\theta=\pi/2$$); beyond that radius, a real surface cannot satisfy $$dh/dr=k\sqrt r/g$$ because vertical drop cannot grow faster than arc length.

Truncating the dome at any finite rim strictly inside $$g^2/k^2$$ eliminates that global issue completely while leaving the nonuniqueness at the apex untouched: every delayed solution $$r(t)$$ still exists on a positive time interval after $$t=T$$ inside an arbitrarily small neighborhood of $$r=0$$.

### Why local Lipschitz continuity fails at the apex

By the Picard–Lindelöf theorem, an initial-value problem $$\ddot r=f(r)$$ has a unique local solution whenever $$f$$ is **locally Lipschitz continuous**—meaning that near each point there is a finite constant $$L$$ such that

$$
|f(r_1)-f(r_2)|\leq L|r_1-r_2|.
$$

For Norton's dome, $$f(r)=k\sqrt r$$, and the difference quotient at $$r=0$$ blows up:

$$
\frac{|k\sqrt r-k\sqrt0|}{|r-0|}
=\frac{k}{\sqrt r}\longrightarrow\infty.
$$

Thus the tangential force $$mk\sqrt r$$ is continuous at the apex (and equals zero there), and locally Lipschitz at every $$r>0$$, yet fails to be locally Lipschitz at $$r=0$$.
As [Samuel Fletcher (2012, §2.1, §3.1)](https://philsci-archive.pitt.edu/8833/4/dome_100711.pdf) emphasizes, local Lipschitz continuity of the force field is a sufficient condition for uniqueness, and its failure right at $$r=0$$ is what opens the door to multiple trajectories emerging from rest.

## Malament's $$C^1$$ vs. $$C^2$$ distinction

[David Malament (2008, §§4–5)](https://sites.socsci.uci.edu/~dmalamen/bio/papers/NortonDome.pdf) traces this failure of Lipschitz continuity directly to the dome's surface geometry: at the apex, the dome is $$C^1$$ (smooth tangent plane) but **not $$C^2$$** (infinite curvature).
Differentiating the profile gives

$$
h'(r)=\frac{k}{g}\sqrt r,
\qquad
h''(r)=\frac{k}{2g\sqrt r}\quad(r>0).
$$

Because $$h'(0)=0$$, the apex has a horizontal tangent plane rather than a sharp cone point; because $$h''(r)\to\infty$$ as $$r\downarrow0$$, the curvature diverges there.
On any surface whose profile $$h(r)$$ is $$C^2$$ near the apex, the tangential force $$mg\,h'(r)$$ is $$C^1$$ and therefore locally Lipschitz, guaranteeing a unique solution.

Keep the smoothness of the **surface** distinct from the smoothness of the **trajectory**:

- The **dome surface** $$h(r)\propto r^{3/2}$$ is $$C^1$$ but not $$C^2$$ at $$r=0$$.
- The **departing trajectory** $$r(t)\propto(t-T)^4$$ is $$C^3$$ (continuous position, velocity, acceleration, and jerk) at $$t=T$$.

Compare this with an ordinary $$C^2$$ hilltop, where $$h(r)\approx -\omega^2 r^2/(2g)$$ and the linearized equation of motion is $$\ddot r=\omega^2 r$$.
There, a particle approaching the summit along the time-reversed trajectory $$r(t)=Ae^{-\omega t}$$ takes **infinite** time ($$t\to\infty$$) to come to rest at the top; running the movie backward never produces a finite-time departure from rest.
Norton's $$r^{3/2}$$ profile is special precisely because a particle sliding *up* the dome with just the right energy reaches the apex and comes to a complete stop in **finite** time—and the departing solution is simply the time reversal of that finite-time arrival.

## What is pathological about the apex?

A rigid dome can push outward on the particle (normal force $$N\geq0$$), but cannot glue the particle down if it moves too fast to stay on the curve.
[Malament (§§5–6)](https://sites.socsci.uci.edu/~dmalamen/bio/papers/NortonDome.pdf) uncovered a striking physical symptom of the infinite curvature at $$r=0$$: **if the particle is given any nonzero initial velocity $$\dot r(0)>0$$ at the apex, it flies off the surface instantaneously!**
Only because the delayed slide starts from $$\dot r(T)=0$$ and accelerates gradually ($$v^2\propto r^{3/2}$$) does it remain in contact with the dome on $$0\leq r<3g^2/(5k^2)$$.

<details markdown="1">
<summary>Calculate curvature, support force, and loss of contact</summary>

Let $$x(r)$$ be horizontal distance from the axis in a meridional cross-section.
Because $$r$$ is arc length,

$$
\begin{aligned}
x'(r)&=\sqrt{1-\frac{k^2r}{g^2}},\\
x(r)&=\frac{2g^2}{3k^2}
\left[1-\left(1-\frac{k^2r}{g^2}\right)^{3/2}\right].
\end{aligned}
$$

These equations, together with $$h(r)$$, generate the figure above.
In particular, plotting $$h$$ directly against $$r$$ as if $$r$$ were horizontal would give the wrong shape.

The downward tangent angle satisfies $$\sin\theta=k\sqrt r/g$$.
The meridional curvature is therefore

$$
\kappa(r)=\frac{d\theta}{dr}
=\frac{k}{2g\sqrt r\sqrt{1-k^2r/g^2}}.
$$

It diverges as $$r\downarrow0$$.
For radial speed $$v=\dot r$$ and outward normal reaction $$N$$, inward force balance gives

$$
\begin{aligned}
mg\cos\theta-N&=m\kappa v^2,\\
\frac Nm&=g\sqrt{1-\frac{k^2r}{g^2}}
-\frac{kv^2}{2g\sqrt r\sqrt{1-k^2r/g^2}}.
\end{aligned}
$$

Thus, for $$r>0$$, nonnegative support requires

$$
v^2\leq\frac{2g^2}{k}\sqrt r
\left(1-\frac{k^2r}{g^2}\right).
$$

The right side tends to zero at the apex.
A finite nonzero launch speed cannot satisfy this bound arbitrarily close to it.

But Norton's departing branch has

$$
v^2=\frac{4k}{3}r^{3/2}.
$$

Substituting yields

$$
\frac Nm
=\frac{g\left(1-\dfrac{5k^2r}{3g^2}\right)}
{\sqrt{1-k^2r/g^2}}.
$$

The reaction tends to $$mg$$ at departure and is positive for $$0<r<3g^2/(5k^2)$$.
There is no infinite reaction along this trajectory.
If the dome extends that far, the departing particle first loses contact at $$r=3g^2/(5k^2)$$, before the geometrical endpoint.
Choosing an earlier rim leaves the entire illustrated slide in contact.

</details>

## Sliding on the dome vs. sitting on a golf tee

Because every positive launch speed $$\dot r(0)>0$$ detaches immediately into free flight, [Malament (§7)](https://sites.socsci.uci.edu/~dmalamen/bio/papers/NortonDome.pdf) contrasts two ways of viewing the state $$r(0)=\dot r(0)=0$$:

| | Sliding-on-the-dome model | Golf-tee (free-flight limit) model |
| --- | --- | --- |
| Starting description | Constrained surface slide while $$N\geq0$$. | Horizontal launch from the summit into ballistic free flight. |
| Governing equation | $$\ddot r=k\sqrt r$$ (with $$N\geq0$$). | Free flight $$\ddot x=0,\ \ddot y=-g$$ for $$v_0>0$$. |
| Apex with $$v_0>0$$ | Immediate loss of contact ($$N<0$$). | Unique parabolic trajectory above the dome. |
| Apex with $$v_0=0$$ | Admits both $$r(t)=0$$ and the delayed slides. | Limit as $$v_0\downarrow0$$ selects permanent rest. |

Both models are internally consistent: along Norton's delayed slide, $$N>0$$ holds on $$0\leq r<3g^2/(5k^2)$$, so the dome's normal force genuinely guides the particle along the surface; conversely, for any $$v_0>0$$, the particle leaves the surface immediately and follows a unique parabola.
The clash at $$v_0=0$$ shows that the apex sits on a singular boundary where the constrained sliding family and the positive-speed launch family do not join continuously.

## What does Newton's first law add?

Even granting that the delayed slide satisfies $$F=ma$$ at every instant, a deeper question remains: **what about Newton's first law?**
At the apex, net force is zero and the particle is at rest.
Does the law of inertia independently require the particle to *stay* at rest until an external change disturbs it?

[Henrik Zinkernagel (2010, §§2–3)](https://philsci-archive.pitt.edu/4690/1/CausalFundam.pdf) argues that it does: if Newton's first law is more than a redundant special case of $$F=ma$$ at $$F=0$$, it asserts a causal principle—a body in a force-free state of rest remains at rest unless an independent cause initiates a change.
To see what is at stake, distinguish two readings of inertia:

1. **Instantaneous reading (built into $$F=ma$$):** Whenever $$F(t)=0$$ throughout an interval, velocity $$\dot r(t)$$ is constant on that interval.
2. **Causal-initiation reading:** A particle sitting at a force-free equilibrium point ($$F(r_0)=0,\ \dot r=0$$) cannot leave $$r_0$$ unless an external force or time-dependent change in the environment initiates the motion.

Norton's delayed trajectory satisfies the instantaneous reading effortlessly: for $$t\leq T$$, both $$F$$ and $$\ddot r$$ are zero; for every $$t>T$$, the particle has already moved to $$r(t)>0$$, where $$F(r(t))=mk\sqrt{r(t)}>0$$ matches $$m\ddot r(t)>0$$.
As [Norton points out](https://sites.pitt.edu/~jdnorton/Goodies/Dome/), $$t=T$$ is the **last instant of rest**, not a “first instant of motion”—because the open interval $$(T,\infty)$$ has no earliest instant, there is never a moment where the particle is still at $$r=0$$ while experiencing $$\ddot r>0$$.

### Poisson (1806), Fletcher, and time-reversal symmetry

As [Fletcher (2012, §3.2)](https://philsci-archive.pitt.edu/8833/4/dome_100711.pdf) notes, this exact debate goes back to Siméon Denis Poisson in 1806, who studied non-Lipschitz differential equations of the same form and invoked the law of inertia to select permanent rest when velocity and force vanish together.

To test the causal-initiation reading, compare the autonomous dome force $$F(r)=mk\sqrt r$$ with an explicitly time-dependent external force that turns on smoothly at $$t=0$$:

$$
\frac{F(t)}m=
\begin{cases}
0,&t\leq0,\\
\alpha t^2,&t>0,
\end{cases}
\qquad \alpha>0,
$$

which drives a particle from rest at $$x(0)=\dot x(0)=0$$ along the unique trajectory

$$
x(t)=
\begin{cases}
0,&t\leq0,\\
\displaystyle\frac{\alpha t^4}{12},&t>0.
\end{cases}
$$

Here too $$F(0)=\ddot x(0)=0$$ with no “first instant of nonzero force,” yet the motion for $$t>0$$ is completely deterministic because the external force $$F(t)$$ is prescribed as a function of time.
On Norton's dome, by contrast, the force law $$F(r)=mk\sqrt r$$ is **time-independent**: nothing in the environment changes at $$t=T$$, and the force grows only *because* the particle has already left $$r=0$$.

Adopting the causal-initiation rule—that a particle cannot leave a time-independent force-free equilibrium $$F(r_0)=0$$ from rest—cleanly rules out Norton's delayed slides while permitting smoothly turned-on external forces $$F(t)$$.
It carries a striking physical consequence of its own, however: **it breaks time-reversal symmetry.**
Everyone agrees that a particle launched upward from the side of the dome with the critical energy $$E=0$$ reaches the apex in finite time $$T$$ and comes to rest there forever; forbidding the time-reversed history means the admissible trajectories of a conservative Newtonian system are no longer closed under $$t\mapsto -t$$.

## Three quick sanity checks

### 1. Energy is conserved along every delayed slide

Setting gravitational potential energy to zero at the apex and noting that $$\dot r$$ is the full speed along the surface, total mechanical energy is

$$
\begin{aligned}
E&=\frac12m\dot r^2-mgh(r)\\
&=\frac12m\dot r^2-\frac{2mk}{3}r^{3/2}.
\end{aligned}
$$

Along the departing branch, $$\dot r^2=(4k/3)r^{3/2}$$, so $$E=0$$ at every instant $$t>T$$, matching $$E=0$$ at rest.
(Note that because $$r$$ is arc length along the surface, $$\frac12 m\dot r^2=\frac12 m(\dot x^2+\dot h^2)$$ already includes both horizontal and vertical kinetic energy.)

### 2. The join at $$t=T$$ involves no hidden impulse

At $$t=T$$, position $$r$$, velocity $$\dot r$$, acceleration $$\ddot r$$, and the third derivative (jerk) are all continuous and equal to zero; only the fourth derivative (snap) jumps from $$0$$ to $$k^2/6$$.
Because Newton's second law is a second-order differential equation, a $$C^3$$ trajectory satisfies it classically at every point without any hidden impulse at $$t=T$$.

### 3. Non-Lipschitz forces without a contact surface

The same $$\sqrt r$$ nonuniqueness can be constructed without a rigid surface at all: [Fletcher (§3.4)](https://philsci-archive.pitt.edu/8833/4/dome_100711.pdf) exhibits a spherically symmetric charge distribution with density $$\rho(r)\propto r^{-1/2}$$ (integrable at the origin) whose outward electrostatic field obeys $$E_r(r)\propto\sqrt r$$, yielding $$\ddot r=k\sqrt r$$ in three-dimensional space.

## What the dome teaches us

Norton's dome shows that **“Newtonian mechanics is deterministic” is not a theorem that follows from $$F=ma$$ alone.**
Making a Newtonian theory deterministic requires specifying at least one additional commitment beyond the second-law differential equation:

- **Geometric/dynamical regularity (Malament, Fletcher):** Require constraint surfaces to be $$C^2$$ and force fields to be locally Lipschitz, ruling out the $$r^{3/2}$$ apex as an inadmissible idealization; or
- **Causal inertia (Poisson, Zinkernagel):** Treat Newton's first law as an independent selection rule that forbids leaving a time-independent force-free equilibrium from rest, at the cost of breaking time-reversal invariance at non-Lipschitz equilibria.

Either way, the dome forces into the open the background assumptions—about smoothness, contact boundaries, or causal initiation—that ordinary textbook problems quietly take for granted.

## Sources and further reading

- John D. Norton, [*The Dome: A Simple Violation of Determinism in Newtonian Mechanics*](https://sites.pitt.edu/~jdnorton/Goodies/Dome/). The original accessible presentation, based on his 2003 paper *Causation as Folk Science*.
- John D. Norton (2008), [*The Dome: An Unexpectedly Simple Failure of Determinism*](https://sites.pitt.edu/~jdnorton/papers/DomePSA2006_short.pdf), *Philosophy of Science* 75: 786–798.
- David B. Malament (2008), [*Norton's Slippery Slope*](https://sites.socsci.uci.edu/~dmalamen/bio/papers/NortonDome.pdf), *Philosophy of Science* 75: 799–816.
- Henrik Zinkernagel (2010), [*Causal Fundamentalism in Physics*](https://philsci-archive.pitt.edu/4690/1/CausalFundam.pdf), in *EPSA Philosophical Issues in the Sciences*, pp. 311–322.
- Samuel C. Fletcher (2012), [*What Counts as a Newtonian System? The View from Norton's Dome*](https://philsci-archive.pitt.edu/8833/4/dome_100711.pdf), *European Journal for Philosophy of Science* 2: 275–297.
- Gruff Davies (2017, updated 2020), [*Newtonian physics IS deterministic (sorry Norton)*](https://blog.gruffdavies.com/2017/12/24/newtonian-physics-is-deterministic-sorry-norton/).
