---
layout: fun-article
title: "Can You Cut a Tetrahedron into a Cube? Hilbert's Third Problem"
description: "Why equal volume is not enough to rearrange solids, and how the Dehn invariant and Sydler's theorem characterize scissors congruence."
group: Mathematics
permalink: /fun-stuff/mathematics/hilbert-third-problem-dehn-sydler.html
date: 2026-11-03T20:30:34-07:00
published: true
---

Imagine two solid objects made of the same amount of material.
You are allowed to cut one into finitely many polyhedral pieces, then rotate and translate the pieces—without stretching, bending, or discarding anything.
Can you always reassemble them into the other?

In two dimensions, the answer is yes: **any two polygons with the same area can be cut into finitely many polygonal pieces and rearranged into one another.**
This is the Wallace–Bolyai–Gerwien theorem.
A triangle can become a rectangle; a square can become a triangle.
A simple three-piece dissection shows how:

<figure class="math-figure">
  <img src="{{ '/img/others/triangle-rectangle-dissection.svg' | relative_url }}" alt="An isosceles triangle cut into a trapezoid and two small triangles, which rotate into a rectangle." loading="lazy">
  <figcaption>Cut the isosceles triangle halfway up, then split its top along the altitude. Rotate each small triangle 180° about the midpoint of the corresponding sloping side. The three pieces form a rectangle with the same base and half the height.</figcaption>
</figure>

It is natural to expect the same in three dimensions: if two solids have equal volume, they enclose the same amount of space.
Yet in 1900, David Hilbert made the failure of this intuition the subject of his **third problem**.
His student Max Dehn solved it within the year: a cube and a regular tetrahedron of equal volume cannot be cut into finitely many polyhedral pieces and reassembled into one another.

What happened six decades later is equally striking.
Dehn had discovered a second quantity—beyond volume—that every straight-cut dissection must preserve.
In 1965, **Jean-Pierre Sydler** proved that there are *no further obstructions*: volume and Dehn's invariant completely determine when two polyhedra in three-dimensional Euclidean space are scissors congruent.

## 1. The rules of the game: scissors congruence

Two polyhedra $$P$$ and $$Q$$ are **scissors congruent** if $$P$$ can be partitioned into finitely many smaller polyhedra (with flat faces and non-overlapping interiors) that can be moved by rigid motions—translations and rotations—to form $$Q$$.

Volume is clearly preserved:

$$
V(P)=\sum_i V(P_i)=V(Q).
$$

Why is equal volume not enough in three dimensions when equal area suffices in the plane?
Because three-dimensional polyhedra have a geometric feature that polygons lack: **dihedral angles**—the interior angles where two faces meet along an edge.

## 2. The hidden information in an edge

Think of a wedge-shaped block.
Its geometry along an edge depends on two numbers: the edge's length and the angle at which its two faces meet.
The Dehn invariant packages these pairs of lengths and angles in a way that survives arbitrary straight cuts.

For each edge $$e$$ of a polyhedron $$P$$, let

- $$\ell_e$$ be the edge's length;
- $$\theta_e$$ be its interior dihedral angle.

The Dehn invariant sums **edge length tensored with dihedral angle**, with angles measured *modulo rational multiples of* $$\pi$$:

$$
\boxed{D(P)=\sum_{e}\ell_e\otimes[\theta_e]
\quad\in\quad \mathbb R\otimes_{\mathbb Q}(\mathbb R/\pi\mathbb Q).}
$$

The tensor product $$\mathbb R\otimes_{\mathbb Q}(\mathbb R/\pi\mathbb Q)$$ enforces three natural bookkeeping rules:

1. **Lengths stay paired with their angles:** splitting an edge into segments of the same dihedral angle adds their lengths in the first factor.
2. **Angles along a shared edge add:** slicing along an edge splits its dihedral angle into parts that add in the second factor, with rational coefficients.
3. **Rational multiples of $$\pi$$ vanish:** whenever a cut creates a brand-new edge inside the solid, the dihedral angles of the pieces meeting around that interior edge sum to $$2\pi$$ (or to $$\pi$$ if the new edge lies on an existing face). Modulo rational multiples of $$\pi$$, those newly created angles sum to zero and cancel out completely.

Because every straight cut preserves the sum of piece invariants,

$$
D(P)=\sum_i D(P_i),
$$

and rigid motions leave lengths and angles unchanged, **any two scissors-congruent polyhedra must have the same Dehn invariant**.

> The tensor product keeps edge lengths paired with their dihedral angle classes, while reducing angles modulo rational multiples of $$\pi$$ guarantees that all newly cut edges cancel out.

## 3. Why the cube and the tetrahedron differ

<figure class="math-figure">
  <img src="{{ '/img/others/cube-tetrahedron-obstruction.svg' | relative_url }}" alt="A cube and regular tetrahedron with equal volume but different Dehn invariants." loading="lazy">
  <figcaption>Equal volume, different Dehn invariants: the cube and regular tetrahedron cannot be reassembled into one another.</figcaption>
</figure>

Take a cube of side length $$a$$.
Every one of its twelve edges has dihedral angle $$\pi/2$$.
Since $$\pi/2$$ is a rational multiple of $$\pi$$, its angular class is zero, and therefore

$$
D(\text{cube})=0.
$$

Now take a regular tetrahedron of edge length $$b$$.
All six of its edges share the dihedral angle

$$
\alpha=\arccos(1/3)\approx70.53^\circ,
$$

so its Dehn invariant is

$$
D(\text{tetrahedron})=6b\otimes[\alpha].
$$

<figure class="math-figure">
  <img src="{{ '/img/others/tetrahedron-dehn-invariant.svg' | relative_url }}" alt="Six equal edges contribute b tensor alpha each. A perpendicular cross-section shows the interior dihedral angle of 70.53 degrees." loading="lazy">
  <figcaption>A section perpendicular to an edge measures the angle between its two adjacent faces. Each of the six edges contributes the same tensor, so their contributions add.</figcaption>
</figure>

By Niven's theorem, the only rational multiples of $$\pi$$ with a rational cosine have cosine $$0,\pm 1/2,\pm1$$.
Because the cosine here is $$1/3$$, $$\alpha$$ is **not** a rational multiple of $$\pi$$.
Thus $$[\alpha]\ne0$$, and the tetrahedron's Dehn invariant is nonzero.

Even when we choose $$a$$ and $$b$$ so that the cube and the regular tetrahedron have identical volume,

$$
a^3=\frac{b^3}{6\sqrt2},
$$

their Dehn invariants remain unequal.
**No finite dissection can turn the regular tetrahedron into a cube.**

## 4. Was Dehn's obstruction the whole story?

Dehn proved that equal volume and equal Dehn invariant are **necessary** for scissors congruence ($$P\sim Q$$):

$$
P\sim Q\quad\Longrightarrow\quad
V(P)=V(Q)\ \text{and}\ D(P)=D(Q).
$$

For more than sixty years, it remained open whether they are also **sufficient**—or whether some third, hidden geometric invariant could still block reassembly when both volume and $$D$$ match.
In 1965, Jean-Pierre Sydler proved the converse:

$$
\boxed{P\sim Q\quad\Longleftrightarrow\quad
V(P)=V(Q)\ \text{and}\ D(P)=D(Q).}
$$

In words: **two polyhedra in three-dimensional Euclidean space are scissors congruent if and only if they have the same volume and the same Dehn invariant.**

For instance, every rectangular prism has right dihedral angles and therefore Dehn invariant zero.
The Dehn–Sydler theorem immediately implies that **any two rectangular boxes of equal volume can be cut into finitely many polyhedral pieces and reassembled into one another**, no matter what ratios their side lengths have.

## 5. How Sydler's proof works

Sydler's strategy is to **reduce every polyhedron to a prism while tracking its Dehn invariant**:

1. **Decompose into orthoschemes.** Any polyhedron can be triangulated into tetrahedra, and each tetrahedron can be dissected into special right-angled tetrahedra called *orthoschemes* (plus prisms, whose Dehn invariant is zero).
2. **Isolate two families of building blocks.** Sydler studies two parametrized families of tetrahedra whose dihedral angle relations mirror the algebraic identities inside $$\mathbb R\otimes_{\mathbb Q}(\mathbb R/\pi\mathbb Q)$$.
3. **Translate algebraic cancellation into geometric dissection.** Whenever a formal sum of edge-angle tensors cancels to zero in $$\mathbb R\otimes_{\mathbb Q}(\mathbb R/\pi\mathbb Q)$$, Sydler's geometric lemmas construct an explicit scissors congruence that cancels the corresponding tetrahedra modulo prisms.
4. **Finish with prisms.** Once all non-right dihedral angles have been canceled out, the polyhedron is scissors congruent to a prism—and prisms of equal volume are scissors congruent to a cube.

## 6. Two dimensions vs. three

| Dimension | Complete invariants for scissors congruence |
|---|---|
| Two (polygons) | Area |
| Three (polyhedra) | Volume and Dehn invariant |

In the plane, interior vertex angles around a cut always sum to $$\pi$$ or $$2\pi$$, which is a rational multiple of $$\pi$$, so the two-dimensional analog of the Dehn invariant vanishes identically—leaving area as the sole invariant.
In three dimensions, irrational dihedral angles along edges cannot be cut away, and volume together with Dehn's tensor invariant tells the complete story.

### Further reading

- J.-P. Sydler, *Conditions nécessaires et suffisantes pour l'équivalence des polyèdres de l'espace euclidien à trois dimensions*, **Commentarii Mathematici Helvetici** 40 (1965), 43–80.
- M. Dehn, *Über den Rauminhalt*, **Mathematische Annalen** 55 (1902), 465–478.
