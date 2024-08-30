import jstat from 'jstat';

export function calculateSampleSize(baselineRate, minDetectableEffect, option, power, significanceLevel) {
  // Convert percentages to decimals
  baselineRate = baselineRate / 100;
  minDetectableEffect = minDetectableEffect / 100;
  power = power / 100;
  significanceLevel = significanceLevel / 100;

  // Calculate Z-scores based on the significance level and power
  const zAlphaOver2 = jstat.normal.inv(1 - significanceLevel / 2, 0, 1);
  // Calculate the Z-score for the statistical power (1 - beta).
  const zBeta = jstat.normal.inv(power, 0, 1);

  // Calculate the effect size (delta) based on the option
  const delta = option === 'Absolute' ? minDetectableEffect : baselineRate * minDetectableEffect;

  // Baseline conversion rate (p1)
  const p1 = baselineRate;

  // Conversion rate after applying the effect (p2)
  const p2 = p1 + delta;

  // Calculate variance for p1 and p2
  const varianceP1 = p1 * (1 - p1);
  const varianceP2 = p2 * (1 - p2);

  // Calculate the numerator and denominator for the sample size formula
  const numerator = Math.pow(zAlphaOver2 + zBeta, 2) * (varianceP1 + varianceP2);
  const denominator = Math.pow(delta, 2);

  // Calculate and return the sample size
  const sampleSize = numerator / denominator;
  return Math.ceil(sampleSize);
}
