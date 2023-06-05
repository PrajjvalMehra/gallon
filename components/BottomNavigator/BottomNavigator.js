import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import Settings from "../../screens/Settings/Settings";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppContext from "../../Context/AppContext";
("../../Context/AppProvider");
import React from "react";
const Tab = createBottomTabNavigator();

function BottomNavigator() {
    const { bg, textColor, statusBarColor } = React.useContext(AppContext);
    return (
        <NativeBaseProvider>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: bg,
                        },
                        headerTintColor: textColor,
                        tabBarStyle: {
                            backgroundColor: bg,
                        },
                    }}
                >
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
                <StatusBar style={statusBarColor} />
            </NavigationContainer>
        </NativeBaseProvider>

    );
}

export default BottomNavigator;
