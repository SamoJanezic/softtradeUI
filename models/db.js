import sqlite from 'better-sqlite3';
import path from "path";

export const db = new sqlite('softtrade.db');
