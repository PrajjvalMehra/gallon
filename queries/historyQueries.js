import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchLogsData = async () => {
    const result = await AsyncStorage.getItem("userData");
    return JSON.parse(result);
};

// const graphData = async () => {
//     const result = executeQuery(
//         "SELECT * FROM data ORDER BY substr (date,5,7) || substr(date,9,10) || substr(date,12,15) DESC limit 15",
//         []
//     );
//     return result;
// };

const graphData = async () => {
    const result = await AsyncStorage.getItem("userData");
    return JSON.parse(result);
};

export { fetchLogsData, graphData };
