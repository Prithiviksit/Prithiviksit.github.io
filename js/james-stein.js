/* Fixed-shrinkage moments and Gaussian James–Stein risk, with article controls. */
(function () {
  'use strict';

  function logGamma(z) {
    const c = [676.5203681218851, -1259.1392167224028, 771.3234287776531,
      -176.6150291621406, 12.507343278686905, -0.13857109526572012,
      9.984369578019572e-6, 1.5056327351493116e-7];
    z -= 1;
    let sum = 0.99999999999980993;
    c.forEach((a, i) => { sum += a / (z + i + 1); });
    const t = z + 7.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(sum);
  }

  // Lower regularized gamma, used only for x <= 4 and shape >= 0.5 here.
  function gammaP(shape, x) {
    if (x === 0) return 0;
    let term = 1 / shape, sum = term;
    for (let n = 1; n < 500; n++) {
      term *= x / (shape + n);
      sum += term;
      if (term < sum * 1e-15) break;
    }
    return Math.min(1, Math.max(0, sum * Math.exp(-x + shape * Math.log(x) - logGamma(shape))));
  }

  function gaussianRisks(p, radius) {
    const a = p - 2, poissonMean = radius * radius / 2;
    let weight = Math.exp(-poissonMean), mass = 0, inverseMoment = 0, positive = 0;
    // W = ||X||² is a Poisson mixture of chi-squared variables, df = p + 2k.
    for (let k = 0; k < 250; k++) {
      const df = p + 2 * k;
      mass += weight;
      inverseMoment += weight / (df - 2);
      // SURE: W-p inside W<=a; p-a²/W outside. Truncated moments are central chi-square CDFs.
      const truncatedRisk = p + df * gammaP((df + 2) / 2, a / 2)
        - 2 * p * gammaP(df / 2, a / 2)
        - a * a / (df - 2) * (1 - gammaP((df - 2) / 2, a / 2));
      positive += weight * truncatedRisk;
      if (k > poissonMean && 1 - mass < 1e-14) break;
      weight *= poissonMean / (k + 1);
    }
    return { ordinary: p - a * a * inverseMoment, positive };
  }

  function fixedMoments(mean, variance, b, weight = 1) {
    const bias2 = (1 - b) ** 2 * mean ** 2, samplingVariance = b * b * variance;
    return { bias2, variance: samplingVariance, mse: bias2 + samplingVariance,
      objective: weight * bias2 + samplingVariance,
      optimum: weight * mean * mean / (weight * mean * mean + variance) };
  }

  function normalCDF(z) {
    const x = Math.abs(z) / Math.SQRT2, t = 1 / (1 + 0.3275911 * x);
    const erf = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
      - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return (1 + Math.sign(z) * erf) / 2;
  }

  function noise(family, z, cdf) {
    if (family === 'normal') return cdf ? normalCDF(z) : Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI);
    if (family === 'laplace') return cdf ? (z < 0 ? Math.exp(Math.SQRT2 * z) / 2 : 1 - Math.exp(-Math.SQRT2 * z) / 2)
      : Math.exp(-Math.SQRT2 * Math.abs(z)) / Math.SQRT2;
    return cdf ? Math.max(0, Math.min(1, (z + Math.sqrt(3)) / (2 * Math.sqrt(3))))
      : (Math.abs(z) <= Math.sqrt(3) ? 1 / (2 * Math.sqrt(3)) : 0);
  }

  const api = { gaussianRisks, fixedMoments, noise, gammaP };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;
  if (!document.getElementById('js-tradeoff')) return;

  const colors = { blue: '#286898', gold: '#a46516', purple: '#78508f', green: '#26734c', gray: '#55585c' };
  const byId = id => document.getElementById(id);
  const value = id => Number(byId(id).value);
  const fmt = x => x.toFixed(2);
  const grid = (a, b, n = 160) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
  const escapeText = text => String(text).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

  function makeChart(id, xmin, xmax, ymax, xlabel, ylabel, description) {
    const host = byId(id), width = Math.max(280, Math.round(host.getBoundingClientRect().width));
    const height = 290, left = 46, right = width - 14, top = 32, bottom = height - 44;
    const sx = x => left + (x - xmin) / (xmax - xmin) * (right - left);
    const sy = y => bottom - y / ymax * (bottom - top);
    let body = `<title>${escapeText(description)}</title><defs><clipPath id="${id}-clip"><rect x="${left}" y="${top}" width="${right-left}" height="${bottom-top}"/></clipPath></defs>`;
    body += `<text class="js-axis-title" x="${left}" y="17">${escapeText(ylabel)}</text>`;
    for (let i = 0; i <= 4; i++) {
      const y = ymax * i / 4, py = sy(y);
      body += `<line x1="${left}" x2="${right}" y1="${py}" y2="${py}" stroke="#dedbd2"/><text x="${left - 8}" y="${py + 4}" text-anchor="end">${Number(y.toFixed(2))}</text>`;
      const x = xmin + (xmax - xmin) * i / 4, px = sx(x);
      body += `<text x="${px}" y="${bottom + 20}" text-anchor="middle">${Number(x.toFixed(2))}</text>`;
    }
    body += `<text class="js-axis-title" x="${(left+right)/2}" y="${height-3}" text-anchor="middle">${escapeText(xlabel)}</text>`;
    const content = [];
    return {
      series(points, color, dash = '') {
        const path = points.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`).join(' ');
        content.push(`<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`);
      },
      vertical(x, color, dash = '3 4') {
        content.push(`<line x1="${sx(x)}" x2="${sx(x)}" y1="${top}" y2="${bottom}" stroke="${color}" stroke-dasharray="${dash}"/>`);
      },
      dot(x, y, color, label, hollow = false) {
        content.push(`<circle cx="${sx(x)}" cy="${sy(y)}" r="4.5" fill="${hollow ? '#faf9f6' : color}" stroke="${color}" stroke-width="2"><title>${escapeText(label)}</title></circle>`);
      },
      atom(x) {
        const px = sx(x);
        content.push(`<path d="M${px},${bottom} V${top+24} m-5,8 l5,-8 l5,8" fill="none" stroke="${colors.gold}" stroke-width="3"/>`);
        content.push(`<text x="${px+8}" y="${top+23}">Mass 1</text>`);
      },
      finish() { host.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img">${body}<g clip-path="url(#${id}-clip)">${content.join('')}</g></svg>`; }
    };
  }

  function niceMaximum(x) {
    const scale = 10 ** Math.floor(Math.log10(x));
    return [1, 2, 2.5, 4, 5, 8, 10].find(n => n * scale >= x) * scale;
  }

  function updateTradeoff() {
    const mean = value('js-mean'), variance = value('js-variance'), b = value('js-multiplier'), weight = value('js-weight');
    const family = byId('js-family').value, cdf = byId('js-view').value === 'cdf', sd = Math.sqrt(variance);
    for (const name of ['mean', 'variance', 'multiplier', 'weight']) byId(`js-${name}-value`).textContent = fmt(value(`js-${name}`));
    const moments = fixedMoments(mean, variance, b, weight);
    const xmin = Math.min(-1, mean - 4 * sd), xmax = Math.max(1, mean + 4 * sd);
    function distributionPoints(multiplier) {
      const center = multiplier * mean, scale = multiplier * sd;
      if (multiplier === 0) return [[xmin, 0], [0, 0], [0, 1], [xmax, 1]];
      const at = x => noise(family, (x - center) / scale, cdf) / (cdf ? 1 : scale);
      if (family === 'uniform') {
        const lo = center - Math.sqrt(3) * scale, hi = center + Math.sqrt(3) * scale, peak = 1 / (2 * Math.sqrt(3) * scale);
        return cdf ? [[xmin, 0], [lo, 0], [hi, 1], [xmax, 1]]
          : [[xmin, 0], [lo, 0], [lo, peak], [hi, peak], [hi, 0], [xmax, 0]];
      }
      // Include dense points near a concentrated shrunk distribution as well as the common axis grid.
      return [...new Set([...grid(xmin, xmax), ...grid(center - 5 * scale, center + 5 * scale, 200), center])]
        .filter(x => x >= xmin && x <= xmax).sort((x, y) => x - y).map(x => [x, at(x)]);
    }
    const original = distributionPoints(1), shrunk = distributionPoints(b);
    const ymax = cdf ? 1 : niceMaximum(Math.max(...original.map(p => p[1]), ...(b > 0 ? shrunk.map(p => p[1]) : [0])) * 1.15);
    const distChart = makeChart('js-distribution-chart', xmin, xmax, ymax, 'Estimate', cdf ? 'Cumulative probability' : 'Density',
      `${family} sampling ${cdf ? 'CDF' : 'density'}: original mean ${fmt(mean)}, shrunk mean ${fmt(b*mean)}. Variance falls from ${fmt(variance)} to ${fmt(moments.variance)}.`);
    distChart.vertical(mean, colors.gray);
    distChart.series(original, colors.blue, '7 4');
    if (b === 0 && !cdf) distChart.atom(0); else distChart.series(shrunk, colors.gold);
    distChart.finish();
    byId('js-distribution-note').textContent = b === 0
      ? 'At b = 0, every estimate is zero: a point mass of probability one. Its CDF jumps from 0 to 1 at zero.'
      : `Expected estimate: ${fmt(b * mean)}. True mean: ${fmt(mean)}. The ${family} shape is preserved by scaling; its spread contracts by b = ${fmt(b)}.`;

    const bs = grid(0, 1), bias = bs.map(x => [x, weight * (1-x)**2 * mean**2]);
    const variances = bs.map(x => [x, x*x*variance]);
    const objective = bs.map(x => [x, fixedMoments(mean, variance, x, weight).objective]);
    const riskChart = makeChart('js-tradeoff-chart', 0, 1, niceMaximum(Math.max(weight*mean*mean, variance)*1.12),
      'Multiplier b', 'Squared-error units', `Bias contribution, variance, and their sum. Minimizing b is ${fmt(moments.optimum)}.`);
    riskChart.series(bias, colors.gold, '7 4');
    riskChart.series(variances, colors.blue, '2 4');
    riskChart.series(objective, colors.purple);
    riskChart.vertical(b, colors.gray);
    riskChart.dot(b, moments.objective, colors.purple, `Selected b: ${fmt(b)}; objective: ${fmt(moments.objective)}`);
    riskChart.dot(moments.optimum, fixedMoments(mean, variance, moments.optimum, weight).objective, colors.green,
      `Minimum at b = ${fmt(moments.optimum)}`, true);
    riskChart.finish();
    byId('js-tradeoff-readout').textContent = `Squared bias ${fmt(moments.bias2)} + variance ${fmt(moments.variance)} = MSE ${fmt(moments.mse)}. `
      + `With λ = ${fmt(weight)}, the chosen objective is ${fmt(moments.objective)}. The green ring marks its minimum at b = ${fmt(moments.optimum)}.`;
  }

  const riskCache = new Map();
  function updateDominance() {
    const p = value('js-dimension'), b = value('js-fixed'), radius = value('js-signal');
    byId('js-fixed-value').textContent = fmt(b);
    byId('js-signal-value').textContent = fmt(radius);
    if (!riskCache.has(p)) riskCache.set(p, grid(0, 8, 160).map(r => ({ r, ...gaussianRisks(p, r) })));
    const data = riskCache.get(p), fixedRisk = r => (1-b)**2*r*r+b*b*p;
    const chart = makeChart('js-dominance-chart', 0, 8, niceMaximum(Math.max(p, fixedRisk(8))*1.12),
      'Signal size ‖θ‖', 'Total expected squared error',
      `Risk for ${p} normal means. James–Stein lies below sample averages, and positive part below James–Stein. Fixed shrinkage uses b = ${fmt(b)}.`);
    chart.series([[0, p], [8, p]], colors.gray, '7 4');
    chart.series(data.map(d => [d.r, fixedRisk(d.r)]), colors.gold, '2 4');
    chart.series(data.map(d => [d.r, d.ordinary]), colors.blue);
    chart.series(data.map(d => [d.r, d.positive]), colors.green);
    chart.vertical(radius, colors.gray);
    const selected = gaussianRisks(p, radius);
    const rows = [['Sample averages', p, colors.gray], ['Fixed bX', fixedRisk(radius), colors.gold],
      ['James–Stein', selected.ordinary, colors.blue], ['Positive part', selected.positive, colors.green]];
    rows.forEach(([name, risk, color]) => chart.dot(radius, risk, color, `${name}: ${risk.toFixed(4)}`));
    chart.finish();
    byId('js-risk-caption').textContent = `Total risk at ‖θ‖ = ${fmt(radius)} (p = ${p}, v = 1)`;
    byId('js-risk-rows').innerHTML = rows.map(([name, risk]) => `<tr><th scope="row">${name}</th><td>${risk.toFixed(4)}</td></tr>`).join('');
    byId('js-dominance-readout').textContent = b === 1
      ? 'At b = 1, fixed shrinkage coincides with the sample averages. The adaptive estimators have lower risk.'
      : `Fixed bX beats the sample averages for ‖θ‖ < ${fmt(Math.sqrt(p*(1+b)/(1-b)))} and has higher risk above that threshold. `
        + `At the selected signal size, positive-part shrinkage saves ${fmt(p-selected.positive)} units of risk relative to the sample averages.`;
  }

  byId('js-tradeoff').addEventListener('input', updateTradeoff);
  byId('js-dominance').addEventListener('input', updateDominance);
  byId('js-optimize').addEventListener('click', () => {
    const optimum = fixedMoments(value('js-mean'), value('js-variance'), 1, value('js-weight')).optimum;
    // Preserve the exact oracle value, including values between normal slider steps.
    byId('js-multiplier').step = 'any';
    byId('js-multiplier').value = optimum;
    updateTradeoff();
  });
  byId('js-reset').addEventListener('click', () => {
    Object.entries({family:'normal',view:'density',mean:2,variance:1,multiplier:0.7,weight:1}).forEach(([key, val]) => { byId(`js-${key}`).value = val; });
    byId('js-multiplier').step = '0.01';
    updateTradeoff();
  });
  // Keep keyboard arrow increments predictable after choosing an exact minimum.
  byId('js-multiplier').addEventListener('keydown', () => { byId('js-multiplier').step = '0.01'; });
  let frame;
  new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { updateTradeoff(); updateDominance(); }); })
    .observe(byId('js-tradeoff'));
  updateTradeoff();
  updateDominance();
}());
