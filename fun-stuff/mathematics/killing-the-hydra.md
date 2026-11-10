---
layout: fun-article
title: "Killing the Hydra: How Infinity Proves a Finite Game Must End"
description: "A creature that grows every time you attack it can always be defeated. Ordinals below epsilon-zero explain why, and Kirby–Paris show Peano arithmetic cannot."
group: Mathematics
subtitle: "From counting infinity to ordering infinity, and from a children's game to Gödel's incompleteness theorem."
lead: "A creature that becomes more complicated every time you attack it can nevertheless always be defeated. Proving this elementary fact requires mathematics that goes beyond ordinary arithmetic."
permalink: /fun-stuff/mathematics/killing-the-hydra.html
date: 2026-10-10T23:33:52-06:00
published: true
---

Hercules had already survived the Nemean Lion when King Eurystheus sent him to the swamps of Lerna.
There he found the Hydra, a many-headed serpent, and did what any hero would do: he cut off a head.
Two grew back.

The myth ends with a trick: Hercules's nephew Iolaus sears each neck stump with a torch so nothing can regrow.
Suppose instead that there is no torch—only a sword—and a monster that responds to every cut by sprouting *more* copies of its severed necks.
At first glance, such a creature looks unbeatable: almost every strike leaves the Hydra larger than before.

In 1982, logicians Laurie Kirby and Jeff Paris turned this battle into a precise mathematical game and proved a remarkable pair of results: **Hercules always wins** in finitely many moves, no matter which heads he cuts or how fast the Hydra regrows—and yet **Peano arithmetic cannot prove that he wins**.
Following the proof takes us from countable ordinals below $$\varepsilon_0$$ to the exact boundary of first-order arithmetic.

## 1. The Hydra: a game you cannot lose

Model the Hydra as a finite **rooted tree**: the root is its body, the leaves are its heads, and the intermediate edges are its necks.

On turn $$n$$, Hercules chops off one head (a leaf).
Let $$p$$ be the node that head was attached to, and if $$p$$ is not the root, let $$g$$ be the parent of $$p$$:

* If $$p$$ is the root, nothing regrows.
* Otherwise, take the entire subtree now hanging from $$p$$ (with the chopped head removed) and attach $$n$$ brand-new copies of that subtree as children of $$g$$. (In fact, the Hydra can choose *any* finite number of copies $$n$$ on each turn.)

Hercules wins when the tree is reduced to a bare root.
Here is a single chop that makes the Hydra bigger—starting from a four-node path $$R$$, $$A$$, $$B$$, $$L$$ with $$n=3$$:

![A path R, A, B, L; chopping L leaves B and hangs three more copies of B from A]({{ '/img/others/hydra-chop.svg' | relative_url }})

Chopping the leaf $$L$$ leaves $$B$$ as a bare leaf, and the Hydra sprouts three extra copies of $$B$$ from $$A$$.
One chop has grown the Hydra from four nodes to six, and subsequent chops can trigger an explosion of branches.

> **Why must every Hydra battle end, regardless of which heads Hercules chooses to cut?**

## 2. Two kinds of infinity: how many vs. in what order?

**Cardinality** measures only size.
In Hilbert's hotel, every room is full, yet a new guest can be accommodated by shifting the guest in room $$k$$ to room $$k+1$$; likewise, the map $$k\mapsto 2k$$ pairs all natural numbers one-to-one with the even numbers, giving both sets cardinality $$\aleph_0$$.

**Ordinality** tracks order as well as size.
Compare three ways of lining up countably many elements:

* $$\omega$$: $$0,1,2,3,\dots$$
* $$\omega+1$$: $$0,1,2,\dots$$ followed by a single element sitting *after* all of them.
* $$\omega\cdot 2$$: $$0,1,2,\dots$$ followed by a second infinite copy $$0',1',2',\dots$$

All three sets have cardinality $$\aleph_0$$, yet no order-preserving bijection exists between any two of them (for instance, $$\omega+1$$ has a largest element while $$\omega$$ does not).
They represent distinct **ordinals**.

The defining feature of ordinals is **well-ordering**: every non-empty set of ordinals has a smallest element.
Equivalently, **there is no infinite strictly decreasing sequence of ordinals**.
Any process whose state is measured by an ordinal that strictly decreases at every step must terminate in finitely many steps.

## 3. Ordinal arithmetic up to $$\varepsilon_0$$

Ordinal addition places one ordered lineup after another, which makes it non-commutative:

$$
1+\omega=\omega,\qquad \omega+1>\omega.
$$

Placing one element *before* $$0,1,2,\dots$$ simply relabels the line, still order-isomorphic to $$\omega$$; placing one element *after* $$0,1,2,\dots$$ creates a genuinely longer order type.

Iterating addition gives multiplication, and iterating multiplication gives exponentiation:

* $$\omega\cdot 2=\omega+\omega$$ and $$\omega\cdot 3=\omega+\omega+\omega$$.
* $$\omega^2=\omega\cdot\omega$$: countably many copies of $$\omega$$ laid end to end.
* $$\omega^\omega$$: the supremum of $$\omega,\ \omega^2,\ \omega^3,\dots$$
* $$\omega^{\omega^\omega}$$, and higher power towers of $$\omega$$.

The supremum of all finite power towers of $$\omega$$ is denoted

$$
\varepsilon_0=\sup\{\omega,\ \omega^\omega,\ \omega^{\omega^\omega},\dots\},
$$

the smallest ordinal satisfying $$\omega^{\varepsilon}=\varepsilon$$.
Every ordinal below $$\varepsilon_0$$ can be written uniquely in **Cantor normal form** as a finite sum $$\omega^{\alpha_1}+\cdots+\omega^{\alpha_k}$$ with $$\alpha_1\ge\cdots\ge\alpha_k$$, where each exponent $$\alpha_i$$ is itself written in Cantor normal form, bottoming out at $$0$$.
In other words, ordinals below $$\varepsilon_0$$ correspond directly to finite rooted trees.

## 4. Killing the Hydra with ordinals

Label every node of the Hydra with an ordinal below $$\varepsilon_0$$ from the leaves down to the root:

* Every leaf gets $$0$$.
* An internal node $$v$$ whose children carry ordinals $$\alpha_1\ge\cdots\ge\alpha_k$$ gets

$$
o(v)=\omega^{\alpha_1}+\cdots+\omega^{\alpha_k}.
$$

The ordinal of the Hydra is the ordinal of its root.

### Watching the ordinal drop while the tree grows

In our four-node path $$R$$, $$A$$, $$B$$, $$L$$:

* $$o(L)=0$$, so $$o(B)=\omega^0=1$$,
* $$o(A)=\omega^{1}=\omega$$,
* $$o(R)=\omega^{\omega}$$.

After Hercules chops $$L$$ and the Hydra grows three new copies of $$B$$ on $$A$$, node $$A$$ has four leaf children (each of ordinal $$0$$), so

$$
o(A)=\omega^0+\omega^0+\omega^0+\omega^0=4,\qquad o(R)=\omega^{4}.
$$

Comparing before and after:

$$
\underbrace{\omega^\omega}_{\text{before, 4 nodes}}\;>\;\underbrace{\omega^{4}}_{\text{after, 6 nodes}}.
$$

The tree gained two nodes while its ordinal dropped from $$\omega^\omega$$ to $$\omega^4$$.
Using $$n$$ copies instead of $$3$$ gives $$\omega^{n+1}$$, which is smaller than $$\omega^\omega$$ for every finite $$n$$, however large.
Because $$\omega$$ exceeds every natural number, replacing an exponent $$\omega$$ with any finite number $$n+1$$ strictly lowers the ordinal.

### The general step

Suppose Hercules chops a head attached to a non-root node $$p$$ with parent $$g$$, and let $$\gamma$$ be the ordinal of $$p$$ *after* the head is removed.
Because the chopped leaf contributed $$\omega^0=1$$ to $$p$$, the ordinal of $$p$$ before the chop was $$o(p)=\gamma+1$$:

* **Before the chop**, $$p$$ contributed the term $$\omega^{\gamma+1}$$ to $$o(g)$$.
* **After the chop and regrowth**, $$p$$ and its $$n$$ new clones each have ordinal $$\gamma$$, contributing $$n+1$$ copies of $$\omega^\gamma$$ to $$o(g)$$—that is, $$\omega^\gamma\cdot(n+1)$$.

Because $$\omega^\gamma\cdot(n+1)<\omega^{\gamma}\cdot\omega=\omega^{\gamma+1}$$, the term $$\omega^{\gamma+1}$$ inside $$o(g)$$ has been replaced by a **strictly smaller** sum, so $$o(g)$$ strictly decreases.
Since $$\alpha\mapsto\omega^\alpha$$ is strictly increasing, the ordinal of every ancestor up to the root strictly decreases as well (and if $$p$$ is the root, $$o(\text{root})$$ simply loses a $$1$$).

Therefore, **every legal chop strictly decreases the Hydra's ordinal**.
Because the ordinals below $$\varepsilon_0$$ are well-ordered, no infinite decreasing sequence exists, and **every Hydra battle must terminate in finitely many moves**.

> **The takeaway:** The number of heads measures how large the Hydra *looks* on the current turn; the ordinal measures how many layers of nesting remain before the Hydra dies.

## 5. A finite game that Peano arithmetic cannot prove will end

Standard **Peano arithmetic** (PA) formalizes natural-number arithmetic using $$0$$, successor, $$+$$, $$\times$$, and first-order mathematical induction along $$\omega$$.
Our termination proof, however, relied on the well-ordering of $$\varepsilon_0$$—that is, **transfinite induction up to $$\varepsilon_0$$**.
Could a cleverer proof avoid $$\varepsilon_0$$ and stay entirely inside PA?
Kirby and Paris proved that the answer is no:

> **Theorem (Kirby–Paris, 1982).** Assuming PA is consistent, the statement “every Hydra battle terminates” (when the Hydra sprouts $$n$$ copies on turn $$n$$) is true but unprovable in PA.

Unlike Gödel's self-referential sentence—which is constructed specifically to talk about its own unprovability—the termination of the Hydra game is a concrete combinatorial theorem about finite trees.

The appearance of $$\varepsilon_0$$ is no coincidence.
In 1936, Gerhard Gentzen proved the consistency of PA by combining a weak finitary base theory with transfinite induction up to $$\varepsilon_0$$.
By Gödel's second incompleteness theorem, a consistent PA cannot prove its own consistency, which implies that PA can prove “there is no infinite descending sequence” for every individual ordinal *below* $$\varepsilon_0$$ (such as $$\omega^\omega$$ or $$\omega^{\omega^\omega}$$), but **cannot** prove the well-ordering of $$\varepsilon_0$$ as a whole.
Because the Hydra game can simulate descending chains starting at arbitrary heights below $$\varepsilon_0$$, proving that *every* Hydra battle terminates is strong enough to entail the consistency of PA—placing it just beyond PA's reach.

### Three distinct claims

| Claim | Status |
|---|---|
| Any *specific* Hydra battle (with a fixed starting tree and rule) terminates | Provable in PA: for a tree of fixed height, the ordinal starts below a fixed tower of $$\omega$$'s, whose well-ordering PA can prove. |
| *Every* Hydra battle terminates (quantifying over all starting trees of all heights) | True, proved via well-ordering up to $$\varepsilon_0$$. |
| PA proves the universal termination statement | False (assuming PA is consistent), by Kirby–Paris (1982). |

The same ordinal mechanism drives **Goodstein's theorem**: take any positive integer $$n$$, write it in hereditary base-2 notation, bump every $$2$$ to $$3$$ and subtract $$1$$, then rewrite in hereditary base 3, bump every $$3$$ to $$4$$ and subtract $$1$$, and so on.
Although the numbers skyrocket, replacing the current base with $$\omega$$ yields an ordinal below $$\varepsilon_0$$ that strictly decreases at every step, forcing the sequence to hit $$0$$—another purely arithmetic truth that Kirby and Paris showed is unprovable in PA.

## References

* L. Kirby and J. Paris, [Accessible independence results for Peano arithmetic](https://doi.org/10.1112/blms/14.4.285), *Bulletin of the London Mathematical Society* 14 (1982), 285–293.
* Andrej Bauer, [The Hydra game](http://math.andrej.com/2008/02/02/the-hydra-game/).
* Pierre Castéran et al., [Hydra Battles](https://coq-community.org/hydra-battles/), a Coq formalization of ordinals, $$\varepsilon_0$$, and the termination proof.
* G. Gentzen, *Die Widerspruchsfreiheit der reinen Zahlentheorie*, *Mathematische Annalen* 112 (1936).
