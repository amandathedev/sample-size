import jstat from 'jstat';

export function calculateSampleSize(baselineRate, minDetectableEffect, option, power, significanceLevel) {
  // Convert percentages to decimals
  baselineRate = baselineRate / 100;
  minDetectableEffect = minDetectableEffect / 100;
  power = power / 100;
  significanceLevel = significanceLevel / 100;

  // Calculate Z-scores based on the significance level and power
  const zAlphaOver2 = jstat.normal.inv(1 - significanceLevel / 2, 0, 1);
  const zBeta = jstat.normal.inv(power, 0, 1);

  // Baseline conversion rate (p)
  const p = baselineRate > 0.5 ? 1.0 - baselineRate : baselineRate;

  // Calculate standard deviations
  const sd1 = Math.sqrt(2 * p * (1 - p));
  const sd2 = Math.sqrt(p * (1 - p) + (p + minDetectableEffect) * (1 - p - minDetectableEffect));

  // Calculate the numerator and denominator for the sample size formula
  const numerator = Math.pow(zAlphaOver2 * sd1 + zBeta * sd2, 2);
  const denominator = Math.pow(minDetectableEffect, 2);

  // Calculate and return the sample size
  const sampleSize = numerator / denominator;
  return Math.ceil(sampleSize);
}
