import { db } from "../utils/db";

const dbSetup = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, intake INTEGER, goal INTEGER);"
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
const dropTable = async () => {
  await db.transaction((tx) => {
    tx.executeSql("Drop Table IF EXISTS Data");
    //after dropping create a table
    dbSetup();
    //create a row
    createTodayRow();
  });
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
          console.log(error);
          reject(error);
        }
      );
    });
  });
};

export {
  dbSetup,
  createTodayRow,
  testQuery,
  testQuery2,
  executeQuery,
  dropTable,
};
