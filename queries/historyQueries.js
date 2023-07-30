import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/db";
import { executeQuery } from "./tableSetup";

const fetchLogsData = async () => {
  const result = await AsyncStorage.getItem("userData");
  return JSON.parse(result);
};

const graphData = async () => {
  const result = await AsyncStorage.getItem("userData");
  return JSON.parse(result);
};

export { fetchLogsData, graphData, graphData2 };
