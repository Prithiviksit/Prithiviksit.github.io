---
layout: fun-article
title: "Killing the Hydra: How Infinity Proves a Finite Game Must End"
description: "A creature that grows every time you attack it can always be defeated. Ordinals below epsilon-zero explain why, and Kirby–Paris show Peano arithmetic cannot."
group: Mathematics
subtitle: "From counting infinity to ordering infinity, and from a children's game to Gödel's incompleteness theorem."
lead: "A creature that becomes more complicated every time you attack it can nevertheless always be defeated. Proving this elementary fact requires mathematics that goes beyond ordinary arithmetic."
permalink: /fun-stuff/mathematics/killing-the-hydra.html
---

Hercules had already survived the Nemean Lion when King Eurystheus sent him to the swamps of Lerna. There he found the Hydra, a many-headed serpent, and did what any hero would do: he cut off a head. Two grew back.

The old story ends with a trick: Hercules's nephew Iolaus sears each stump with fire so that nothing can regrow. But suppose there is no fire, only a sword, and a monster that responds to every wound by becoming *more* complicated. Intuitively, such a creature should be unbeatable. Each victory is paid for with more heads than before.

In 1982 the logicians Laurie Kirby and Jeff Paris turned this scene into a precise mathematical game, and the surprising answer is that **Hercules always wins**. No matter which heads he cuts and no matter how fast the Hydra regrows, the fight ends in a finite number of moves. Explaining why takes us through different sizes of infinity and then to the edge of what ordinary arithmetic can prove.

## 1. The Hydra: a game you cannot lose

The mathematical Hydra is a **rooted tree**. The root is the Hydra's body, the leaves are its heads, and the other nodes are necks.

Each turn Hercules chops off one head (a leaf). Then the Hydra regrows according to the rule below. Let $$p$$ be the node the head was attached to, and $$g$$ the parent of $$p$$.

* If $$p$$ is the root, nothing regrows.
* Otherwise, take the part of the Hydra that now hangs from $$p$$ (with the head gone) and attach $$n$$ new copies of it to $$g$$. Here $$n$$ is the turn number, or any other number the Hydra picks.

Hercules wins when only the root remains. Here is one chop that makes the Hydra *bigger*. Take a Hydra that is a path of four nodes, and let $$n=3$$.

![A path R, A, B, L; chopping L leaves B and hangs three more copies of B from A]({{ '/img/others/hydra-chop.svg' | relative_url }})

Chopping $$L$$ leaves $$B$$ as a bare leaf. The Hydra then hangs three extra copies of $$B$$ from $$A$$. One chop took the Hydra from four nodes to six, and later chops will feed it far more.

> **Can Hercules always win, regardless of which heads he chooses to cut?**

## 2. Two kinds of infinity: how many vs. in what order?

**Cardinality** asks only how many. In Hilbert's hotel every room is full, yet a new guest can be housed by moving the guest in room $$k$$ to room $$k+1$$. The map $$k\mapsto 2k$$ likewise pairs every integer with an even integer. So the integers and the even integers have the same cardinality, $$\aleph_0$$, even though one is a proper part of the other.

Cardinality forgets structure. **Ordinality remembers it.** Consider three ways of lining up countably many things:

* $$\omega$$: $$0,1,2,3,\dots$$
* $$\omega+1$$: $$0,1,2,\dots$$ followed by one extra element sitting *after* all of them.
* $$\omega\cdot 2$$: $$0,1,2,\dots$$ followed by a *second* copy $$0',1',2',\dots$$

All three are countable, but no order-preserving bijection exists between any two of them. For instance, $$\omega+1$$ has a last element and $$\omega$$ does not. They are different ordinals.

The property we need is **well-ordering**. Every non-empty collection of ordinals has a least member. Equivalently, there is no infinite strictly decreasing sequence of ordinals. Hold on to that sentence, because the whole proof rests on it.

## 3. Arithmetic becomes strange at infinity

Ordinal addition means "put one line up after another," so it is not commutative:

$$
1+\omega=\omega,\qquad \omega+1>\omega.
$$

On the left, a single element placed *before* an infinite line gets absorbed. The result still looks like $$0,1,2,\dots$$ On the right, the extra element after the infinite line makes a new, longer order.

Multiplication and exponentiation work similarly, and each step produces a richer ordinal:

* $$\omega\cdot 2=\omega+\omega$$ and $$\omega\cdot 3=\omega+\omega+\omega$$.
* $$\omega^2=\omega\cdot\omega$$ is like infinitely many copies of $$\omega$$ in a row.
* $$\omega^\omega$$ is the limit of $$\omega,\ \omega^2,\ \omega^3,\dots$$
* $$\omega^{\omega^\omega}$$ and so on.

Continuing this tower forever gives a limit called

$$
\varepsilon_0=\sup\{\omega,\ \omega^\omega,\ \omega^{\omega^\omega},\dots\}.
$$

It is the smallest ordinal satisfying $$\omega^{\varepsilon}=\varepsilon$$. We do not need set-theoretic constructions. What matters is that every ordinal below $$\varepsilon_0$$ has a **finite description**: a finite sum of terms $$\omega^{\alpha_1}+\cdots+\omega^{\alpha_k}$$ with $$\alpha_1\ge\cdots\ge\alpha_k$$, where each $$\alpha_i$$ is again such an expression. This is the *Cantor normal form*, and ordinals below $$\varepsilon_0$$ are really finite trees in disguise. That fact is why they fit the Hydra so well.

## 4. Killing the Hydra with ordinals

Assign an ordinal to each node of the tree. A leaf gets $$0$$. An internal node $$v$$ with children carrying ordinals $$\alpha_1\ge\cdots\ge\alpha_k$$ gets

$$
o(v)=\omega^{\alpha_1}+\cdots+\omega^{\alpha_k}.
$$

The Hydra's ordinal is the ordinal of its root.

### The Hydra that grows while shrinking

Compute the ordinals of our four-node example:

* $$o(L)=0$$, so $$o(B)=\omega^0=1$$,
* $$o(A)=\omega^{1}=\omega$$,
* $$o(R)=\omega^{\omega}$$.

After the chop and regrowth, $$A$$ has four leaf children, each of ordinal $$0$$, and so

$$
o(A)=\omega^0+\omega^0+\omega^0+\omega^0=4,\qquad o(R)=\omega^{4}.
$$

Therefore

$$
\underbrace{\omega^\omega}_{\text{before, 4 nodes}}\;>\;\underbrace{\omega^{4}}_{\text{after, 6 nodes}}.
$$

The tree gained two nodes while its ordinal dropped from $$\omega^\omega$$ to $$\omega^4$$. Using $$n$$ copies instead of $$3$$ gives $$\omega^{n+1}$$, which is smaller than $$\omega^\omega$$ for every finite $$n$$, however large. The ordinal $$\omega$$ is bigger than every natural number, so no finite regrowth can catch up with it.

### The general argument

Suppose Hercules chops a head whose parent $$p$$ is not the root. Let $$g$$ be the parent of $$p$$ and write $$\gamma$$ for the ordinal of $$p$$ *after* the head is removed. Since the head contributed the smallest term $$\omega^0=1$$, before the chop $$o(p)=\gamma+1$$.

* **Before**, $$g$$ had a term $$\omega^{\gamma+1}$$ coming from $$p$$.
* **After**, $$p$$ and its $$n$$ copies each contribute $$\omega^{\gamma}$$, which together give $$\omega^\gamma\cdot(n+1)$$.

Because $$\omega^\gamma\cdot(n+1)<\omega^{\gamma}\cdot\omega=\omega^{\gamma+1}$$, one term has been replaced by a **strictly smaller** one. So $$o(g)$$ strictly decreases. Every ancestor of $$g$$ also strictly decreases, because $$\alpha\mapsto\omega^\alpha$$ and sums in Cantor normal form are strictly monotone in each term. If $$p$$ is the root, we simply delete a term $$1$$ from $$o(\text{root})$$, which is a decrease too.

So **every legal chop strictly decreases the ordinal**, whatever head Hercules picks and however large $$n$$ is. All these ordinals lie below $$\varepsilon_0$$, which is well-ordered. An infinite battle would produce an infinite strictly decreasing sequence of ordinals, and none exists. **The battle must end.** This solves the initial mystery.

> **The lesson.** Heads count how big the Hydra *looks*. The ordinal measures how far the Hydra is from *dying*, and Hercules always moves it closer.

## 5. A finite game that arithmetic cannot prove will end

**Mathematical induction** says that if a property holds for $$0$$ and passes from $$n$$ to $$n+1$$, then it holds for every natural number. **Peano arithmetic** (PA) is the standard first-order theory of $$0$$, successor, $$+$$, $$\times$$ and this induction schema. Nearly all of everyday number theory is provable in it.

Our Hydra proof used a stronger tool: **transfinite induction up to $$\varepsilon_0$$**, meaning induction along a well-ordering far longer than $$\omega$$. Is that extra strength really needed? In 1982, Kirby and Paris proved that it is:

> **Theorem (Kirby–Paris, 1982).** The statement "every Hydra battle terminates" is true, but it is not provable in PA, assuming PA is consistent.

The "assuming consistent" matters. An inconsistent theory proves everything, so the unprovability claim only makes sense for a consistent PA. This is a different kind of theorem from Gödel's. Gödel's sentence is a self-referential construction made to be unprovable. The Hydra statement is a *natural* combinatorial claim about trees and chopping that happens to be out of PA's reach.

The role of $$\varepsilon_0$$ is exact. PA can prove "there is no infinite descending sequence" for every ordinal *below* $$\varepsilon_0$$, one at a time, but not for $$\varepsilon_0$$ itself. This connects to **Gentzen's 1936 theorem**: the consistency of PA can be proved by transfinite induction up to $$\varepsilon_0$$ on top of a very weak base theory. Together with Gödel's second incompleteness theorem (a consistent PA cannot prove its own consistency), this shows that $$\varepsilon_0$$ is precisely the *proof-theoretic ordinal* of PA. It is the point where PA's strength runs out.

### Three levels of claim

It is easy to blur these, so keep them separate.

| Claim | Status |
|---|---|
| Every *particular* finite Hydra battle (with a fixed starting tree and strategy) terminates | True. The finished battle is a finite computation that can be checked by finite arithmetic. |
| Every Hydra battle terminates, *universally* | True, proved using well-ordering up to $$\varepsilon_0$$. |
| PA proves the universal termination theorem | False, by Kirby–Paris, assuming PA is consistent. |

Checking one completed battle is very different from proving that *all* battles eventually complete. For a given Hydra, PA can often prove termination, but no single PA proof covers every Hydra. The battles can also be astronomically long. The number of turns needed grows faster than any function PA can prove total.

### A short detour: Goodstein sequences

The Hydra is not an isolated trick. **Goodstein's theorem** is another example, and it uses nothing beyond natural-number arithmetic. Write $$n$$ in hereditary base-2 notation, change every $$2$$ to a $$3$$, subtract $$1$$, then rewrite in hereditary base 3, change every $$3$$ to a $$4$$, subtract $$1$$, and so on. The numbers explode, yet the sequence always reaches $$0$$. The proof replaces the base by $$\omega$$ and watches an ordinal below $$\varepsilon_0$$ strictly decrease. It is the same mechanism as the Hydra's, and Kirby and Paris showed that Goodstein's theorem is also unprovable in PA.

## 6. Epilogue: how much infinity is hidden in finite mathematics?

Looking back, the story had three surprises, each deeper than the last:

1. **Infinity is not just about size.** Cardinal numbers measure *how many* objects there are; ordinal numbers capture *how they are well-ordered*.
2. **A growing Hydra can be getting smaller.** Its number of heads may increase while an associated ordinal strictly decreases.
3. **A statement about entirely finite objects can transcend Peano arithmetic.** Kirby and Paris proved that the general Hydra termination theorem cannot be established within PA.

The third point needs careful wording. It is *not* correct to say that no proof without transfinite numbers exists. The precise result is that PA cannot prove the termination theorem. That is a statement about the **strength of a formal system**, not about which symbols a proof must contain.

Now return to the opening paradox. Every Hydra is finite. Every move is finite. Every fight, as we have shown, eventually ends. Yet the *universal* statement about all these finite fights requires proof-theoretic strength beyond PA.

Mathematical **truth** and formal **provability** are different things. The Hydra theorem is true, and we have seen exactly why. But no fixed, consistent set of rules as strong as PA can prove every such truth. Strengthening the rules to reach $$\varepsilon_0$$ settles the Hydra, and then there are new unprovable statements waiting above it. The infinite hides inside the finite game, and the ordinals are how we can see it.

## References

* L. Kirby and J. Paris, [Accessible independence results for Peano arithmetic](https://doi.org/10.1112/blms/14.4.285), *Bulletin of the London Mathematical Society* 14 (1982), 285–293.
* Andrej Bauer, [The Hydra game](http://math.andrej.com/2008/02/02/the-hydra-game/).
* Pierre Castéran et al., [Hydra Battles](https://coq-community.org/hydra-battles/), a Coq formalization of ordinals, $$\varepsilon_0$$ and the termination proof.
* [Ordinal vs. cardinal](https://philosophy.stackexchange.com/), Philosophy Stack Exchange, for accessible motivation.
* G. Gentzen, *Die Widerspruchsfreiheit der reinen Zahlentheorie*, Mathematische Annalen 112 (1936).
