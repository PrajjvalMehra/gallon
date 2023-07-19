import AsyncStorage from "@react-native-async-storage/async-storage";
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
