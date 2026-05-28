async function handler(req, res) {
  try {
    const payload = req.body || {};

    const packet = {
      ok: true,
      module: "onyx-console",
      timestamp: Date.now(),

      // 地脈層
      earth: {
        tension: payload.earthTension || "unknown",
        source: payload.source || "unknown"
      },

      // 語意層
      semantic: {
        mode: payload.semanticMode || "unknown",
        tension: payload.semanticTension || "unknown"
      },

      // 行動層
      action: {
        mode: payload.actionMode || "unknown",
        intensity: payload.actionIntensity || "unknown",
        suggestion: payload.actionSuggestion || "none",
        priority: payload.priority || 99
      }
    };

    res.json(packet);
  } catch (err) {
    console.error("[ONYX-CONSOLE] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-CONSOLE internal error" });
  }
}

module.exports = handler;
