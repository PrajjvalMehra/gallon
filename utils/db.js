import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("gallonV1.db");

export { db };
