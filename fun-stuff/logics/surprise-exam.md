---
layout: fun-article
title: "The Surprise Exam: What Exactly Did the Teacher Announce?"
description: "A unified model of ordinary and conditional surprise, self-referential announcements, and the topology of unknowability."
group: Logics
subtitle: "Possible worlds · Public announcements · Fixed points · The topology of surprise"
lead: "A teacher promises a surprise exam next week. The students rule out Friday, then Thursday, and eventually every day. On Wednesday, the teacher gives the exam. Where did the reasoning go wrong?"
permalink: /fun-stuff/logics/surprise-exam.html
date: 2026-11-07T10:56:22-07:00
published: true
---

## 1. The puzzle and its conditional variation

### The Surprise Exam Paradox

James Simpson opens [*A new epistemic solution to the Surprise Exam Paradox*](https://doi.org/10.1080/0020174X.2025.2495659) (2025, pp. 1–2) with the familiar story:

> A trustworthy teacher tells her students that this week’s only exam will be a surprise exam.
> A surprise exam is an exam such that the students won’t have a justified belief the morning the exam occurs that they’ll be having an exam that day.

A clever student argues that the teacher cannot keep this promise.
Suppose no exam has occurred by Friday morning.
Since an exam must occur during the week, it must occur on Friday, so the student will expect it.
Friday therefore cannot be the date of a surprise exam.

Now suppose no exam has occurred by Thursday morning.
Friday has already been ruled out, so the exam must occur on Thursday.
But then Thursday’s exam will also be expected.
Repeat the same argument for Wednesday, Tuesday, and Monday: no day seems capable of accommodating the promised exam.

Yet a teacher appears perfectly capable of announcing a surprise exam and then giving one on Wednesday, when the students do not expect it.
The puzzle is the conflict between the apparently valid backward argument and this apparently possible outcome.

### The Conditionally Expected Exam Paradox

The variation changes what the student must expect.
Simpson states it as follows (§2.1, p. 6):

> The teacher announces that this week’s only exam won’t be a conditionally expected exam.
> An exam is conditionally expected iff, on the morning of the exam, a student has a justified belief that if there is an exam at all this week, then it is today.

The relevant judgment is conditional: *if there is an exam this week, it must be today*.

Friday is again ruled out: if no exam has occurred before Friday, any exam that occurs during the week must occur on Friday.
This conditional remains true even if there might be no exam.
Once Friday is excluded, an exam on Thursday would also be conditionally expected if none had occurred earlier.
The same backward argument eliminates Wednesday, Tuesday, and Monday.
Yet an exam on Thursday seems capable of being conditionally unexpected when the student still regards Friday as possible.

Simpson also discusses Williamson’s version (p. 7), in which the teacher makes only the conditional promise: **if an exam occurs, it will not be conditionally expected**.
This promise can be fulfilled by giving no exam.

The quotations use Simpson’s language of **justified belief**.
Our formal model below first studies **deductive knowledge**; Section 6 returns to his treatment of justification and fallible testimony.

### Three choices hidden in the stories

Understanding what the backward calculation establishes requires separating three questions:

1. **Is an exam guaranteed, or is no exam also possible?**
2. **Does surprise mean not knowing that an exam is today, or not knowing that an exam, if there is one, must be today?**
3. **Is the announcement evaluated before it is learned, or must it remain true after its own consequences are understood?**

These choices are independent.
In particular, a *conditionally expected* exam changes the definition of surprise; a *self-referential* announcement changes the information against which surprise is evaluated.
One formal model can keep track of all three.

## 2. Possible worlds and morning information

There is at most one exam during a five-day week.
Let

$$
\Omega=\{0,1,2,3,4,5\},
\qquad G=\{1,2,3,4,5\}.
$$

State $$i\in G$$ means the exam occurs on day $$i$$; state $$0$$ means no exam occurs.
The event $$G$$ says that an exam occurs sometime during the week.
Write $$E_i=\{i\}$$ for an exam on day $$i$$.

Let $$A\subseteq\Omega$$ be the possibilities the students retain before observing the passage of days.
On the morning of day $$i$$, provided no exam has yet occurred, their information is

$$
I_i(A)=A\cap\bigl(\{0\}\cup\{i,i+1,\ldots,5\}\bigr).
$$

The no-exam state survives every morning observation.

For any event $$H\subseteq\Omega$$, define knowledge at this history by

$$
K_i^A H
\quad\Longleftrightarrow\quad
I_i(A)\subseteq H.
$$

We use this definition at possible histories, where $$I_i(A)$$ is nonempty.
Students know a proposition when it holds at every remaining possibility.

### Ordinary surprise

At an actual exam state $$i\in A\cap G$$, ordinary surprise means

$$
\neg K_i^A E_i.
$$

Equivalently,

$$
\boxed{\text{Ordinary surprise at }i
\iff 0\in A\ \text{or}\ \exists j\in A\cap G:\ j>i.}
$$

Either no exam is still possible, or a later exam is still possible.
Either alternative prevents certainty that the exam is today.

### Conditional surprise

An exam is *conditionally expected* when the students know that, if an exam occurs at all, it occurs today:

$$
K_i^A(G\Rightarrow E_i).
$$

Here $$G\Rightarrow E_i$$ is the material conditional, the event $$\{0,i\}$$.
Conditional surprise is its negation:

$$
\boxed{\neg K_i^A(G\Rightarrow E_i)
\iff \exists j\in A\cap G:\ j>i.}
$$

The required alternative is a later exam date, since the conditional is true at the no-exam state.

For example, on Friday morning with $$A=\{0,5\}$$, the students do not know that an exam will occur.
Yet they do know that, if one occurs this week, it must be today.
A Friday exam would be ordinarily surprising but conditionally expected.
On Thursday with $$A=\{0,4,5\}$$, an exam that morning would satisfy both definitions of surprise because Friday remains possible.

When an exam is known to be guaranteed, $$A\subseteq G$$, the two definitions coincide.

## 3. One elimination framework

First consider a teacher who promises that **any exam given will be surprising**.
The two definitions produce the operators

$$
\begin{aligned}
T_O(A)&=(A\cap\{0\})\\
&\quad\cup\{i\in A\cap G:0\in A\ \text{or}\ \exists j\in A\cap G,\ j>i\},\\[4pt]
T_C(A)&=(A\cap\{0\})\\
&\quad\cup\{i\in A\cap G:\exists j\in A\cap G,\ j>i\}.
\end{aligned}
$$

The subscripts indicate ordinary and conditional surprise.
Both retain state $$0$$ whenever it is available: a promise about what happens *if* an exam occurs is vacuously satisfied when there is none.

If the teacher also guarantees an exam, intersect the output with $$G$$:

$$
F_O(A)=G\cap T_O(A),
\qquad F_C(A)=G\cap T_C(A).
$$

Each operator removes states where an exam would be predictable, and each is monotone under set inclusion: enlarging the set of possible worlds preserves existing alternatives and can only make surprise easier to achieve.

Applying one of these operators once captures a single evaluation of surprise relative to $$A$$; iterating it captures an announcement whose truth must survive its own uptake.

## 4. Interpretation A: evaluate once, then announce

Suppose an exam is already known to occur, so initially $$A_0=G$$.
The teacher evaluates surprise against these initial possibilities and announces that the actual date belongs to $$T_O(A_0)$$.
Since ordinary and conditional surprise coincide when $$0$$ is absent, either operator gives

$$
A_1=T_O(G)=T_C(G)=\{1,2,3,4\}.
$$

Friday is ruled out.
Now suppose the exam is held on Thursday.
The teacher's original statement was true when evaluated against $$A_0$$: before the announcement, Friday would still have been open on Thursday morning.
Once the students learn the announcement and update to $$A_1$$, however, Thursday becomes the last remaining date and is completely predictable by Thursday morning.
Learning an epistemic claim changes the information state against which surprise is measured.

On this one-step reading, the teacher's promise means only: *the exam would have been surprising without the information conveyed by this announcement*.
Eliminating Thursday, Wednesday, and the rest of the week requires a stronger premise—that the exam will still be surprising *after* the students incorporate the announcement itself.

Even the first elimination step depends on what is already in the baseline $$A_0$$.
If $$A_0=\Omega$$ and the exam guarantee arrives together with an ordinary-surprise claim, then

$$
F_O(\Omega)=G,
\qquad F_O(G)=\{1,2,3,4\}.
$$

Against $$\Omega$$, even a Friday exam counts as ordinarily surprising because no exam ($$0$$) is still on the table; only after the guarantee restricts the state space to $$G$$ does Friday drop out.

## 5. Interpretation B: include the announcement's own consequences

Now take the stronger, self-referential promise:

> After learning this announcement and reasoning through its consequences, you will still be surprised if an exam occurs.

Let $$A^*$$ be the possibilities retained once this announcement is fully incorporated.
Every state in $$A^*$$ must satisfy the promise when surprise is evaluated relative to $$A^*$$ itself.
For the optional-exam promise, this requires a fixed point:

$$
\boxed{A^*=T_O(A^*)\quad\text{or}\quad A^*=T_C(A^*).}
$$

For a guaranteed exam, replace $$T_O,T_C$$ by $$F_O,F_C$$.
Because each operator returns a subset of its input, requiring every retained state to satisfy the promise is already equivalent to the fixed-point equation.

When multiple fixed points exist and the announcement places no further restriction on the date, the natural candidate is the **greatest fixed point**—the largest set of states compatible with the promise.
In our finite five-day model, we find it by starting from all initially available possibilities and applying the operator repeatedly until the set stabilizes.

### Guaranteed exam: no state survives

Starting from $$G$$, both definitions produce the classic five-step elimination:

| Round | Remaining exam dates |
| --- | --- |
| 0 | Monday, Tuesday, Wednesday, Thursday, Friday |
| 1 | Monday, Tuesday, Wednesday, Thursday |
| 2 | Monday, Tuesday, Wednesday |
| 3 | Monday, Tuesday |
| 4 | Monday |
| 5 | None |

Every nonempty finite set of dates has a latest date.
If no exam has occurred before that morning, the exam must occur that day, so the latest date is eliminated in the next round.
The only fixed point is $$\varnothing$$: **a guaranteed exam cannot be self-referentially surprising.**

### Optional exam: the definitions separate

When the teacher does not guarantee an exam ($$0\in\Omega$$), ordinary and conditional surprise part ways.
Under ordinary surprise, the continuing possibility of no exam prevents certainty on every morning of the week:

$$
T_O(\Omega)=\Omega.
$$

The greatest fixed point is the entire state space $$\Omega$$, and the announcement rules out nothing.

Under conditional surprise, however, the latest remaining exam date is still conditionally expected on that morning and gets eliminated at each round:

$$
\begin{aligned}
\{0,1,2,3,4,5\}&\longrightarrow\{0,1,2,3,4\}\\
&\longrightarrow\{0,1,2,3\}\\
&\longrightarrow\{0,1,2\}\\
&\longrightarrow\{0,1\}\\
&\longrightarrow\{0\}.
\end{aligned}
$$

All five exam dates vanish one by one, leaving $$\{0\}$$ as the greatest fixed point (and the only **nonempty** fixed point).

| Strong announcement | Ordinary surprise | Conditional surprise |
| --- | --- | --- |
| Any exam will be surprising | $$\Omega$$ | $$\{0\}$$ |
| An exam will occur and be surprising | $$\varnothing$$ | $$\varnothing$$ |

These greatest fixed points (starting from $$\Omega$$) cleanly separate three outcomes: an uninformative promise ($$\Omega$$), a promise that forces no exam ($$\{0\}$$), and an inconsistent guarantee ($$\varnothing$$).

<details markdown="1">
<summary>Proof: all fixed points in the finite model</summary>

If $$0\in A$$, then $$T_O(A)=A$$.
If $$A$$ is nonempty and excludes $$0$$, its largest date is removed, so it is not a fixed point of $$T_O$$.
Thus the ordinary operator's fixed points are $$\varnothing$$ and every subset containing $$0$$.

For $$T_C$$, any set containing an exam date has a largest such date, which the operator removes.
The only fixed points are therefore $$\varnothing$$ and $$\{0\}$$.

A fixed point of either guaranteed-exam operator must be contained in $$G$$.
The largest-date argument then excludes every nonempty candidate.

Finally, let $$T$$ denote any of the four operators and set $$A_{n+1}=T(A_n)$$, starting from $$A_0=\Omega$$.
The sequence decreases and must stabilize because $$\Omega$$ is finite.
If $$B=T(B)$$, induction and monotonicity give $$B\subseteq A_n$$ for every $$n$$.
The terminal set consequently contains every fixed point and is itself a fixed point.
It is the greatest one.

</details>

## 6. Simpson: what happens when trust is defeasible?

In [*A new epistemic solution to the Surprise Exam Paradox*](https://doi.org/10.1080/0020174X.2025.2495659) (2025, §§2–2.1), James Simpson shifts from deductive certainty to **justified belief** in the testimony of a reliable but fallible teacher.
His diagnosis is that the student's backward induction undercuts the very testimony it relies on.
Once the student concludes that the teacher cannot fulfill her promise, trusting the teacher's word is no longer justified.

In the ordinary puzzle, losing trust in the announcement means the student can no longer be sure an exam will happen at all; on Friday morning, the live possibilities reopen to $$\{0,5\}$$, so

$$
\neg K_5^{\{0,5\}}E_5,
\qquad K_5^{\{0,5\}}(G\Rightarrow E_5).
$$

Doubting whether an exam will occur restores ordinary surprise on Friday, though a Friday exam remains conditionally expected.
In the conditional-surprise puzzle, losing trust in the teacher's promise on Thursday morning reopens Friday as a possible exam date ($$\{0,4,5\}$$), which makes a Thursday exam conditionally surprising after all:

$$
\neg K_4^{\{0,4,5\}}(G\Rightarrow E_4).
$$

In short, where our fixed-point model treats the announcement as an indefeasible constraint and asks which states survive, Simpson's model asks how a student revises beliefs when the deduction itself erodes trust in the speaker.
Note also that for the purely conditional promise (“if there is an exam, it will not be conditionally expected”), our fixed-point calculation lands on $$\{0\}$$: the student can continue to trust the teacher completely and simply conclude that there will be no exam.

## 7. Baltag and coauthors: the same operator in a broader language

Alexandru Baltag, Nick Bezhanishvili, and David Fernández-Duque develop a general topological semantics for surprise in [*The Topology of Surprise*](https://proceedings.kr.org/2022/4/kr2022-0004-baltag-et-al.pdf) (2022, §§4–5).
In their modal language, the self-referential announcement is written as the fixed-point equation

$$
P=\langle P\rangle\Diamond\top.
$$

Here $$\langle P\rangle$$ is the public-announcement modality (“$$P$$ is true, and after $$P$$ is announced...”) and $$\Diamond\top$$ says that the actual state is not isolated by the agent's observation.
The greatest fixed point of this operator is the **perfect core** of the space: if it is nonempty, the self-referential announcement can be truthfully made; if it is empty, the announcement is self-defeating.

For a guaranteed exam in a five-day week ($$X=G$$), their topological elimination operator coincides with ours.
Take the morning observations (no exam prior to day $$i$$) as the open sets:

$$
O_i=\{i,i+1,\ldots,5\},
\qquad \mathcal T=\{\varnothing,O_1,\ldots,O_5\}.
$$

For any subset $$A\subseteq X$$, its topological derivative—the set of limit points of $$A$$—is

$$
d(A)=\{x\in X:\text{every open neighborhood of }x
\text{ meets }A\setminus\{x\}\}.
$$

Because the smallest open neighborhood of day $$i$$ is $$O_i$$, a date $$i\in A$$ is a limit point of $$A$$ if and only if some later date also lies in $$A$$:

$$
i\in d(A)
\iff O_i\cap(A\setminus\{i\})\ne\varnothing
\iff\exists j\in A:\ j>i.
$$

Consequently, on $$A\subseteq G$$,

$$
\boxed{T_O(A)=T_C(A)=A\cap d(A),\qquad A\subseteq G.}
$$

Iterating $$F_O$$ or $$F_C$$ is literally Cantor–Bendixson derivative pruning—peeling away isolated points until only the perfect core remains.

## 8. What changes on a continuum?

Recasting “there is a later possible date” as “no permitted observation isolates the actual state” lets us ask what happens when the set of possibilities is infinite or continuous.
Consider a hidden number $$x\in X$$ instead of an exam day.

### Arbitrarily accurate measurements and exact identification

Suppose the hidden number lies in $$X=[0,1]$$ equipped with the standard Euclidean topology: any measurement locates $$x$$ within an open interval of positive, arbitrarily small width.
Because every open neighborhood of every $$x\in[0,1]$$ contains other points of $$[0,1]$$ (including at the endpoints), no point is isolated:

$$
d(X)=X,
\qquad X\cap d(X)=X.
$$

Here the strong, self-referential announcement—“you will never pinpoint the exact value of $$x$$ from finite-precision measurements, even after hearing this announcement”—is completely consistent and leaves every value in $$[0,1]$$ open.

### An informative announcement with a nonempty survivor set

Now take a space that mixes isolated points with a continuum:

$$
X=\{0\}\cup\{1/n:n=1,2,\ldots\}\cup[2,3]
$$

under the usual subspace topology.
Each point $$1/n$$ is isolated; $$0$$ is a limit point of the sequence $$\{1/n\}$$; and every point of $$[2,3]$$ is surrounded by other points of the interval.
Iterating the elimination operator peels away the discrete part in two rounds:

$$
\begin{aligned}
A_0&=X,\\
A_1&=\{0\}\cup[2,3],\\
A_2&=[2,3],\\
A_3&=[2,3].
\end{aligned}
$$

Round 1 eliminates every $$1/n$$ because each can be isolated by a sufficiently narrow interval.
Once the sequence $$\{1/n\}$$ is gone, $$0$$ is left isolated and drops out in Round 2.
The interval $$[2,3]$$ is its own derivative and survives every subsequent round.
In this space, the self-referential announcement is both **consistent** and **informative**: hearing that the number cannot be pinned down allows the student to deduce that $$x\in[2,3]$$, while the exact value inside $$[2,3]$$ remains unidentifiable.

### Why the observation topology is what matters

Cardinality alone does not save the announcement.
If $$[0,1]$$ is given the discrete topology—where observations can test singletons $$\{x\}$$ directly—then $$d(X)=\varnothing$$ and the announcement fails in a single round despite uncountably many states.
Conversely, even a two-point space equipped with the indiscrete topology $$\{\varnothing,X\}$$ has $$d(X)=X$$.
The five-day exam paradox collapses because each passing day isolates the earliest remaining date and the finite week has a final day.

<details markdown="1">
<summary>Technical note: iteration beyond finitely many rounds</summary>

For a general topological space, use the contracting operator $$A\mapsto A\cap d(A)$$ and define

$$
\begin{aligned}
A_0&=X,\\
A_{\alpha+1}&=A_\alpha\cap d(A_\alpha),\\
A_\lambda&=\bigcap_{\alpha<\lambda}A_\alpha
\quad\text{at limit ordinals }\lambda.
\end{aligned}
$$

At a limit stage, retain the states that survived every earlier stage.
Continue until the sequence stabilizes, which in general may require more than countably many rounds.
The sequence must eventually stabilize because it decreases through subsets of the fixed set $$X$$.
Monotonicity ensures that every fixed point is contained in every stage, so the terminal set is the greatest fixed point.

One can equivalently iterate $$d$$ from $$X$$: these iterates decrease, and at a limit stage monotonicity keeps the next derivative inside all preceding stages.
The common terminal set satisfies $$A=d(A)$$ and is the perfect core.
Thus the derivative and contracting formulations yield the same greatest fixed point.

</details>

## 9. Putting the pieces together

Each resolution of the surprise exam paradox answers a distinct question about how announcements interact with knowledge:

- **One-step evaluation (Interpretation A):** If the teacher asserts only that the exam date is surprising relative to the students' *prior* information, Friday is ruled out, and the backward induction stops after step one.
- **Self-referential fixed point (Interpretation B):** If the promise must remain true *after* its own consequences are deduced, a guaranteed five-day exam has no fixed point ($$\varnothing$$), an optional conditionally surprising exam forces no exam ($$\{0\}$$), and a continuum with interval observations can leave a rich perfect core such as $$[2,3]$$.
- **Defeasible testimony (Simpson):** If the student treats the teacher as fallible, deducing that the promise is untenable undercuts trust in the announcement itself and reopens the eliminated days.

Compare this with the [forty cheating husbands puzzle](/fun-stuff/logics/forty-cheating-husbands.html).
There, the wives cannot run the elimination in their heads on day one because each step requires observing an actual silent midnight.
In the surprise exam, by contrast, the students do not wait for Monday morning to eliminate Friday: the entire backward induction is a prior calculation of which states can belong to the announcement's fixed point.
And as the continuum examples show, a self-referential announcement about future ignorance is not inherently paradoxical—whether it collapses or succeeds depends on whether the observation structure leaves a nonempty perfect core.

## Further reading

- James Simpson (2025), [“A new epistemic solution to the Surprise Exam Paradox,”](https://doi.org/10.1080/0020174X.2025.2495659) *Inquiry*, published online April 22. Sections 2 and 2.1 develop the justified-belief response and the conditional variant.
- Alexandru Baltag, Nick Bezhanishvili, and David Fernández-Duque (2022), [“The Topology of Surprise,”](https://proceedings.kr.org/2022/4/kr2022-0004-baltag-et-al.pdf) *Proceedings of KR 2022*, pp. 33–42. Sections 4 and 5 distinguish one-step and self-referential announcements.
- Related article: [“Can every truth be known?”](/fun-stuff/logics/fitch-knowability.html) Another way in which a truth about ignorance interacts with the possibility of knowing it.
