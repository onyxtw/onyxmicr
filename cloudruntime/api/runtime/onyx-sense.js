async function handler(req, res) {
  try {
    const payload = req.body || {};
    const source = payload.source || "unknown";
    const data = payload.data || {};

    res.json({
      ok: true,
      module: "onyx-sense",
      tensionField: "sensor",
      signalModel: "proto",
      note: "感測層占位模組（ONYX-SENSE）",
      echo: { source, data }
    });
  } catch (err) {
    console.error("[ONYX-SENSE] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-SENSE internal error" });
  }
}
module.exports = handler;
