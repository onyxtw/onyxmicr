const axios = require("axios");

async function handler(req, res) {
  try {
    const LFP = req.body || {};

    // 1) 利稻地脈資料（LFP） → 地脈張力推論
    const tension = inferTension(LFP);

    // 2) 呼叫語意層（semantic）
    const semantic = await axios.post(
      "http://localhost:3000/api/runtime/cloud?path=onyx-semantic",
      { tension, source: "lidao" }
    );

    // 3) 呼叫行動層（tact）
    const tact = await axios.post(
      "http://localhost:3000/api/runtime/cloud?path=onyx-tact",
      {
        semanticMode: semantic.data.semanticMode,
        semanticTension: semantic.data.semanticTension
      }
    );

    // 4) 呼叫儀表板層（console）
    const consolePacket = await axios.post(
      "http://localhost:3000/api/runtime/cloud?path=onyx-console",
      {
        earthTension: tension,
        source: "lidao",
        semanticMode: semantic.data.semanticMode,
        semanticTension: semantic.data.semanticTension,
        actionMode: tact.data.actionMode,
        actionIntensity: tact.data.actionIntensity,
        actionSuggestion: tact.data.actionSuggestion,
        priority: tact.data.priority
      }
    );

    res.json({
      ok: true,
      module: "onyx-lidao",
      tension,
      semantic: semantic.data,
      tact: tact.data,
      console: consolePacket.data
    });

  } catch (err) {
    console.error("[ONYX-LIDAO] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-LIDAO internal error" });
  }
}

// 利稻地脈張力推論模型（LFP → tension）
function inferTension(LFP) {
  const { geothermal, waterPressure, wasteHeat, microseismic } = LFP;

  if (geothermal > 70 || wasteHeat > 0.5) return "thermal";
  if (waterPressure < 1.0) return "hydro";
  if (microseismic > 3.0) return "structural";
  return "sensor";
}

module.exports = handler;
