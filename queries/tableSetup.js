import AsyncStorage from "@react-native-async-storage/async-storage";

const createTodayRow = async () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();
    const data = await AsyncStorage.getItem("userData");
    if (data === null) {
        await AsyncStorage.setItem(
            "userData",
            JSON.stringify([
                {
                    date: date,
                    intake: 0,
                    goal: 0,
                },
            ])
        );
    } else {
        const parsedData = JSON.parse(data);
        if (parsedData[parsedData.length - 1].date !== date) {
            parsedData.push({
                date: date,
                intake: 0,
                goal: 0,
            });
            await AsyncStorage.setItem("userData", JSON.stringify(parsedData));
        }
    }

    await db.transaction((tx) => {
        tx.executeSql(
            "SELECT * FROM data ORDER BY id DESC LIMIT 1",
            [date, "0"],
            (_, { rows }) => {
                if (rows.length === 0 || rows._array[0].date !== date) {
                    db.transaction((tx) => {
                        tx.executeSql(
                            "INSERT INTO data (date, intake, goal) VALUES (?, ?, ?)",
                            [date, 0, 0]
                        );
                    });
                }
            }
        );
    });
};

const testQuery = async () => {
    await db.transaction((tx) => {
        testQuery2();
        tx.executeSql("SELECT * FROM data", [], (_, { rows }) => {
            for (let i = 0; i < rows.length; i++) {}
        });
    });
};

const testQuery2 = async () => {
    await db.transaction((tx) => {
        tx.executeSql("SELECT * FROM data", [], (_, { rows }) => {});
    });
};

//clear history logs, by dropping table
// old code
// const dropTable = async () => {
//     await db.transaction((tx) => {
//         tx.executeSql("Drop Table IF EXISTS Data");
//         //after dropping create a table
//         dbSetup();
//         //create a row
//         createTodayRow();
//     });
// };

const dropTable = async () => {
    AsyncStorage.setItem("userData", "");
    dbSetup();
    createTodayRow();
};

const executeQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                sql,
                params,
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
};

export { createTodayRow, testQuery, testQuery2, executeQuery, dropTable };
