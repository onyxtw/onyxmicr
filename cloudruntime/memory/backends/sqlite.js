const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "earth.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS memory (ts INTEGER, type TEXT, data TEXT)");
});

function write(type, data) {
  db.run(
    "INSERT INTO memory (ts, type, data) VALUES (?, ?, ?)",
    [Date.now(), type, JSON.stringify(data)]
  );
}

module.exports = { write };
