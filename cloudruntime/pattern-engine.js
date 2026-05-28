const memory = require('./memory');

let history = [];
let maxPoints = 80;

function addPoint(tension, lfp) {
history.push({ ts: Date.now(), tension, lfp });
if (history.length > maxPoints) history.shift();
memory.write('pattern_raw', { tension, lfp });
}

function detectCycle() {
if (history.length < 10) return null;
const values = history.map(h => h.tension);
const rising = values.slice(0,5).every((v,i,a)=> i===0 || v>=a[i-1]);
const falling = values.slice(-5).every((v,i,a)=> i===0 || v<=a[i-1]);
if (rising && falling) return 'thermal_cycle';
return null;
}

function detectAnomaly() {
if (history.length < 5) return null;
const last = history[history.length-1].tension;
const avg = history.slice(-5).reduce((a,b)=>a+b.tension,0)/5;
if (Math.abs(last-avg) > 0.4) return 'tension_spike';
return null;
}

function detectPrecursors() {
if (history.length < 12) return null;
const seq = history.slice(-12).map(h=>h.tension);
const variance = seq.reduce((a,b)=>a+b,0)/seq.length;
if (variance > 0.7) return 'microseismic_precursor';
return null;
}

function analyze() {
const cycle = detectCycle();
const anomaly = detectAnomaly();
const precursor = detectPrecursors();
const result = { cycle, anomaly, precursor };
memory.write('pattern', result);
return result;
}

module.exports = { addPoint, analyze };
