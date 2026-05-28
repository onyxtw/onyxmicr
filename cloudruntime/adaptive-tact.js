module.exports = function adaptiveIntensity(tension, trend = 0) {
  const base = {
    thermal: 0.8,
    hydro: 0.6,
    structural: 0.9,
    sensor: 0.1
  }[tension] || 0.2;

  const adjusted = base + trend * 0.2;
  return Math.min(1, Math.max(0.1, adjusted));
};
