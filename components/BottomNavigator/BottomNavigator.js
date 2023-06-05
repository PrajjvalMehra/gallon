import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import Settings from "../../screens/Settings/Settings";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import AppContext from "../../Context/AppContext";
("../../Context/AppProvider");
import React from "react";
import History from "../../screens/History/History";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
                        tabBarActiveTintColor: "#0891b2",
            }}
                >
                    <Tab.Screen
                name="History"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="history"
                            size={size}
                            color={color}
                        />
                    ),
                }}
                component={History}
            />
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
                component={Home}
            />
                    <Tab.Screen
                name="Settings"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-cog" size={size} color={color} />
                    ),
                }}
                component={Settings}
            />
                </Tab.Navigator>
                <StatusBar style={statusBarColor} />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default BottomNavigator;
