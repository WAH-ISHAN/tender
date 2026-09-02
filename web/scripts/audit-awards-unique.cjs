const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite');

console.log("PRAGMA table_info(awards):");
console.log(db.prepare("PRAGMA table_info(awards)").all());

try {
  db.prepare("DELETE FROM awards WHERE procurement_id = 999").run();
  db.prepare("INSERT INTO awards (procurement_id, submission_id, supplier_org_id, amount, committee_ref, awarded_by, awarded_at, standstill_until, created_at) VALUES (999, 1, 1, 1000000, 'REF-1', 1, datetime('now'), datetime('now'), datetime('now'))").run();
  console.log("First insert: SUCCESS");
} catch (e) {
  console.log("First insert error:", e.message);
}

try {
  db.prepare("INSERT INTO awards (procurement_id, submission_id, supplier_org_id, amount, committee_ref, awarded_by, awarded_at, standstill_until, created_at) VALUES (999, 2, 2, 2000000, 'REF-2', 1, datetime('now'), datetime('now'), datetime('now'))").run();
  console.log("Second insert: SUCCESS (Unexpected!)");
} catch (e) {
  console.log("Second insert: REFUSED WITH ERROR ->", e.message);
}

// Cleanup
db.prepare("DELETE FROM awards WHERE procurement_id = 999").run();
