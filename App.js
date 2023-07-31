import React, { useEffect } from "react";
import AppProvider from "./Context/AppProvider";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import data from "./data/data.json";
import Wrapper from "./Wrapper";
import * as Notifications from "expo-notifications";

function App() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
    return (
        <ActionSheetProvider>
            <AppProvider>
                <NavigationContainer>
                    <Wrapper />
                </NavigationContainer>
            </AppProvider>
        </ActionSheetProvider>
    );
}

export default App;
