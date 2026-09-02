const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite');

const tables = ['notices', 'organisations', 'users', 'procurements', 'submissions', 'awards', 'auction_lots', 'payments'];
for (const t of tables) {
  const cols = db.prepare(`PRAGMA table_info(${t})`).all();
  console.log(`\n=== TABLE: ${t} (${cols.length} cols) ===`);
  console.log(cols.map(c => c.name).join(', '));
  const count = db.prepare(`SELECT count(*) as c FROM ${t}`).get();
  console.log(`Row count: ${count.c}`);
}
