import { StatusBar } from "expo-status-bar";
import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppContext from "./Context/AppContext";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";

import { checkOnboarding, setGoal, setUnit } from "./utils/asyncStorage";

import React from "react";

function Wrapper() {
    React.useEffect(() => {
        dbSetup();
        async function fetchOnboardingData() {
            const onboarding = await checkOnboarding();
            await setGoal();
            await setUnit();

            // Set onboarding === true to true after testing
            if (onboarding === "false") {
                createTodayRow();
                testQuery();
            }
        }

        fetchOnboardingData();
    }, []);

    const { statusBarColor } = React.useContext(AppContext);
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <BottomNavigator />
                <StatusBar style={statusBarColor} />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default Wrapper;
