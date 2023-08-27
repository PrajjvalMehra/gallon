import AsyncStorage from "@react-native-async-storage/async-storage";

const createTodayRow = async () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date = date.toString();
    const data = await AsyncStorage.getItem("userData");
    if (data === null) {
        await AsyncStorage.setItem(
            "userData",
            JSON.stringify([
                {
                    date: date,
                    intake: 0,
                    goal: 0,
                },
            ])
        );
    } else {
        const parsedData = JSON.parse(data);
        if (parsedData[parsedData.length - 1].date !== date) {
            parsedData.push({
                date: date,
                intake: 0,
                goal: 0,
            });
            await AsyncStorage.setItem("userData", JSON.stringify(parsedData));
        }
    }
};

const dropTable = async () => {
    AsyncStorage.setItem("userData", "");
    dbSetup();
    createTodayRow();
};

export { createTodayRow, dropTable };
