import React from "react";
import { AppState } from "react-native";
import AppContext from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
function AppProvider({ children }) {
    const [colorMode, setColorMode] = React.useState("light");
    const [bg, setBg] = React.useState("white");
    const [textColor, setTextColor] = React.useState("black");
    const [statusBarColor, setStatusBarColor] = React.useState("dark");
    const [unit, setUnit] = React.useState("ml");
    const [appState, setAppState] = React.useState();

    React.useEffect(() => {
        AppState.addEventListener("change", (state) => {
            setAppState(state);
        });
        if (colorMode === "dark") {
            setBg("#131922");
            setTextColor("white");
            setStatusBarColor("light");
        } else {
            setBg("white");
            setTextColor("black");
            setStatusBarColor("dark");
        }
    }, [colorMode]);

    React.useEffect(() => {
        AsyncStorage.getItem("unit").then((value) => {
            if (value !== null) {
                setUnit(value);
            } else {
                setUnit("ml");
                AsyncStorage.setItem("unit", "ml"); // default unit
            }
        });
    }, []);

    React.useEffect(() => {
        const updateUnit = async () => {
            await AsyncStorage.setItem("unit", unit);
        };
        updateUnit();
    }, [unit]);

    const renderValue = (value) => {
        if (unit === "ml") {
            console.log(" result", value, unit);
        } else {
            return +(value * 0.033814).toFixed(2).toString();
        }
    };

    function toggleColorMode() {
        setColorMode(colorMode === "light" ? "dark" : "light");
    }

    const contextValue = {
        bg,
        colorMode,
        textColor,
        statusBarColor,
        appState,
        setColorMode,
        toggleColorMode,
        unit,
        renderValue,
        setUnit,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
