import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";

import { checkOnboarding, setGoal, setUnit } from "./utils/asyncStorage";
import FirstLaunch from "./screens/FirstLaunch/FirstLaunch";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from "react";

const Stack = createNativeStackNavigator();

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
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={FirstLaunch} />
                <Stack.Screen name="Home" component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Wrapper;
