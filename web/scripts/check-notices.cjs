const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('E:/tender/TenderHub/apps/api/writable/tenderhub.sqlite');

console.log("NOTICES STATUS VALUES:");
console.log(db.prepare("SELECT status, count(*) as count FROM notices GROUP BY status").all());

console.log("\nFIRST 3 SLUGS:");
console.log(db.prepare("SELECT id, reference, slug, status FROM notices LIMIT 3").all());
