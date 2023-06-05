import { useEffect } from "react";
import AppProvider from "./Context/AppProvider";
import { NavigationContainer } from "@react-navigation/native";
import Wrapper from "./Wrapper";

function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Wrapper />
            </NavigationContainer>
        </AppProvider>
    );
}

export default App;
