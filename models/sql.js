import { db } from './db'

export function getTable(param) {
	const sql = `SELECT * FROM ${param};`
	const stmt = db.prepare(sql)
	return stmt.all()
}

export function getSingle(id) {
	const sql = `SELECT * FROM IZDELEK_DOBAVITELJ WHERE id = ?;`
	const stmt = db.prepare(sql)
	return stmt.get(id)
}

export function updateKategorija(marza, id) {
	const sql = `UPDATE KATEGORIJA SET marza = ? WHERE kategorija_id = ?;`
	const stmt = db.prepare(sql)
	return stmt.run(marza, id)
}

export function updateIzdelek(obj) {
	const sql = `UPDATE IZDELEK_DOBAVITELJ SET KATEGORIJA_kategorija = ?, izdelek_ime = ?, izdelek_opis = ?, izdelek_kratki_opis = ?, dealer_cena = ?, nabavna_cena = ?, ppc = ?, zaloga = ?, aktiven = ? WHERE id = ?;`
	const stmt = db.prepare(sql)
	return stmt.run(
		obj.KATEGORIJA_kategorija,
		obj.izdelek_ime,
		obj.izdelek_opis,
		obj.izdelek_kratki_opis,
		obj.dealer_cena,
		obj.nabavna_cena,
		obj.ppc,
		obj.zaloga,
		obj.aktiven,
		obj.id
	)
}
