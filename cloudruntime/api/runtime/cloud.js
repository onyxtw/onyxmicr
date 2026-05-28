const orionLingua = require("./orion-lingua");
const onyxGeo = require("./onyx-geo");
const onyxHydro = require("./onyx-hydro");
const onyxTherm = require("./onyx-therm");
const onyxSense = require("./onyx-sense");
const onyxSemantic = require("./onyx-semantic");
const onyxTact = require("./onyx-tact");
const onyxConsole = require("./onyx-console");
const onyxLidao = require("./onyx-lidao");

async function handler(req, res) {
  try {
    const path = (req.query.path || "").toString();

    switch (path) {
      case "orion-lingua": return orionLingua(req, res);
      case "onyx-geo": return onyxGeo(req, res);
      case "onyx-hydro": return onyxHydro(req, res);
      case "onyx-therm": return onyxTherm(req, res);
      case "onyx-sense": return onyxSense(req, res);
      case "onyx-semantic": return onyxSemantic(req, res);
      case "onyx-tact": return onyxTact(req, res);
      case "onyx-console": return onyxConsole(req, res);
      case "onyx-lidao": return onyxLidao(req, res);
      default:
        return res.status(404).json({ ok: false, error: "Unknown path: " + path });
    }
  } catch (err) {
    console.error("[CLOUD] FATAL ERROR:", err);
    return res.status(500).json({ ok: false, error: "CloudRuntime internal error" });
  }
}

module.exports = handler;
