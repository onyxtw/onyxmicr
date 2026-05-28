async function handler(req, res) {
  try {
    const payload = req.body || {};
    const source = payload.source || "unknown";
    const data = payload.data || {};

    res.json({
      ok: true,
      module: "onyx-hydro",
      tensionField: "hydro",
      flowModel: "proto",
      note: "水文層占位模組（ONYX-HYDRO）",
      echo: { source, data }
    });
  } catch (err) {
    console.error("[ONYX-HYDRO] ERROR:", err);
    res.status(500).json({ ok: false, error: "ONYX-HYDRO internal error" });
  }
}
module.exports = handler;
