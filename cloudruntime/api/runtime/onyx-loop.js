const axios = require("axios");
const inferTension = require("./onyx-tension");
const stabilizer = require("../../stabilizer");
const memory = require("../../memory");

let lastTension = "sensor";

async function reactiveLoop() {
  try {
    const LFP = global.LFP || {};
    let tension = inferTension(LFP);
    tension = stabilizer.smooth(tension);

    if (tension !== lastTension && stabilizer.allowTrigger()) {
      memory.write("event", { from: lastTension, to: tension });
      await axios.post(
        "http://localhost:3000/api/runtime/cloud?path=onyx-lidao",
        LFP
      );
      lastTension = tension;
    }
  } catch (err) {
    console.error("[ONYX-LOOP] ERROR:", err);
  }
}

setInterval(reactiveLoop, 5000);
module.exports = reactiveLoop;
