import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import Settings from "../../screens/Settings/Settings";
import AppContext from "../../Context/AppContext";
("../../Context/AppProvider");
import React from "react";
import History from "../../screens/History/History";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function BottomNavigator() {
    const { bg, textColor } = React.useContext(AppContext);

    return (
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
    );
}

export default BottomNavigator;
