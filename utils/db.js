import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("gallonV3.db");

export { db };
