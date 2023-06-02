import React from "react";
import AppContext from "./AppContext";
function AppProvider({ children }) {
    const [colorMode, setColorMode] = React.useState("light");
    const [bg, setBg] = React.useState("white");
    const [textColor, setTextColor] = React.useState("black");
    const [statusBarColor, setStatusBarColor] = React.useState("dark");

    React.useEffect(() => {
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
