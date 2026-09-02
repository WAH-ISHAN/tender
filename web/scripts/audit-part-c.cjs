const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite');

console.log("=== TABLES LIST IN TENDERHUB.SQLITE ===");
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log(tables.map(t => t.name).join(', '));

console.log("\n=== PRAGMA TABLE_INFO(PROCUREMENTS) ===");
const cols = db.prepare("PRAGMA table_info(procurements)").all();
cols.forEach(c => {
  if (c.name.includes('stage')) console.log(JSON.stringify(c));
});

console.log("\n=== TESTING UNIQUE CONSTRAINT ON AWARDS ===");
try {
  // First insert
  db.prepare("INSERT INTO awards (procurement_id, submission_id, awarded_by, created_at) VALUES (999, 1, 1, datetime('now'))").run();
  console.log("First insert: SUCCESS (procurement_id = 999)");
} catch (e) {
  console.log("First insert failed:", e.message);
}

try {
  // Second insert with duplicate procurement_id = 999
  db.prepare("INSERT INTO awards (procurement_id, submission_id, awarded_by, created_at) VALUES (999, 2, 1, datetime('now'))").run();
  console.log("Second insert: SUCCESS (Unexpected!)");
} catch (e) {
  console.log("Second insert: FAILED AS EXPECTED with error ->", e.message);
}

// Cleanup test row
try { db.prepare("DELETE FROM awards WHERE procurement_id = 999").run(); } catch {}
