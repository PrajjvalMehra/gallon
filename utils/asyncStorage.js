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

export { checkOnboarding };
