import { StatusBar } from "expo-status-bar";
import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppContext from "./Context/AppContext";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";

import { checkOnboarding } from "./utils/asyncStorage";

import React from "react";

function Wrapper() {
    React.useEffect(() => {
        dbSetup();
        async function fetchOnboardingData() {
            const onboarding = await checkOnboarding();
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
