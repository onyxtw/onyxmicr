const axios = require('axios');
const inferTension = require('./onyx-tension');
const memory = require('../../memory');
const stabilizer = require('../../stabilizer');
const adaptive = require('../../adaptive-tact');
const trendEngine = require('../../trend-engine');
const pattern = require('../../pattern-engine');

async function fullCycle() {
try {
let LFP = global.LFP || {};
let tension = inferTension(LFP);
tension = stabilizer.smooth(tension);

memory.write('lfp', LFP);
memory.write('tension', { tension });

trendEngine.addPoint(tension);
const trend = trendEngine.computeTrend();

pattern.addPoint(tension, LFP);
const patternResult = pattern.analyze();

const semantic = await axios.post(
'http://localhost:3000/api/runtime/cloud?path=onyx-semantic',
{ tension, trend, pattern: patternResult, source: 'lidao' }
);

const intensity = adaptive(tension, trend, patternResult);

const tact = await axios.post(
'http://localhost:3000/api/runtime/cloud?path=onyx-tact',
{
semanticMode: semantic.data.semanticMode,
semanticTension: semantic.data.semanticTension,
intensity,
pattern: patternResult
}
);

memory.write('tact', tact.data);

await axios.post(
'http://localhost:3000/api/runtime/cloud?path=onyx-console',
{
earthTension: tension,
trend,
pattern: patternResult,
source: 'lidao',
semanticMode: semantic.data.semanticMode,
semanticTension: semantic.data.semanticTension,
actionMode: tact.data.actionMode,
actionIntensity: tact.data.actionIntensity,
actionSuggestion: tact.data.actionSuggestion,
priority: tact.data.priority
}
);

global.LFP = LFP;

} catch (err) {
console.error('[ONYX-CYCLE] ERROR:', err);
}
}

setInterval(fullCycle, 5000);
module.exports = fullCycle;
