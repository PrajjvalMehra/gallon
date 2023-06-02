import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import Settings from "../../screens/Settings/Settings";
import AppContext from "../../Context/AppContext";
("../../Context/AppProvider");
import React from "react";
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
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default BottomNavigator;
