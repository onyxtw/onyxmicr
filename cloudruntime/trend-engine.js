const memory = require("./memory");

let history = [];
let maxPoints = 50;

function addPoint(tension) {
  history.push({ ts: Date.now(), tension });
  if (history.length > maxPoints) history.shift();
  memory.write("trend", { tension });
}

function computeTrend() {
  if (history.length < 3) return 0;

  let score = 0;
  for (let i = 1; i < history.length; i++) {
    if (history[i].tension !== history[i - 1].tension) {
      score += (history[i].tension > history[i - 1].tension) ? 1 : -1;
    }
  }

  return Math.max(-1, Math.min(1, score / history.length));
}

module.exports = { addPoint, computeTrend };
