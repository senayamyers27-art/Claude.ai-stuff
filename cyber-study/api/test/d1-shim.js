/* A stand-in for Cloudflare D1 over Node's built-in SQLite, for tests and local development.
   Implements the parts of the D1 API the Worker uses: prepare().bind().first()/all()/run(). */
const { DatabaseSync } = require("node:sqlite");
const fs = require("fs"), path = require("path");

function createD1(file = ":memory:") {
  const db = new DatabaseSync(file);
  db.exec("PRAGMA foreign_keys = ON;");
  const migrations = path.join(__dirname, "..", "migrations");
  const applied = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();
  if (!applied) for (const f of fs.readdirSync(migrations).filter(f => f.endsWith(".sql")).sort()) db.exec(fs.readFileSync(path.join(migrations, f), "utf8"));
  const norm = a => a.map(v => (v === undefined ? null : typeof v === "boolean" ? (v ? 1 : 0) : v));
  const statement = (sql, args = []) => ({
    bind: (...a) => statement(sql, norm(a)),
    async first(col) { const r = db.prepare(sql).get(...args); if (!r) return null; const o = { ...r }; return col ? o[col] : o; },
    async all() { return { success: true, results: db.prepare(sql).all(...args).map(r => ({ ...r })), meta: {} }; },
    async run() { const r = db.prepare(sql).run(...args); return { success: true, meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) } }; }
  });
  return { prepare: sql => statement(sql), exec: sql => db.exec(sql), raw: db };
}

// In-memory R2 stand-in with just get/put.
function createR2() {
  const m = new Map();
  return {
    async get(k) { return m.has(k) ? { body: m.get(k) } : null; },
    async put(k, v) { m.set(k, typeof v === "string" ? v : JSON.stringify(v)); }
  };
}
module.exports = { createD1, createR2 };
