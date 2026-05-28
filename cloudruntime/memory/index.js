const pg = require("./backends/postgres");
const sqlite = require("./backends/sqlite");
const file = require("./backends/file");

function write(type, data) {
  if (pg.ready) return pg.write(type, data);
  try { return sqlite.write(type, data); }
  catch { return file.write(type, data); }
}

module.exports = { write };
