import { db } from "./db";


export function getCategories() {
  const sql = `SELECT * FROM KATEGORIJA;`;
  const stmt = db.prepare(sql);
  return stmt.all();
}