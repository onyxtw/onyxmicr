const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function write(type, data) {
  const file = path.join(dir, `${type}.log`);
  fs.appendFileSync(file, JSON.stringify({ ts: Date.now(), ...data }) + "\n");
}

module.exports = { write };
