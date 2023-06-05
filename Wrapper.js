import BottomNavigator from "./components/BottomNavigator/BottomNavigator";

import { NativeBaseProvider } from "native-base";
import AppContext from "./Context/AppContext";
import { dbSetup, createTodayRow, testQuery } from "./queries/tableSetup";


import { checkOnboarding, setOnboardung, setGoal, setUnit } from "./utils/asyncStorage";
import FirstLaunch from "./screens/FirstLaunch/FirstLaunch";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import React from "react";

const Stack = createNativeStackNavigator();


function Wrapper() {


    const [firstLaunch, setFirstLaunch] = React.useState(null);

    const { appState } = React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchOnboardingData() {
            const onboarding = await checkOnboarding();
            await setGoal("2500");
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

        dbSetup();
    }, [appState]);

    const { statusBarColor } = React.useContext(AppContext);
    return (
        firstLaunch != null && (
            <NavigationContainer independent={true}>
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
