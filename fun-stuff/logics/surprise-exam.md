---
layout: fun-article
title: "The Surprise Exam: What Exactly Did the Teacher Announce?"
description: "A unified model of ordinary and conditional surprise, self-referential announcements, and the topology of unknowability."
group: Logics
subtitle: "Possible worlds · Public announcements · Fixed points · The topology of surprise"
lead: "A teacher promises a surprise exam next week. The students rule out Friday, then Thursday, and eventually every day. On Wednesday, the teacher gives the exam. Where did the reasoning go wrong?"
permalink: /fun-stuff/logics/surprise-exam.html
published: false
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
Here “surprise” concerns the student's grounds for expecting an exam, rather than an emotional reaction or a low probability assigned to it.

### The Conditionally Expected Exam Paradox

The variation changes what the student must expect.
Simpson states it as follows (§2.1, p. 6):

> The teacher announces that this week’s only exam won’t be a conditionally expected exam.
> An exam is conditionally expected iff, on the morning of the exam, a student has a justified belief that if there is an exam at all this week, then it is today.

The student need not expect an exam to occur at all.
They need only be justified in the conditional judgment: *if there is an exam this week, it must be today*.

Friday is again ruled out: if no exam has occurred before Friday, any exam that occurs during the week must occur on Friday.
This conditional remains true even if there might be no exam.
Once Friday is excluded, an exam on Thursday would also be conditionally expected if none had occurred earlier.
The same backward argument eliminates Wednesday, Tuesday, and Monday.
Yet an exam on Thursday seems capable of being conditionally unexpected when the student still regards Friday as possible.

Simpson also discusses Williamson’s version (p. 7), in which the teacher makes only the conditional promise: **if an exam occurs, it will not be conditionally expected**.
This version does not guarantee an exam.
That difference will matter: a promise about any exam that occurs can be fulfilled by giving no exam, whereas a promise that an exam will occur cannot.

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
It is a label for an outcome, not a date preceding Monday.

For any event $$H\subseteq\Omega$$, define knowledge at this history by

$$
K_i^A H
\quad\Longleftrightarrow\quad
I_i(A)\subseteq H.
$$

We use this definition at possible histories, where $$I_i(A)$$ is nonempty.
Students know a proposition when it holds at every remaining possibility.
This is a model of deductive knowledge, with no probabilities or degrees of confidence.

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

The no-exam state cannot supply the required alternative: the conditional is already true there.
This is not a conditional-probability calculation.

For example, on Friday morning with $$A=\{0,5\}$$, the students do not know that an exam will occur.
Yet they do know that, if one occurs this week, it must be today.
A Friday exam would be ordinarily surprising but conditionally expected.
On Thursday with $$A=\{0,4,5\}$$, an exam that morning would satisfy both definitions of surprise because Friday remains possible.

When an exam is known to be guaranteed, $$A\subseteq G$$, the two definitions coincide.

## 3. One elimination framework

First consider a teacher who promises only that **any exam given will be surprising**, without guaranteeing that an exam occurs.
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

Each operator removes possibilities; each is monotone under set inclusion.
Adding possible worlds can supply alternatives that make an exam surprising, but cannot destroy an existing alternative.

These operators describe the content of the announcement relative to $$A$$.
Whether they should be applied once or iterated is a separate question.

## 4. Interpretation A: evaluate once, then announce

Suppose an exam is already known to occur, so initially $$A_0=G$$.
The teacher evaluates surprise using these initial possibilities and announces that the actual date belongs to $$T_O(A_0)$$.
Since ordinary and conditional surprise coincide here, either operator gives

$$
A_1=T_O(G)=T_C(G)=\{1,2,3,4\}.
$$

Friday is excluded.
But this does not yet justify excluding Thursday.
The original claim concerned surprise relative to $$A_0$$, not surprise relative to the newly reduced set $$A_1$$.

If the actual date is Thursday, the original claim was true: without the announcement, Friday would have remained possible on Thursday morning.
After the announcement, Thursday becomes predictable if no earlier exam occurs.
Learning an epistemic claim can change the epistemic condition it describes.

This gives a precise reading of the teacher's words: *the exam would have been surprising without the information conveyed by this announcement*.
It is coherent, but weaker than the natural promise that the exam **will** surprise students who have heard the promise.
Reapplying the operator requires an additional premise that the same surprise condition continues to hold in the updated model.

The baseline also matters.
If $$A_0=\Omega$$ and the guarantee and ordinary-surprise claim arrive together, then

$$
F_O(\Omega)=G,
\qquad F_O(G)=\{1,2,3,4\}.
$$

Before the first announcement, even Friday is ordinarily surprising because no exam remains possible.
Thus “the first update eliminates Friday” presupposes that the exam guarantee is already incorporated, or uses conditional surprise.

## 5. Interpretation B: include the announcement's own consequences

Now take the stronger promise:

> After learning this announcement and reasoning through its consequences, you will still be surprised if an exam occurs.

Let $$A^*$$ be the possibilities retained after this information is fully incorporated.
Every retained state must satisfy the promise when surprise is evaluated using $$A^*$$ itself.
For the optional-exam promise, this means

$$
\boxed{A^*=T_O(A^*)\quad\text{or}\quad A^*=T_C(A^*).}
$$

For a guaranteed exam, replace $$T_O,T_C$$ by $$F_O,F_C$$.
Because these operators always return subsets of their inputs, the requirement that every retained state satisfy the promise already yields the fixed-point equality.

There may be several fixed points.
If the announcement conveys no additional restriction on the date, select the **greatest fixed point**: the largest set compatible with the promise.
In this finite model, obtain it by starting from all initially available possibilities and repeatedly applying the chosen operator until the set stops changing.
The iteration computes one strong announcement's meaning; it need not represent several announcements or several days passing.

### Guaranteed exam: no state survives

Starting from $$G$$, both definitions give the familiar calculation:

| Round | Remaining exam dates |
| --- | --- |
| 0 | Monday, Tuesday, Wednesday, Thursday, Friday |
| 1 | Monday, Tuesday, Wednesday, Thursday |
| 2 | Monday, Tuesday, Wednesday |
| 3 | Monday, Tuesday |
| 4 | Monday |
| 5 | None |

Every nonempty finite set of dates has a last date.
That date is predictable if no earlier exam occurs, so it cannot survive.
The only fixed point is $$\varnothing$$.

**The conclusion is an impossible guarantee, not knowledge that there will be no exam.**
The no-exam state was excluded by the guarantee.
An empty information set represents inconsistency among the maintained requirements; $$\{0\}$$ represents the perfectly consistent information that no exam occurs.
They are different objects.

### Optional exam: the definitions separate

Under ordinary surprise, retaining $$0$$ protects every exam date from certainty:

$$
T_O(\Omega)=\Omega.
$$

So the greatest fixed point is the full state space.
The promise that any exam will be ordinarily surprising conveys no information in this particular model.

Under conditional surprise, $$0$$ does not protect the last possible exam date:

$$
\begin{aligned}
\{0,1,2,3,4,5\}&\longrightarrow\{0,1,2,3,4\}\\
&\longrightarrow\{0,1,2,3\}\\
&\longrightarrow\{0,1,2\}\\
&\longrightarrow\{0,1\}\\
&\longrightarrow\{0\}.
\end{aligned}
$$

Here the intuition that “only no exam survives” is exactly right.
The set $$\{0\}$$ is the greatest fixed point and the only **nonempty** fixed point.
The empty set is also a fixed point.

| Strong announcement | Ordinary surprise | Conditional surprise |
| --- | --- | --- |
| Any exam will be surprising | $$\Omega$$ | $$\{0\}$$ |
| An exam will occur and be surprising | $$\varnothing$$ | $$\varnothing$$ |

The entries are greatest fixed points starting from $$\Omega$$.
They isolate exactly when backward elimination means “no exam,” when it means “inconsistent guarantee,” and when it does not begin.

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

James Simpson's [*A new epistemic solution to the Surprise Exam Paradox*](https://doi.org/10.1080/0020174X.2025.2495659) (2025, §§2–2.1) studies **justified belief**, with a reliable but fallible teacher.
His diagnosis is that the student's reasoning undermines the justification on which it depends.
In the ordinary puzzle, the teacher's testimony may be the student's only reason to expect any exam.
Rejecting that testimony can remove the reason for expecting a Friday exam.
For conditional surprise, his Thursday argument restores Friday as a possible exam date once the restriction on which exams the teacher may give loses credibility.

Our possible-worlds language illustrates that distinction without supplying a full theory of justified belief.
If ordinary surprise is considered on Friday and the student's possibilities become $$\{0,5\}$$, then

$$
\neg K_5^{\{0,5\}}E_5,
\qquad K_5^{\{0,5\}}(G\Rightarrow E_5).
$$

Losing certainty that an exam occurs restores ordinary surprise.
It does **not** restore conditional surprise on Friday.
For that, a later exam alternative is needed, as on Thursday:

$$
\neg K_4^{\{0,4,5\}}(G\Rightarrow E_4).
$$

The substantive move is reopening possibilities previously excluded using the teacher's testimony.
That is belief revision, whereas our fixed-point calculation keeps the strong announcement as a hard constraint throughout.

There is also an important limit to the self-refutation diagnosis.
If the promise merely says “if there is an exam, it will not be conditionally expected,” then a correct deduction of no exam does not falsify the promise.
At $$\{0\}$$, it is vacuously true.
Our strong interpretation therefore gives a coherent no-exam outcome rather than a reason, by itself, to reject the testimony.
This is our assessment of that interpretation; it is not Simpson's conclusion about his justified-belief version.

I find it useful to separate the questions.
The fixed-point model asks whether a guarantee can be true and accepted under specified information rules.
Simpson asks what justification remains when a student's argument calls the teacher's testimony into question.
An impossibility result under the first set of assumptions does not settle the second question.

## 7. Baltag and coauthors: the same operator in a broader language

Alexandru Baltag, Nick Bezhanishvili, and David Fernández-Duque's [*The Topology of Surprise*](https://proceedings.kr.org/2022/4/kr2022-0004-baltag-et-al.pdf) (2022, §§4–5) develops a topological treatment.
For the guaranteed five-day exam, its elimination operator is exactly ours.
Their self-referential formulation is

$$
P=\langle P\rangle\Diamond\top.
$$

Here $$\langle P\rangle$$ means that $$P$$ is true and, after publicly learning it, the following condition holds; $$\Diamond\top$$ says the actual state cannot be isolated by available observations.
They select the greatest fixed point, called the **perfect core**.
An empty core makes the strong announcement impossible; a nonempty core allows it to be truthful.

To see the equivalence directly, return to $$X=G$$ and let the observable sets be

$$
O_i=\{i,i+1,\ldots,5\},
\qquad \mathcal T=\{\varnothing,O_1,\ldots,O_5\}.
$$

These observations record days passing without an exam, up to the exam morning.
They exclude observing the exam itself, which would of course reveal its date.

For $$A\subseteq X$$, define its derivative by

$$
d(A)=\{x\in X:\text{every open neighborhood of }x
\text{ meets }A\setminus\{x\}\}.
$$

At $$i$$, the smallest open neighborhood is $$O_i$$.
Hence, for $$i\in A$$,

$$
i\in d(A)
\iff O_i\cap(A\setminus\{i\})\ne\varnothing
\iff\exists j\in A:\ j>i.
$$

Therefore

$$
\boxed{T_O(A)=T_C(A)=A\cap d(A),\qquad A\subseteq G.}
$$

The equivalence concerns this information structure and the strong guaranteed-exam model.
It does not identify their whole theory with Simpson's account of justified belief.
Our inclusion of the no-exam state and distinction between the two surprise predicates makes those variants explicit.

## 8. What changes on a continuum?

The finite definition “there is a later possible date” uses the order of the week.
The more general definition “no permitted observation isolates the actual state” works even when observations have no such order.
This is where topology becomes useful.

The following examples apply that criterion directly.
They concern identifying a hidden number, rather than scheduling an exam in continuous time.

### Arbitrarily accurate measurements need not identify an exact value

Suppose a hidden number lies in $$X=[0,1]$$.
Observations are neighborhoods in the usual relative topology: measurements can locate the number within arbitrarily small intervals, but cannot report an exact singleton.
Every neighborhood of every $$x\in[0,1]$$ contains another possible value, including at the endpoints.
Thus

$$
d(X)=X,
\qquad X\cap d(X)=X.
$$

The strong announcement that the exact value will remain unidentified through these observations is consistent.
Learning it leaves all values possible, so it does not undermine itself.

This conclusion concerns every available finite-precision observation, including every finite combination of such observations.
It does not treat an infinite list of measurements, supplied all at once as a new observation, as automatically available.
That would change the information structure.

### An informative announcement with a nonempty survivor set

For a slightly richer example, take

$$
X=\{0\}\cup\{1/n:n=1,2,\ldots\}\cup[2,3]
$$

with the usual relative topology.
Every $$1/n$$ is isolated, whereas $$0$$ is approached by the sequence and every point in $$[2,3]$$ has neighboring interval points.
The successive survivor sets are

$$
\begin{aligned}
A_0&=X,\\
A_1&=\{0\}\cup[2,3],\\
A_2&=[2,3],\\
A_3&=[2,3].
\end{aligned}
$$

The first round removes the isolated sequence points.
Once they disappear, $$0$$ becomes isolated too and is removed in the second round.
The interval remains forever.
The strong announcement is informative: the student learns that the number lies in $$[2,3]$$, while its exact value remains unidentified.

### Size alone does not determine the answer

A continuum equipped with the discrete topology has singleton observations.
Then $$d(X)=\varnothing$$, and the strong announcement fails immediately despite the uncountably many states.
Conversely, even a two-point space with only the observations $$\varnothing$$ and $$X$$ has no isolated points.

What matters is which states observations can distinguish.
The five-day impossibility relies on a last remaining distinguishable date, not on finiteness alone.

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
Continue until the sequence stabilizes; stopping after just countably many rounds is not justified in every space.
The sequence must eventually stabilize because it decreases through subsets of the fixed set $$X$$.
Monotonicity ensures that every fixed point is contained in every stage, so the terminal set is the greatest fixed point.

One can equivalently iterate $$d$$ from $$X$$: these iterates decrease, and at a limit stage monotonicity keeps the next derivative inside all preceding stages.
The common terminal set satisfies $$A=d(A)$$ and is the perfect core.
This explains why the derivative and contracting formulations yield the same greatest fixed point, even though their arbitrary fixed points need not coincide.

</details>

## 9. What I take the paradox to show

The backward calculation is not inherently mistaken.
Under the strong interpretation, it correctly tests whether the teacher's promise can survive its own dissemination.
With a guaranteed exam in a finite week, it cannot.
With only a conditional-surprise restriction, it can survive by implying no exam.
With imperfect observations on a continuum, it can survive while leaving many states possible.

Under the one-step interpretation, further elimination needs a premise the announcement has not supplied.
Under a fallible-testimony interpretation, an argument that undermines trust must also reconsider the exclusions that depended on that trust.
These are different diagnoses because they answer different formal questions.

The comparison with the [forty cheating husbands puzzle](/fun-stuff/logics/forty-cheating-husbands.html) helps locate the difference.
There, subsequent publicly observed inaction, combined with the known decision rule, supplies new information each day.
Here, the backward rounds can all be performed before Monday: they compute the proposed guarantee's fixed point.
The interpretation of the message determines whether those rounds are licensed.

For me, the most interesting lesson is that self-reference need not cause inconsistency.
A statement can refer to what will remain unknown after it is learned.
Whether it can be true depends on the possibilities and observations that remain.

## Further reading

- James Simpson (2025), [“A new epistemic solution to the Surprise Exam Paradox,”](https://doi.org/10.1080/0020174X.2025.2495659) *Inquiry*, published online April 22. Sections 2 and 2.1 develop the justified-belief response and the conditional variant.
- Alexandru Baltag, Nick Bezhanishvili, and David Fernández-Duque (2022), [“The Topology of Surprise,”](https://proceedings.kr.org/2022/4/kr2022-0004-baltag-et-al.pdf) *Proceedings of KR 2022*, pp. 33–42. Sections 4 and 5 distinguish one-step and self-referential announcements.
- Related article: [“Can every truth be known?”](/fun-stuff/logics/fitch-knowability.html) Another way in which a truth about ignorance interacts with the possibility of knowing it.
