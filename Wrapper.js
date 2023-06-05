import { StatusBar } from "expo-status-bar";
import BottomNavigator from "./components/BottomNavigator/BottomNavigator";

import { NativeBaseProvider } from "native-base";
import AppContext from "./Context/AppContext";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";

import { checkOnboarding, setGoal, setUnit } from "./utils/asyncStorage";
import React from "react";

function Wrapper() {
    const { appState } = React.useContext(AppContext);
    React.useEffect(() => {
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

        dbSetup();
    }, [appState]);

    const { statusBarColor } = React.useContext(AppContext);
    return (
        <NativeBaseProvider>
            <BottomNavigator />
            <StatusBar style={statusBarColor} />
        </NativeBaseProvider>
    );
}

export default Wrapper;
