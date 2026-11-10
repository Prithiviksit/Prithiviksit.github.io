---
layout: fun-article
title: "The James–Stein Surprise: How Biased Estimates Beat Sample Averages"
description: "Why shrinking three or more normal means lowers total expected squared error, and how positive-part shrinkage improves further."
group: Mathematics
subtitle: "What better means, where the gain comes from, and how to improve James–Stein further."
lead: "You estimate several quantities by taking their sample averages. Someone pulls all your estimates toward zero—and can guarantee a smaller total expected error. How can that work?"
permalink: /fun-stuff/mathematics/james-stein-estimator.html
date: 2026-11-08T11:19:53-07:00
published: true
---

## 1. A strange way to improve an average

Imagine estimating the average effects of ten different treatments.
Each experiment produces a sample average, and each average has the same known standard error.
The obvious procedure is to report those ten averages.
Each uses the observations from its own experiment; each is unbiased.

Now someone proposes a peculiar adjustment: move all ten estimates toward zero, using a common factor calculated from their combined size.
An estimate of one treatment will then depend on observations from the other nine—even if their effects have no known relationship.

The James–Stein result says that, under independent normal sampling with equal known variances, a particular version of this adjustment has **smaller total expected squared error for every possible vector of true effects**, whenever there are at least three effects to estimate.
The guarantee holds even for large true effects, with the effects treated as fixed unknown parameters.

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

For James–Stein, the improvement over $$X$$ is strict at every finite $$\theta$$.
Three features of this criterion are worth keeping in mind:

- **Combined error across coordinates:** an individual coordinate $$\delta_i(X)$$ can have higher expected squared error than $$X_i$$, even while the sum across all $$p$$ coordinates is strictly smaller.
- **Expected error over repeated sampling:** on any single dataset, the shrunk estimate can be farther from $$\theta$$ than $$X$$; the dominance guarantee holds in expectation.
- **Dimension $$p$$ versus sample size $$n$$:** $$p\geq3$$ counts the number of means being estimated simultaneously, whereas $$n$$ simply scales the common variance $$v=\sigma^2/n$$.

## 3. The adjustment: trust a large signal more

Write $$\|X\|^2=\sum_{i=1}^p X_i^2$$ for the vector's squared length.
For $$p\geq3$$, the James–Stein estimator is

$$
\boxed{\delta_{\mathrm{JS}}(X)
=\left(1-\frac{(p-2)v}{\|X\|^2}\right)X,}
$$

with $$\delta_{\mathrm{JS}}(0)=0$$.

The numerator $$(p-2)v$$ measures the expected scale of sampling noise across the $$p$$ coordinates, while the denominator $$\|X\|^2$$ measures the observed vector's total squared magnitude.
When $$\|X\|^2$$ is large relative to the noise level, the shrinkage factor sits close to $$1$$ and barely touches $$X$$; when $$\|X\|^2$$ is small, it pulls $$X$$ strongly toward the origin.
Notice too what happens when $$\|X\|^2<(p-2)v$$: the multiplier turns negative and flips every coordinate's sign—an overshoot that Section 7 will fix.

For a concrete numerical example, take $$p=3$$, $$v=1$$, and observed averages $$X=(2,1,2)$$.
Since $$\|X\|^2=9$$, the shrinkage factor is $$1-1/9=8/9$$, and James–Stein reports

$$
\delta_{\mathrm{JS}}(X)
=\frac89(2,1,2)
=\left(\frac{16}{9},\frac89,\frac{16}{9}\right).
$$

## 4. Why moving toward zero can help

Random noise systematically inflates the squared length of the observed vector:

$$
\mathbb E_\theta\|X\|^2=\|\theta\|^2+pv.
$$

Even when every true effect is zero ($$\theta=0$$), $$\|X\|^2$$ has expected value $$pv>0$$.
Taking the raw vector $$X$$ at face value mistakes that radial noise inflation for true signal; pulling the vector inward strips out part of the noise.

We can see the tradeoff explicitly by considering a *fixed* shrinkage multiplier $$b$$:

$$
R(\theta,bX)
=\underbrace{(1-b)^2\|\theta\|^2}_{\text{squared bias}}
+\underbrace{b^2pv}_{\text{variance}}.
$$

Starting at the unbiased choice $$b=1$$, nudging $$b$$ slightly below $$1$$ reduces the variance term $$b^2pv$$ to first order, while the squared-bias term $$(1-b)^2\|\theta\|^2$$ grows only to second order.
Differentiating with respect to $$b$$ gives the ideal multiplier for a known $$\theta$$:

$$
b^*=\frac{\|\theta\|^2}{\|\theta\|^2+pv}.
$$

This **oracle multiplier** depends on the unknown signal strength $$\|\theta\|^2$$: weak signals call for heavy shrinkage, and strong signals call for light shrinkage.
Any fixed $$b<1$$ eventually loses to $$X$$ when $$\|\theta\|$$ is large enough, because its squared bias grows without bound.

What if we care more about avoiding bias than about reducing variance?
Weighting squared bias by $$\lambda>0$$ produces the modified objective

$$
\lambda(1-b)^2\|\theta\|^2+b^2pv,
$$

which is minimized at

$$
b_\lambda^*=\frac{\lambda\|\theta\|^2}{\lambda\|\theta\|^2+pv}.
$$

Increasing $$\lambda$$ pushes $$b_\lambda^*$$ closer to $$1$$; ordinary squared-error loss corresponds to $$\lambda=1$$.

### Explore the tradeoff

The interactive visual below tracks a single coordinate with true mean $$\theta$$ and sampling variance $$v$$.
Shrinking by $$b$$ shifts the sampling distribution's center from $$\theta$$ to $$b\theta$$ while narrowing its variance from $$v$$ to $$b^2v$$.
Toggle between the density and CDF views, or vary the bias weight $$\lambda$$ to see how $$b_\lambda^*$$ responds.
Because the bias–variance decomposition of squared error depends only on the first two moments, standardized Normal, Laplace, and uniform noise all share the exact same risk curves under fixed linear shrinkage $$bX$$.

{% include james-stein-tradeoff.html %}

To achieve dominance across *all* $$\theta$$ without knowing $$\|\theta\|^2$$ in advance, the James–Stein estimator replaces the unknown denominator $$\|\theta\|^2+pv$$ in the oracle multiplier $$b^*=1-pv/(\|\theta\|^2+pv)$$ with the observed squared norm $$\|X\|^2$$.
Because the multiplier now depends on the data $$X$$, computing its exact risk requires Stein's lemma—which explains why the numerator changes from $$pv$$ to $$(p-2)v$$.

## 5. The short calculation behind the surprise

Consider the general data-dependent shrinkage family

$$
\delta_a(X)=\left(1-\frac{av}{\|X\|^2}\right)X,
$$

indexed by a constant $$a$$.
Stein's integration-by-parts identity (derived in the technical note below) yields

$$
\mathbb E_\theta\!\left[
\frac{(X-\theta)^\top X}{\|X\|^2}\right]
=v(p-2)\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right].
$$

Expanding the expected squared error $$R(\theta,\delta_a)=\mathbb E_\theta\|\delta_a(X)-\theta\|^2$$ and substituting this identity gives

$$
\begin{aligned}
R(\theta,\delta_a)
&=pv+\bigl[a^2-2a(p-2)\bigr]v^2
\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]\\
&=pv+v^2\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]\\
&\qquad\times\bigl[(a-(p-2))^2-(p-2)^2\bigr].
\end{aligned}
$$

The quadratic in $$a$$ is minimized at $$a=p-2$$ for *every* value of $$\theta$$ simultaneously!
Plugging in $$a=p-2$$ gives the exact risk of the James–Stein estimator:

$$
\boxed{R(\theta,\delta_{\mathrm{JS}})
=pv-(p-2)^2v^2
\mathbb E_\theta\!\left[\frac1{\|X\|^2}\right]
<pv.}
$$

Whenever $$p\geq3$$, $$\mathbb E_\theta[1/\|X\|^2]$$ is finite and strictly positive, so $$\delta_{\mathrm{JS}}$$ strictly dominates $$X$$ across the entire parameter space $$\mathbb R^p$$ (and in fact any choice of $$a$$ in the interval $$0<a<2(p-2)$$ dominates $$X$$).

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
Near zero, integrating $$\|x\|^{-2}$$ against a bounded density has radial order $$\int_0^1 r^{p-3}\,dr$$, finite exactly when $$p>2$$; the Gaussian tails make the remaining integral finite.
Dominated convergence therefore gives the displayed identity and validates the risk expansion.

</details>

The threshold $$p\geq3$$ is sharp: in dimensions $$p=1$$ and $$p=2$$, the sample mean $$X$$ is admissible under squared-error loss, and no estimator can improve on it everywhere.

At $$\theta=0$$, the risk reduction is dramatic.
Because $$\|X\|^2/v$$ follows a chi-squared distribution with $$p$$ degrees of freedom, $$\mathbb E_0[v/\|X\|^2]=1/(p-2)$$, which collapses the risk at the origin to $$R(0,\delta_{\mathrm{JS}})=pv-(p-2)v=2v$$ regardless of how large $$p$$ is:

| Number of means | Risk of sample averages at zero | Risk of James–Stein at zero |
| --- | --- | --- |
| 3 | $$3v$$ | $$2v$$ |
| 5 | $$5v$$ | $$2v$$ |
| 10 | $$10v$$ | $$2v$$ |

As $$\|\theta\|\to\infty$$, $$\mathbb E_\theta[1/\|X\|^2]\to0$$, so the risk of $$\delta_{\mathrm{JS}}$$ approaches $$pv$$ from below.

## 6. Must we shrink toward zero?

There is nothing special about the origin: for any pre-chosen target vector $$m\in\mathbb R^p$$, applying the James–Stein adjustment to $$X-m$$ yields

$$
\delta_m(X)=m+
\left(1-\frac{(p-2)v}{\|X-m\|^2}\right)(X-m),
$$

which dominates $$X$$ for every $$\theta$$ and achieves its largest risk reduction when $$\theta$$ is close to $$m$$.

Better yet, instead of picking a target vector in advance, we can shrink the coordinates toward their own **grand average** $$\bar X=p^{-1}\sum_{i=1}^p X_i$$, pulling the ten treatment estimates toward one another rather than toward zero.

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

Estimating the common level leaves one fewer dimension available for shrinkage.

</details>

## 7. Better than James–Stein: stop at zero

Whenever $$\|X\|^2<(p-2)v$$, the ordinary James–Stein multiplier $$1-(p-2)v/\|X\|^2$$ turns negative and pushes the estimate past zero into the opposite orthant.
Truncating the multiplier at zero eliminates that sign reversal and gives the **positive-part James–Stein estimator**:

$$
\boxed{\delta_{\mathrm{JS}}^+(X)
=\max\!\left\{0,1-\frac{(p-2)v}{\|X\|^2}\right\}X.}
$$

For instance, when $$p=3$$, $$v=1$$, and $$X=(1/2,0,0)$$, ordinary James–Stein overshoots to $$(-3/2,0,0)$$, whereas $$\delta_{\mathrm{JS}}^+$$ stops at $$(0,0,0)$$.
As proved in the technical note below, truncating the negative multiplier **strictly lowers risk at every $$\theta\in\mathbb R^p$$**—which means the ordinary James–Stein estimator is itself inadmissible!

### See inadmissibility in the risk curves

By rotational symmetry, the risk of each estimator depends on $$\theta$$ only through its Euclidean norm $$\|\theta\|$$.
The interactive chart below sets $$v=1$$ and plots risk as a function of $$\|\theta\|$$: the sample mean sits flat at $$p$$, ordinary James–Stein lies strictly below $$p$$ everywhere, and the positive-part estimator lies strictly below ordinary James–Stein.
By contrast, a fixed linear shrinkage estimator $$bX$$ ($$0\leq b<1$$) beats $$X$$ near the origin but crosses above $$p$$ once $$\|\theta\|$$ grows large.

{% include james-stein-dominance.html %}

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

</details>

## 8. Beyond the positive-part estimator

Even $$\delta_{\mathrm{JS}}^+$$ is not the final word: because of the sharp corner where its multiplier hits zero, it too is inadmissible!
By a general theorem of Brown (1971), any admissible estimator of a multivariate normal mean must be analytic, corresponding to a generalized Bayes rule.

[Yuzo Maruyama (2007)](https://arxiv.org/pdf/math/0701206) constructs a smooth family of shrinkage estimators, indexed by $$\alpha\geq1$$, that bridges generalized Bayes rules and positive-part shrinkage: at $$\alpha=1$$ it gives the admissible generalized Bayes estimator under the harmonic prior $$\pi(\theta)\propto\|\theta\|^{2-p}$$, and as $$\alpha\to\infty$$ it converges pointwise to $$\delta_{\mathrm{JS}}^+$$.

Across all of these refinements, the core statistical lesson is the same: when we evaluate three or more estimates by their combined squared error, the pooled norm $$\|X\|^2$$ tells us how much of the apparent spread across coordinates is just sampling noise—and using that pooled scale to shrink the individual averages beats unbiased estimation everywhere.

## Sources and further reading

- [UC Berkeley, *The James–Stein Estimator*, Stat 210A, Fall 2024](https://stat210a.berkeley.edu/fall-2024/reader/jamesstein.html): empirical Bayes intuition, the bias–variance tradeoff, and Stein's risk identity.
- [Yuzo Maruyama, *Some Notes on Improving upon the James–Stein Estimator* (2007)](https://arxiv.org/pdf/math/0701206): positive-part shrinkage, admissibility, and the smooth family in Theorem 3.2.
