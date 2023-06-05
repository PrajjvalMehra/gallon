import { db } from "../utils/db";
import { executeQuery } from "./tableSetup";

const fetchLogsData = async () => {
  const result = await executeQuery("SELECT * FROM data", []);
  console.log("result log" + result._rows.array);
  if (result) {
    let logsArray;
    // result.array.forEach((element) => {});
  }
};

export { fetchLogsData };
