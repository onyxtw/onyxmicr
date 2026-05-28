function inferTension(LFP) {
  const {
    geothermal = 0,
    wasteHeat = 0,
    surfaceTemp = 0,
    waterPressure = 1,
    rainfall = 0,
    groundwaterDrop = 0,
    microseismic = 0,
    rockShift = 0,
    slopeChange = 0
  } = LFP;

  if (geothermal > 70 || wasteHeat > 0.5 || surfaceTemp > 45)
    return "thermal";

  if (waterPressure < 0.9 || rainfall > 20 || groundwaterDrop > 0.3)
    return "hydro";

  if (microseismic > 3 || rockShift > 0.2 || slopeChange > 0.1)
    return "structural";

  return "sensor";
}

module.exports = inferTension;
