import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";

import { checkOnboarding, setOnboardung, setGoal, setUnit } from "./utils/asyncStorage";
import FirstLaunch from "./screens/FirstLaunch/FirstLaunch";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from "react";

const Stack = createNativeStackNavigator();


function Wrapper() {

    const [firstLaunch, setFirstLaunch] = React.useState(null);

    React.useEffect(() => {
        dbSetup();
        async function fetchOnboardingData() {
            const onboarding = await checkOnboarding();
            await setGoal();
            await setUnit();

            // Set onboarding === true to false after testing
            // if (onboarding === "false") {
            if (onboarding === "true") {
                setFirstLaunch(true);
                await setOnboardung();
                createTodayRow();
                testQuery();
            } else {
                setFirstLaunch(false);
            }
        }

        fetchOnboardingData();
    }, []);
    return (
        firstLaunch != null && (
            <NavigationContainer>
                <Stack.Navigator>
                    {firstLaunch && (
                        <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={FirstLaunch} />
                    )}
                    <Stack.Screen name="Home" component={BottomNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
}

export default Wrapper;
