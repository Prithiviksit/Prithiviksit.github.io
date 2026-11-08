---
layout: fun-article
title: "The James–Stein Surprise: How Biased Estimates Beat Sample Averages"
description: "Why shrinking three or more normal means lowers total expected squared error, and how positive-part shrinkage improves further."
group: Mathematics
subtitle: "What better means, where the gain comes from, and why James–Stein is not the final answer."
lead: "You estimate several quantities by taking their sample averages. Someone pulls all your estimates toward zero—and can guarantee a smaller total expected error. How can that work?"
permalink: /fun-stuff/mathematics/james-stein-estimator.html
published: false
---

## 1. A strange way to improve an average

Imagine estimating the average effects of ten different treatments.
Each experiment produces a sample average, and each average has the same known standard error.
The obvious procedure is to report those ten averages.
Each uses the observations from its own experiment; each is unbiased.

Now someone proposes a peculiar adjustment: move all ten estimates toward zero, using a common factor calculated from their combined size.
An estimate of one treatment will then depend on observations from the other nine—even if their effects have no known relationship.

The James–Stein result says that, under independent normal sampling with equal known variances, a particular version of this adjustment has **smaller total expected squared error for every possible vector of true effects**, whenever there are at least three effects to estimate.
The guarantee requires neither that the true effects be close to zero nor that they be drawn from a shared prior.

That sounds too strong.
If one treatment really has a large effect, pulling its estimate toward zero can surely make it worse.
It can.
The surprise becomes understandable only after we specify exactly what is being compared.

## 2. What does “better” mean?

Suppose each of $$p$$ independent experiments has $$n$$ observations, indexed by $$i=1,\ldots,p$$ and $$j=1,\ldots,n$$:

$$
Y_{ij}\sim N(\theta_i,\sigma^2).
$$

All observations are independent, and $$\sigma^2>0$$ is known.
Let $$X_i$$ be the sample average in experiment $$i$$ and write $$v=\sigma^2/n$$ for its sampling variance.
Then

$$
X=(X_1,\ldots,X_p)\sim N_p(\theta,vI_p).
$$

We want to estimate the whole vector $$\theta$$.
For a rule $$\delta(X)$$, its **risk** is

$$
R(\theta,\delta)
=\mathbb E_\theta\!\left[\sum_{i=1}^p
\bigl(\delta_i(X)-\theta_i\bigr)^2\right].
$$

The expectation repeats the experiments while holding the true effects fixed.
The loss adds squared errors across experiments, giving each the same weight.
Reporting the sample averages means using $$\delta_0(X)=X$$, whose risk is simply

$$
R(\theta,\delta_0)=pv.
$$

A rule **dominates** another if its risk is no larger at every parameter vector and strictly smaller at some.
A rule is **inadmissible** if another rule dominates it.
These definitions compare expected losses, not the numerical sizes of the estimates.

For James–Stein, the improvement over $$X$$ is strict at every finite $$\theta$$.
But three distinctions matter:

- **Total error:** an individual coordinate can have higher expected squared error, while the sum is lower.
- **Expected error:** the adjusted estimates can be worse on a particular realized dataset.
- **Several unknown means:** $$p$$ counts parameters, not observations. Having three observations of one unknown mean is still a one-dimensional problem.

Nor is this a claim about every possible loss function.
Equal variance, normal sampling, and the specified squared-error criterion are part of the theorem.

## 3. The adjustment: trust a large signal more

Write $$\|X\|^2=\sum_{i=1}^p X_i^2$$ for the vector's squared length.
For $$p\geq3$$, the James–Stein estimator is

$$
\boxed{\delta_{\mathrm{JS}}(X)
=\left(1-\frac{(p-2)v}{\|X\|^2}\right)X.}
$$

Define its value at $$X=0$$ to be zero; that event has probability zero.

The numerator measures the scale of sampling noise across the coordinates.
The denominator measures the observed vector's total size.
When the observed size is large relative to noise, the multiplier is close to one and the adjustment is small.
When it is modest, the adjustment is stronger.
There is also an awkward case: if $$\|X\|^2<(p-2)v$$, the multiplier becomes negative and sends the vector past zero.
We will return to that defect.

For example, take $$p=3$$, $$v=1$$, and observed averages $$X=(2,1,2)$$.
Their squared length is nine, so James–Stein reports

$$
\delta_{\mathrm{JS}}(X)
=\frac89(2,1,2)
=\left(\frac{16}{9},\frac89,\frac{16}{9}\right).
$$

This example shows the operation, not whether it succeeded: without the true effects, we cannot compare the realized errors.
The guarantee concerns how the rule performs over repeated datasets.

## 4. Why moving toward zero can help

Noise makes a vector look larger, on average:

$$
\mathbb E_\theta\|X\|^2=\|\theta\|^2+pv.
$$

Even when every true effect is zero, the observed estimates typically spread away from zero.
Treating their full observed magnitude as signal preserves that noise.
Pulling inward can remove some of it.

The familiar bias–variance tradeoff makes this precise for a *fixed* multiplier $$b$$:

$$
R(\theta,bX)
=\underbrace{(1-b)^2\|\theta\|^2}_{\text{squared bias}}
+\underbrace{b^2pv}_{\text{variance}}.
$$

Near $$b=1$$, a small inward move reduces variance to first order, while squared bias grows only to second order.
If we knew the true vector's size, the best fixed multiplier would be

$$
b^*=\frac{\|\theta\|^2}{\|\theta\|^2+pv}.
$$

Small signals call for strong shrinkage; large signals call for little.
But this formula uses unknown information.
And no fixed $$b<1$$ can beat the averages everywhere: its squared bias becomes arbitrarily large as $$\|\theta\|$$ grows.

James–Stein adapts the amount of shrinkage using the observed vector's size.
The other experiments help tune that common adjustment; they need not directly reveal a particular treatment's effect.
The risk criterion permits gains on some coordinates to offset costs on others.
There is therefore no implication that an unrelated experiment must improve the estimate of any one treatment considered alone.

This intuition still leaves a real mathematical problem.
The multiplier now depends on the same data being adjusted, so substituting a random $$b(X)$$ into the fixed-multiplier risk formula is invalid.
Accounting for that dependence produces the crucial $$p-2$$.
The [Berkeley notes](https://stat210a.berkeley.edu/fall-2024/reader/jamesstein.html) develop this connection through Stein's risk identity.

## 5. The short calculation behind the surprise

Consider the family

$$
\delta_a(X)=\left(1-\frac{av}{\|X\|^2}\right)X,
$$

where $$a$$ is a fixed constant.
The key identity is

$$
\mathbb E_\theta\!\left[
\frac{(X-\theta)^\top X}{\|X\|^2}\right]
=v(p-2)\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right].
$$

It measures how the inward adjustment aligns, on average, with the sampling error.
Expanding the squared loss then gives

$$
\begin{aligned}
R(\theta,\delta_a)
&=pv+\bigl[a^2-2a(p-2)\bigr]v^2
\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]\\
&=pv+v^2\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]\\
&\qquad\times\bigl[(a-(p-2))^2-(p-2)^2\bigr].
\end{aligned}
$$

The squared adjustment costs $$a^2$$; its alignment with the noise saves $$2a(p-2)$$.
The balance is best at $$a=p-2$$, independently of the unknown $$\theta$$.
Consequently,

$$
\boxed{R(\theta,\delta_{\mathrm{JS}})
=pv-(p-2)^2v^2
\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]
<pv.}
$$

The expectation is positive and finite when $$p>2$$.
This is a uniform risk improvement, not merely a good fit for a favorable collection of true effects.
It also shows that any $$0<a<2(p-2)$$ improves on the averages, while $$a=p-2$$ is best **within this constant-$$a$$ family**.

<details markdown="1">
<summary>Technical note: Stein's identity and the missing two</summary>

For an appropriate differentiable function $$h$$, integration by parts under the normal density gives

$$
\mathbb E_\theta[(X_i-\theta_i)h(X)]
=v\,\mathbb E_\theta\!\left[\frac{\partial h(X)}{\partial x_i}\right].
$$

The sign is positive: differentiating the normal density contributes a minus sign, which integration by parts reverses.
Apply this to $$h_i(x)=x_i/\|x\|^2$$ and sum:

$$
\begin{aligned}
\sum_{i=1}^p\frac{\partial h_i}{\partial x_i}
&=\sum_{i=1}^p\left(
\frac1{\|x\|^2}-\frac{2x_i^2}{\|x\|^4}\right)\\
&=\frac{p-2}{\|x\|^2}.
\end{aligned}
$$

The $$p$$ comes from differentiating the $$p$$ numerators; the subtraction of two comes from the shared, data-dependent denominator.

To justify the singularity at zero, first use $$h_i(x)=x_i/(\|x\|^2+\varepsilon)$$, then let $$\varepsilon\downarrow0$$.
Its derivatives are bounded in absolute value by $$3/\|x\|^2$$.
Near zero, integrating $$\|x\|^{-2}$$ against a bounded density has radial order $$\int_0^1 r^{p-3}\,dr$$, finite exactly when $$p>2$$; Gaussian tails cause no difficulty.
Dominated convergence therefore gives the displayed identity and validates the risk expansion.

</details>

The dimensional threshold is substantive.
For one or two unrestricted normal means, the usual estimator is admissible under this loss; a different shrinkage formula cannot simply restore the same uniform guarantee.

At $$\theta=0$$, we can quantify the gain exactly.
Since $$\|X\|^2/v$$ has a chi-squared distribution with $$p$$ degrees of freedom, its expected reciprocal is $$1/(p-2)$$.
Thus $$R(0,\delta_{\mathrm{JS}})=2v$$:

| Number of means | Risk of sample averages at zero | Risk of James–Stein at zero |
| --- | --- | --- |
| 3 | $$3v$$ | $$2v$$ |
| 5 | $$5v$$ | $$2v$$ |
| 10 | $$10v$$ | $$2v$$ |

These are exact risks at the zero vector, not simulation results or a claim of equally large gains everywhere.
Far from the target, the gain tends to zero.

## 6. Must we shrink toward zero?

Zero is a reference point, not a claim that every true effect is small.
For any vector $$m$$ fixed in advance, applying the same argument to $$X-m$$ gives

$$
\delta_m(X)=m+
\left(1-\frac{(p-2)v}{\|X-m\|^2}\right)(X-m).
$$

This also dominates the sample averages.
A sensible target can make the gains more useful, but uniform dominance over $$X$$ does not require the target to be correct.
Different targets need not dominate one another.

Choosing a target from the same data changes the calculation.
A particularly natural choice is the grand average across experiments, which pulls estimates toward one another rather than toward a predetermined value.

<details markdown="1">
<summary>Technical note: shrinking toward the grand average</summary>

Let $$\bar X=p^{-1}\sum_i X_i$$ and $$\mathbf1=(1,\ldots,1)^\top$$.
Leave the common level $$\bar X\mathbf1$$ unchanged and shrink only the deviations:

$$
\begin{aligned}
&\delta_{\mathrm{grand}}(X)-\bar X\mathbf1\\
&\quad=\left(1-\frac{(p-3)v}{\sum_i(X_i-\bar X)^2}\right)
(X-\bar X\mathbf1).
\end{aligned}
$$

The deviations lie in the $$p-1$$ dimensional subspace perpendicular to $$\mathbf1$$.
In orthonormal coordinates on that subspace, they have normal noise with covariance $$vI_{p-1}$$.
Squared loss splits into the unchanged common-level error and the deviation error, so the preceding theorem applies to the latter.
The coefficient becomes $$(p-1)-2=p-3$$, and strict dominance requires $$p\geq4$$.
At zero residual length, define the estimate to be $$\bar X\mathbf1$$.

Thus replacing a fixed target with an estimated one is not a free substitution: the dimension available for shrinkage has changed.

</details>

## 7. Better than James–Stein: stop at zero

Ordinary James–Stein has a visible defect.
If the observed vector is very small, its negative multiplier reverses every sign.
Evidence that the signal is weak leads the rule to point in the opposite direction.

The **positive-part James–Stein estimator** prevents that reversal:

$$
\boxed{\delta_{\mathrm{JS}}^+(X)
=\max\!\left\{0,1-\frac{(p-2)v}{\|X\|^2}\right\}X.}
$$

Set its value at zero to zero.
It agrees with James–Stein when the multiplier is nonnegative and otherwise reports the target itself.
For example, with $$p=3$$, $$v=1$$, and $$X=(1/2,0,0)$$, ordinary James–Stein reports $$(-3/2,0,0)$$; the positive-part rule reports $$(0,0,0)$$.

This simple modification has **strictly smaller risk than ordinary James–Stein at every $$\theta$$**.
So proving that the sample averages are inadmissible did not prove that their replacement was admissible.

<details markdown="1">
<summary>Technical note: why removing the reversal lowers risk</summary>

Condition on the observed radius $$\|X\|=r$$ where $$r^2<(p-2)v$$, and write $$b=1-(p-2)v/r^2<0$$.
The loss of ordinary James–Stein minus that of the zero estimate is

$$
\|bX-\theta\|^2-\|\theta\|^2
=b^2r^2-2b\,\theta^\top X.
$$

Conditional on radius, the normal density on the sphere is proportional to $$\exp(\theta^\top x/v)$$.
Pair each point $$x$$ with $$-x$$.
Their contribution to the numerator of the conditional mean of $$\theta^\top X$$ is proportional to

$$
(\theta^\top x)
\left[e^{\theta^\top x/v}-e^{-\theta^\top x/v}\right]\geq0.
$$

Therefore $$\mathbb E_\theta[\theta^\top X\mid\|X\|=r]\geq0$$.
Because $$b<0$$, the conditional expected loss difference is strictly positive for $$r>0$$.
The small-radius region has positive probability for every $$\theta$$; outside it the estimators agree.
Integrating proves strict dominance.

The proof averages over directions at a fixed radius.
It does not claim that clipping improves the realized loss for every observation and every true vector.

</details>

## 8. Is the positive part the end of the story?

No: the positive-part rule is itself inadmissible.
Its kink is a clue; admissible rules in this normal-mean problem must have a smoother generalized Bayes form.
But this does not mean that arbitrary smoothing improves its risk.

[Maruyama's paper](https://arxiv.org/pdf/math/0701206) constructs a smooth family, indexed by $$\alpha\geq1$$, that dominates ordinary James–Stein.
At $$\alpha=1$$ it is the admissible generalized Bayes estimator associated with the improper harmonic prior $$\pi(\theta)\propto\|\theta\|^{2-p}$$.
That endpoint ties James–Stein's risk at zero; for $$\alpha>1$$, the family improves strictly there.
As $$\alpha\to\infty$$, the estimators converge to positive-part James–Stein.
These are comparisons with **ordinary James–Stein**; they do not establish that each smooth member dominates the positive-part rule.
The paper leaves admissibility for $$\alpha>1$$ unresolved.

“Admissible” itself means that no rule improves risk everywhere, not that a rule has the lowest risk at every parameter.
There can be several admissible rules with different strengths.

The lasting lesson is about the task we ask an estimator to perform.
When we assess several estimates together, insisting that each remain unbiased can waste information about the scale of their collective noise.
A carefully chosen amount of bias lowers total risk—even without a prior that says the unknown means belong together.

## Sources and further reading

- [UC Berkeley, *The James–Stein Estimator*, Stat 210A, Fall 2024](https://stat210a.berkeley.edu/fall-2024/reader/jamesstein.html): empirical Bayes intuition, the bias–variance tradeoff, and Stein's risk identity.
- [Yuzo Maruyama, *Some Notes on Improving upon the James–Stein Estimator* (2007)](https://arxiv.org/pdf/math/0701206): positive-part shrinkage, admissibility, and the smooth family in Theorem 3.2.
- [My working note, *James–Stein Estimators* (Obsidian)](obsidian://open?vault=Obsidian&file=Misc%2FNotes%2FJames-Stein%20Estimators): the starting risk calculation. This link opens in the local vault; the article is self-contained.
