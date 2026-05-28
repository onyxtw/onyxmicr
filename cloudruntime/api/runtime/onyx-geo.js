async function handler(req, res) {
  try {
    const payload = req.body || {};
    const source = payload.source || "unknown";
    const data = payload.data || {};

    res.json({
      ok: true,
      module: "onyx-geo",
      tensionField: "structural",
      topology: "proto",
      note: "地質層占位模組（ONYX-GEO）",
      echo: { source, data }
    });
  } catch (err) {
    console.error("[ONYX-GEO] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-GEO internal error" });
  }
}
module.exports = handler;
