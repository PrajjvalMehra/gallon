import { StatusBar } from "expo-status-bar";
import BottomNavigator from "./components/BottomNavigator/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppContext from "./Context/AppContext";

import React from "react";

function Wrapper() {
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
