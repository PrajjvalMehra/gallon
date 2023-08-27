import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import Settings from "../../screens/Settings/Settings";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Pressable } from "native-base";
import AppContext from "../../Context/AppContext";
("../../Context/AppProvider");
import React from "react";
import History from "../../screens/History/History";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    const { bg, textColor, statusBarColor, colorMode, toggleColorMode } =
        React.useContext(AppContext);
    const [opacity, setOpacity] = React.useState(1);

    return (
        <NativeBaseProvider>
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: bg,
                        },
                        headerTintColor: textColor,
                        tabBarStyle: {
                            backgroundColor: bg,
                            borderTopWidth: 0,
                        },
                        tabBarActiveTintColor: "#0891b2",
                    }}
                >
                    <Tab.Screen
                        name="History"
                        options={{
                            headerShadowVisible: false,
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
                            headerShadowVisible: false,
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name="home"
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                        component={Home}
                    />
                    <Tab.Screen
                        name="Settings"
                        options={{
                            headerShadowVisible: false,

                            headerRight: () => (
                                <Pressable
                                    opacity={opacity}
                                    onPress={() => {
                                        setOpacity(0);
                                        toggleColorMode();
                                        setOpacity(1);
                                    }}
                                >
                                    {colorMode === "light" ? (
                                        <Ionicons
                                            name="sunny"
                                            size={24}
                                            style={{ marginRight: 15 }}
                                            color={"black"}
                                        />
                                    ) : (
                                        <Ionicons
                                            name="moon"
                                            size={22}
                                            color="white"
                                            style={{ marginRight: 15 }}
                                        />
                                    )}
                                </Pressable>
                            ),
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name="ios-cog"
                                    size={size}
                                    color={color}
                                />
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
