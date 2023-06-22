import { db } from "../utils/db";
import { executeQuery, dbSetup } from "./tableSetup";

const fetchLogsData = async () => {
  const result = executeQuery("SELECT * FROM data", []);
  return result;
};

export { fetchLogsData };
