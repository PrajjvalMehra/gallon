import AsyncStorage from "@react-native-async-storage/async-storage";

async function checkOnboarding() {
    try {
        const value = await AsyncStorage.getItem("onboarding");
        if (value == null) {
            await AsyncStorage.setItem("onboarding", "false");
            await AsyncStorage.setItem("goal", 0);
        }
        return value;
    } catch (e) {
        // error reading value
    }
}

export { checkOnboarding };
