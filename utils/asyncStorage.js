import AsyncStorage from "@react-native-async-storage/async-storage";

async function checkOnboarding() {
    try {
        const value = await AsyncStorage.getItem("onboarding");
        if (value == null) {
            await AsyncStorage.setItem("onboarding", "false");
        }
        return value;
    } catch (e) {
        // error reading value
    }
}

async function setOnboardung() {
    try {
        const value = await AsyncStorage.getItem("onboarding");
        if (value != null) {
            await AsyncStorage.setItem("onboarding", "true");
        }
        return value;
    } catch (e) {
        // error reading value
    }
}


async function setUnit() {
    try {
        const value = await AsyncStorage.getItem("unit");
        if (value == null) {
            await AsyncStorage.setItem("unit", "ml");
        }
        return value;
    } catch (e) {
        // error reading value
    }
}

async function setGoal() {
    try {
        // const value = await AsyncStorage.getItem("goal");
        // if (value == null) {
        console.log("setting goal");
        await AsyncStorage.setItem("goal", "2500");
        // }
        return value;
    } catch (e) {
        // error reading value
    }
}

async function getGoal() {
    let result;
    await AsyncStorage.getItem("goal").then((value) => {
        console.log(value, "value");
        result = value;
    });
    return result;
}

async function getUnit() {
    try {
        const value = await AsyncStorage.getItem("unit");

        return value;
    } catch (e) {
        // error reading value
    }
}

export { checkOnboarding, setOnboardung, setUnit, getUnit, setGoal, getGoal };
