import { View, Button } from "native-base";
import { Text } from "native-base";
import { useColorMode, useColorModeValue } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import AppContext from "../../Context/AppContext";

function Settings() {
    const { toggleColorMode, bg, textColor } = React.useContext(AppContext);
    return (
        <SafeAreaView style={{ backgroundColor: bg }}>
            <Button onPress={toggleColorMode}>text</Button>
            <Text style={{ color: textColor }}> Settings</Text>
        </SafeAreaView>
    );
}

export default Settings;
