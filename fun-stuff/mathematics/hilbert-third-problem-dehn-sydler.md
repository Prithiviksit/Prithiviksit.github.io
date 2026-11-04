---
layout: fun-article
title: "Can You Cut a Tetrahedron into a Cube? Hilbert's Third Problem"
description: "Why equal volume is not enough to rearrange solids, and how the Dehn invariant and Sydler's theorem characterize scissors congruence."
group: Mathematics
permalink: /fun-stuff/mathematics/hilbert-third-problem-dehn-sydler.html
---

Imagine two solid objects made of the same amount of material. You are allowed to cut one into finitely many polyhedral pieces, then rotate and move the pieces—but not stretch, bend, or discard anything. Can you always reassemble them into the other?

In two dimensions, the answer is yes: **any two polygons with the same area can be cut into finitely many polygonal pieces and rearranged into one another.** This is the Wallace–Bolyai–Gerwien theorem. A triangle can become a rectangle; a square can become a triangle. A simple three-piece example shows how this works.

<figure class="math-figure">
  <img src="{{ '/img/others/triangle-rectangle-dissection.svg' | relative_url }}" alt="An isosceles triangle cut into a trapezoid and two small triangles, which rotate into a rectangle." loading="lazy">
  <figcaption>Cut the isosceles triangle halfway up, then split its top along the altitude. Rotate each small triangle 180° about the midpoint of the corresponding sloping side. The three pieces form a rectangle with the same base and half the height.</figcaption>
</figure>

It is tempting to expect the same of solids. After all, if two solids have equal volume, they contain the same amount of space. Yet in 1900, Hilbert made the failure of this intuition the subject of his **third problem**. Max Dehn solved it almost immediately: a cube and a regular tetrahedron of equal volume cannot be cut and reassembled into each other by finitely many straight cuts.

The remarkable part is what happened later. Dehn discovered an obstruction beyond volume. In a 1965 paper, **Jean-Pierre Sydler** proved that there are *no further obstructions*: volume and Dehn's invariant completely characterize when two polyhedra can be cut and rearranged into each other.

## 1. The rules of the game: scissors congruence

Two polyhedra are **scissors congruent** if we can partition one into finitely many polyhedra and rearrange those pieces by rigid motions to form the other. Pieces may be translated or rotated, but not scaled. Their interiors must not overlap.

Each dissection uses finitely many polyhedral pieces with flat faces.

Volume is obviously preserved:

$$
V(P)=\sum_i V(P_i)=V(Q).
$$

But is volume the **only** quantity that survives the operation?

In the plane it is. In three dimensions it is not. The reason comes from a feature polygons do not possess: **dihedral angles**—the angles between two faces meeting along an edge.

## 2. The hidden information in an edge

Think of a wedge-shaped block. Its geometry depends on two things: how long its edge is, and how widely its two faces open. The Dehn invariant records a particular combination of these lengths and angles.

For each edge $$e$$ of a polyhedron $$P$$, let

- $$\ell_e$$ be the edge's length;
- $$\theta_e$$ be its interior dihedral angle.

Informally, the Dehn invariant is the sum of **edge length multiplied by angle**, with a crucial twist: angles are considered *modulo rational multiples of* $$\pi$$.

Its compact mathematical definition is

$$
\boxed{D(P)=\sum_{e}\ell_e\otimes[\theta_e]
\quad\in\quad \mathbb R\otimes_{\mathbb Q}(\mathbb R/\pi\mathbb Q).}
$$

The tensor product encodes three bookkeeping rules:

1. We want to keep track of which edge lengths are paired with which angles.
2. The bookkeeping should be **additive** in both the length and the angle, with rational coefficients.
3. Every rational multiple of $$\pi$$ counts as zero in the angular bookkeeping.

This choice makes the invariant additive under cutting. When we cut a solid, new edges appear. Around an edge created inside the solid, the angles of all the pieces add to $$2\pi$$; at a cut through a face, they add to $$\pi$$. Such contributions should cancel when we add up the pieces' invariants. Working modulo rational multiples of $$\pi$$ makes precisely these artificial contributions disappear.

Thus the invariant obeys the key rule

$$
D(P)=\sum_i D(P_i).
$$

Rigidly moving pieces does not change their lengths or angles. Consequently, **scissors-congruent solids must have the same Dehn invariant**, just as they must have the same volume.

> The tensor product keeps lengths paired with angle classes. Reducing angles modulo rational multiples of $$\pi$$ is what makes the contributions from newly created edges cancel.

## 3. Why the cube and the tetrahedron differ

<figure class="math-figure">
  <img src="{{ '/img/others/cube-tetrahedron-obstruction.svg' | relative_url }}" alt="A cube and regular tetrahedron with equal volume but different Dehn invariants." loading="lazy">
  <figcaption>Equal volume, different Dehn invariants: the cube and regular tetrahedron cannot be reassembled into one another.</figcaption>
</figure>

Consider a cube with side length $$a$$. It has twelve edges, all with dihedral angle $$\pi/2$$. Because $$\pi/2$$ is a rational multiple of $$\pi$$, its angular contribution is zero. Hence

$$
D(\text{cube})=0.
$$

Now consider a regular tetrahedron with edge length $$b$$. It has six edges, each with the same dihedral angle

$$
\alpha=\arccos(1/3)\approx70.53^\circ.
$$

Its invariant is

$$
D(\text{tetrahedron})=6b\otimes[\alpha].
$$

<figure class="math-figure">
  <img src="{{ '/img/others/tetrahedron-dehn-invariant.svg' | relative_url }}" alt="Six equal edges contribute b tensor alpha each. A perpendicular cross-section shows the interior dihedral angle of 70.53 degrees." loading="lazy">
  <figcaption>A section perpendicular to an edge measures the angle between its two adjacent faces. Each of the six edges contributes the same tensor, so their contributions add.</figcaption>
</figure>

Unlike the cube's right angle, $$\alpha$$ is **not** a rational multiple of $$\pi$$. One way to see this is that a rational multiple of $$\pi$$ whose cosine is rational can have cosine only $$0,\pm 1/2,\pm1$$; here the cosine is $$1/3$$. Therefore $$[\alpha]\ne0$$, and the tetrahedron's Dehn invariant is nonzero.

We can choose $$a$$ and $$b$$ so the two solids have exactly the same volume:

$$
a^3=\frac{b^3}{6\sqrt2}.
$$

Yet their Dehn invariants disagree. **No finite scissors dissection can transform one into the other.** Dehn had answered Hilbert's question.

The obstruction is precise: every permissible cut-and-reassembly preserves the Dehn invariant, and these two solids have different values of it.

## 4. Was Dehn's obstruction the whole story?

Dehn gave a **necessary** condition:

$$
P\sim Q\quad\Longrightarrow\quad
V(P)=V(Q)\ \text{and}\ D(P)=D(Q),
$$

where $$P\sim Q$$ denotes scissors congruence.

But the converse was not obvious. Perhaps volume and the Dehn invariant agree for some pair of solids, yet some third, undiscovered geometric obstruction prevents rearrangement. Discovering an invariant is usually much easier than proving that it is *complete*.

Sydler's paper, *Conditions nécessaires et suffisantes pour l'équivalence des polyèdres de l'espace euclidien à trois dimensions*, supplies exactly this missing converse. Its main theorem says:

$$
\boxed{P\sim Q\quad\Longleftrightarrow\quad
V(P)=V(Q)\ \text{and}\ D(P)=D(Q).}
$$

In words: **two polyhedra in ordinary three-dimensional Euclidean space can be cut into finitely many pieces and rearranged into one another if and only if they have the same volume and the same Dehn invariant.**

This is the **Dehn–Sydler theorem**: volume and the Dehn invariant together give a complete classification.

For example, every rectangular box has Dehn invariant zero because all its dihedral angles are right angles. Therefore, **any two rectangular boxes of equal volume are scissors congruent**, even if one is long and thin and the other is a cube. The theorem guarantees that a finite dissection exists.

## 5. What is Sydler's proof doing?

Sydler’s strategy is to **simplify the geometry while preserving scissors equivalence**.

The broad route is:

1. **Remove the difficult angles.** Under Dehn's conditions, a polyhedron can be replaced, through suitable geometric constructions, by one whose dihedral angles are rational multiples of $$\pi$$. Sydler sharpens these reductions toward polyhedra with right dihedral angles.
2. **Break the remaining solids into controlled building blocks.** He studies two special families of tetrahedra, called *A* and *B*, whose angle relations make their contributions manageable.
3. **Show the building blocks cancel in the right combinations.** Several intermediate theorems establish that collections of these pieces satisfying the Dehn conditions can be transformed into a cube.
4. **Conclude that the reduced shape is scissors congruent to a cube.** This is the decisive sufficiency step. Restoring the reductions proves the statement for the original polyhedron.

The ingenuity lies in the geometric constructions that make these reductions possible and the algebra that organizes them. **Sydler proves that matching volume and Dehn invariant guarantees a finite rearrangement.**

## 6. A striking difference between two and three dimensions

We can now summarize the situation:

| Dimension | When are two polytopes scissors congruent? |
|---|---|
| Two | Exactly when their areas agree. |
| Three | Exactly when both their volumes and Dehn invariants agree. |

Three-dimensional geometry remembers **angles along edges** as well as volume.

There is a broader mathematical lesson here. To understand whether two objects can be transformed into one another by a set of allowed operations, first look for quantities preserved by those operations. Such quantities are *invariants*. But there is a second, harder question: **do the invariants classify the objects completely?**

Dehn answered the first question for Hilbert's third problem. Sydler answered the second. Together they turned a puzzle about cutting solids into a beautiful classification theorem.

---

### Further reading

- J.-P. Sydler, *Conditions nécessaires et suffisantes pour l'équivalence des polyèdres de l'espace euclidien à trois dimensions*, **Commentarii Mathematici Helvetici** 40 (1965), 43–80. Its introduction (§0) and final statement (§6.2) give the context and main result.
- M. Dehn, *Über den Rauminhalt*, **Mathematische Annalen** 55 (1902), 465–478.
