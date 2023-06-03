import { db } from "../utils/db";

const dbSetup = () => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, intake TEXT);"
        );
    });
};

const createTodayRow = async () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();
    const latestDate = await db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM data ORDER BY id DESC LIMIT 1",
            [date, "0"],
            (_, { rows }) => {
                if (rows.length === 0 || rows._array[0].date !== date) {
                    db.transaction((tx) => {
                        tx.executeSql(
                            "INSERT INTO data (date, intake) VALUES (?, ?)",
                            [date, "0"]
                        );
                    });
                }
            }
        );
    });
};

const testQuery = async () => {
    // await db.transaction(async (tx) => {
    //     await tx.executeSql("DELETE FROM data");
    // });
    // console.log("Table cleared successfully.");

    await db.transaction((tx) => {
        tx.executeSql("SELECT * FROM data", [], (_, { rows }) => {
            for (let i = 0; i < rows.length; i++) {
                console.log(rows._array[i].date, "row");
            }
        });
    });
};

export { dbSetup, createTodayRow, testQuery };
