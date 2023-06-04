import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";
import FirstLaunch from "./screens/FirstLaunch/FirstLaunch";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkOnboarding } from "./utils/asyncStorage";

import React from "react";

const Stack = createNativeStackNavigator();

function Wrapper() {
    React.useEffect(() => {
        dbSetup();
        async function fetchOnboardingData() {
            const onboarding = await checkOnboarding();

            // Set onboarding === true to true after testing
            if (onboarding === "false") {
                createTodayRow();
                testQuery();
            }
        }

        fetchOnboardingData();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Onboarding" component={FirstLaunch} />
                <Stack.Screen name="Home" component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Wrapper;
