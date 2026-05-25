const { OrionLinguaV2_1 } = require("../../../dist/intelligence/orion/lingua.js");

const engine = new OrionLinguaV2_1();

module.exports = async function handler(req, res) {
  try {
    const { text, language } = req.body || {};
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    const result = await engine.route({ text, language: language || "zh-TW" });

    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (err) {
    console.error("ORION-LINGUA error", err);
    return res.status(500).json({ error: "internal_error" });
  }
};
