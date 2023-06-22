import { db } from "../utils/db";

const fetchIntake = async () => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  date = date.toString();

  return new Promise(async (resolve, reject) => {
    try {
      await db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM data ORDER BY id DESC LIMIT 1",
          [date, "0"],
          (_, { rows }) => {
            console.log(rows._array[0].intake);
            resolve(rows._array[0].intake);
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

const increaseIntake = async (value) => {
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  date = date.toString();
  await db.transaction((tx) => {
    tx.executeSql("UPDATE data SET intake = intake + ? WHERE date = ?", [
      value,
      date,
    ]);
  });
};

export { fetchIntake, increaseIntake };
