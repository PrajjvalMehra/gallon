import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/db";

const fetchIntake = async () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();
    const userData = await AsyncStorage.getItem("userData");
    if (userData === null) return 0;
    const parsedData = JSON.parse(userData);
    const todayData = parsedData.find((item) => item.date === date);
    if (todayData === undefined) return 0;
    return todayData.intake;
};

const increaseIntake = async (value) => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();
    const userData = await AsyncStorage.getItem("userData");
    if (userData === null) return 0;
    const parsedData = JSON.parse(userData);
    const todayData = parsedData.find((item) => item.date === date);
    if (todayData === undefined) return 0;
    todayData.intake += value;
    await AsyncStorage.setItem("userData", JSON.stringify(parsedData));

    return;
    const unit = await AsyncStorage.getItem("unit");
    value = unit === "fl oz" ? value * 0.033814 * 29.574 : value;
    await db.transaction((tx) => {
        tx.executeSql("UPDATE data SET intake = intake + ? WHERE date = ?", [
            value,
            date,
        ]);
    });
};

export { fetchIntake, increaseIntake };
