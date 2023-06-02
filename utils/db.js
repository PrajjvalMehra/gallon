import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("gallon.db");

export { db };
