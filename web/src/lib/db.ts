import path from "node:path";
import fs from "node:fs";

let dbInstance: any = null;

export function getDb(): any {
  if (dbInstance) return dbInstance;
  const dbPaths = [
    path.resolve(process.cwd(), "src/data/tenderhub.sqlite"),
    path.resolve(process.cwd(), "../apps/api/writable/tenderhub.sqlite"),
    path.resolve(process.cwd(), "apps/api/writable/tenderhub.sqlite"),
    "E:/tender/apps/api/writable/tenderhub.sqlite",
  ];
  for (const p of dbPaths) {
    if (fs.existsSync(/*turbopackIgnore: true*/ p)) {
      try {
        // @ts-ignore
        const { DatabaseSync } = require("node:sqlite");
        dbInstance = new DatabaseSync(p);
        return dbInstance;
      } catch (e) {
        // Turbopack bundling fallback
      }
    }
  }
  return null;
}
