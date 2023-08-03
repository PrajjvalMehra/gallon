import React from "react";
import { AppState } from "react-native";
import AppContext from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
function AppProvider({ children }) {
    const [colorMode, setColorMode] = React.useState("light");
    const [bg, setBg] = React.useState("white");
    const [textColor, setTextColor] = React.useState("black");
    const [statusBarColor, setStatusBarColor] = React.useState("dark");
    const [mainBgColor, setMainBgColor] = React.useState("#f5f5f5");
    const [alternateTextColor, setAlternateTextColor] =
        React.useState("primary.600");
    const [unit, setUnit] = React.useState("ml");
    const [appState, setAppState] = React.useState();

    React.useEffect(() => {
        const getTheme = async () => {
            const theme = await AsyncStorage.getItem("theme");
            if (theme !== null) {
                setColorMode(theme);
            } else {
                setColorMode("light");
                AsyncStorage.setItem("theme", "light"); // default theme
            }
        };
        getTheme();
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
        AppState.addEventListener("change", (state) => {
            setAppState(state);
        });

        if (colorMode === "dark") {
            const setDarkMode = async () => {
                await AsyncStorage.setItem("theme", "dark");
            };
            setDarkMode();
            setAlternateTextColor("primary.200");
            setMainBgColor("black");
            setBg("#131922");
            setTextColor("white");
            setStatusBarColor("light");
        } else {
            const setLightMode = async () => {
                await AsyncStorage.setItem("theme", "light");
            };
            setLightMode();
            setMainBgColor("#f5f5f5");
            setAlternateTextColor("primary.600");
            setBg("white");
            setTextColor("black");
            setStatusBarColor("dark");
        }
    }, [colorMode]);

    React.useEffect(() => {
        const updateUnit = async () => {
            await AsyncStorage.setItem("unit", unit);
        };
        updateUnit();
    }, [unit]);

    const renderValue = (value) => {
        if (unit === "ml") {
            return +(value * 1).toFixed(0).toString();
        } else {
            return +(value * 0.033814).toFixed(0).toString();
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
        mainBgColor,
        unit,
        renderValue,
        setUnit,
        alternateTextColor,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
