import { db } from "../utils/db";
import { executeQuery } from "./tableSetup";

const fetchLogsData = async () => {
  const result = executeQuery("SELECT * FROM data", []);
  return result;
};

const graphData = async () => {
  const result = executeQuery(
    "SELECT * FROM data ORDER BY substr (date,5,7) || substr(date,9,10) || substr(date,12,15) DESC limit 15",
    []
  );
  return result;
};

const graphData2 = async () => {
  const result = executeQuery(
    "SELECT * FROM data ORDER BY substr (date,5,7) || substr(date,9,10) || substr(date,12,15) DESC limit 5",
    []
  );
  return result;
};

export { fetchLogsData, graphData, graphData2 };
