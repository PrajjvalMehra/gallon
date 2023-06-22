import { useEffect } from "react";
import AppProvider from "./Context/AppProvider";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import Wrapper from "./Wrapper";

function App() {

    return (
        <ActionSheetProvider>
            <AppProvider>
                <NavigationContainer>
                    <Wrapper />
                </NavigationContainer>
            </AppProvider>
        </ActionSheetProvider>
    );

}

export default App;
