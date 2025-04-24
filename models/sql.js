import { db } from "./db";


export function getTable(param) {
  const sql = `SELECT * FROM ${param};`;
  const stmt = db.prepare(sql);
  return stmt.all();
}

export function getSingle(id) {
  const sql = `SELECT * FROM IZDELEK_DOBAVITELJ WHERE id = ?;`;
  const stmt = db.prepare(sql);
  return stmt.get(id);
}