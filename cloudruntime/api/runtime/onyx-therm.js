async function handler(req, res) {
  try {
    const payload = req.body || {};
    const source = payload.source || "unknown";
    const data = payload.data || {};

    res.json({
      ok: true,
      module: "onyx-therm",
      tensionField: "thermal",
      heatModel: "proto",
      note: "熱能層占位模組（ONYX-THERM）",
      echo: { source, data }
    });
  } catch (err) {
    console.error("[ONYX-THERM] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-THERM internal error" });
  }
}
module.exports = handler;
