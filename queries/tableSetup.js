import { db } from "../utils/db";

const dbSetup = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS gallons (id INTEGER PRIMARY KEY AUTOINCREMENT, gallons INTEGER, date TEXT);"
        );
    });
};

const testInsert = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "INSERT INTO gallons (gallons, date) VALUES (1, '2021-01-01');"
        );
    });
};

const testQuery = () => {
    db.transaction((tx) => {
        tx.executeSql("SELECT * FROM gallons", [], (_, { rows }) => {
            console.log(rows._array.forEach((row) => console.log(row.date)));
        });
    });
};

export { dbSetup, testInsert, testQuery };
