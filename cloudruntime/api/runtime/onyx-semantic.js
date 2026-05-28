async function handler(req, res) {
  try {
    const payload = req.body || {};
    const tension = payload.tension || "unknown";
    const source = payload.source || "unknown";

    const mapping = {
      structural: { mode: "analysis", tension: "medium" },
      hydro:      { mode: "flow",     tension: "low" },
      thermal:    { mode: "alert",    tension: "high" },
      sensor:     { mode: "sense",    tension: "variable" }
    };

    const result = mapping[tension] || { mode: "unknown", tension: "unknown" };

    res.json({
      ok: true,
      module: "onyx-semantic",
      source,
      inputTension: tension,
      semanticMode: result.mode,
      semanticTension: result.tension,
      utterance: `已接收 ${tension} 張力，語意模式：${result.mode}`
    });
  } catch (err) {
    console.error("[ONYX-SEMANTIC] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-SEMANTIC internal error" });
  }
}

module.exports = handler;
