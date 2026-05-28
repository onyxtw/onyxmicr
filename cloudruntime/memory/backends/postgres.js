const { Client } = require("pg");

let client = null;
let ready = false;

async function init() {
  try {
    client = new Client({
      host: process.env.ONYX_PG_HOST || "localhost",
      user: process.env.ONYX_PG_USER || "postgres",
      password: process.env.ONYX_PG_PASS || "",
      database: process.env.ONYX_PG_DB || "onyx",
    });
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS memory (
        ts BIGINT,
        type TEXT,
        data TEXT
      )
    `);
    ready = true;
  } catch (e) {
    ready = false;
  }
}

init();

async function write(type, data) {
  if (!ready) return;
  await client.query(
    "INSERT INTO memory (ts, type, data) VALUES ($1, $2, $3)",
    [Date.now(), type, JSON.stringify(data)]
  );
}

module.exports = { write, ready };
