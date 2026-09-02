const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('TABLES COUNT:', tables.length);
console.log('TABLES:', tables.map(t => t.name).join(', '));

const count = db.prepare('SELECT count(*) as c FROM notices').get();
console.log('NOTICES COUNT:', count.c);

console.log('FIRST 5 NOTICES:');
const rows = db.prepare('SELECT id, reference, title, closing_at FROM notices LIMIT 5').all();
rows.forEach(r => console.log(' ', JSON.stringify(r)));
