async function handler(req, res) {
  try {
    const payload = req.body || {};
    const mode = payload.semanticMode || "unknown";
    const tension = payload.semanticTension || "unknown";

    // 語意 → 行動映射
    const mapping = {
      alert: {
        actionMode: "intervene",
        actionIntensity: "high",
        actionSuggestion: "建議立即檢查熱源或降低負載",
        priority: 1
      },
      analysis: {
        actionMode: "observe",
        actionIntensity: "medium",
        actionSuggestion: "持續分析地質張力變化",
        priority: 2
      },
      flow: {
        actionMode: "adjust",
        actionIntensity: "low",
        actionSuggestion: "可微調水文流量或監測變化",
        priority: 3
      },
      sense: {
        actionMode: "monitor",
        actionIntensity: "variable",
        actionSuggestion: "等待更多感測資料",
        priority: 4
      }
    };

    const result = mapping[mode] || {
      actionMode: "unknown",
      actionIntensity: "unknown",
      actionSuggestion: "無法判斷行動",
      priority: 99
    };

    res.json({
      ok: true,
      module: "onyx-tact",
      inputMode: mode,
      inputTension: tension,
      ...result
    });
  } catch (err) {
    console.error("[ONYX-TACT] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-TACT internal error" });
  }
}

module.exports = handler;
