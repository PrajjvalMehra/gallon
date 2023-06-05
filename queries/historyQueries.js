import { db } from "../utils/db";

const fetchLogsData = async () => {
  await db.transaction((tx) => {
    tx.executeSql("SELECT * FROM data", [], (_, { rows }) => {
      console.log(rows._array[0], "test");
      return rows._array;
    });
  });
};

export { fetchLogsData };
