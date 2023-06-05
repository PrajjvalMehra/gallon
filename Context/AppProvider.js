import React from "react";
import { AppState } from "react-native";
import AppContext from "./AppContext";
function AppProvider({ children }) {
    const [colorMode, setColorMode] = React.useState("light");
    const [bg, setBg] = React.useState("white");
    const [textColor, setTextColor] = React.useState("black");
    const [statusBarColor, setStatusBarColor] = React.useState("dark");
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
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
