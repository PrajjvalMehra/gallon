import { Text, View, ScrollView } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import Logs from "./Logs/logs";
import Visual from "./Visual/visual";
import SwitchSelector from "react-native-switch-selector";
import AppContext from "../../Context/AppContext";

function History() {
    const options = [
        {
            label: "List",
            value: "1",
        },
        { label: "Graph", value: "2" },
    ];

    const [value, setValue] = React.useState(true);

    const { mainBgColor, colorMode } = React.useContext(AppContext);

    return (
        <SafeAreaView>
            <SwitchSelector
                options={options}
                initial={0}
                buttonColor={"#0891b2"}
                backgroundColor={colorMode === "dark" ? "#164e63" : "#e5e5e5"}
                textColor={colorMode === "dark" ? "white" : "black"}
                onPress={(value) => {
                    if (value == 1) {
                        setValue(true);
                    } else {
                        setValue(false);
                    }
                }}
                style={{
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingTop: 20,
                    backgroundColor: mainBgColor,
                }}
            />
            {value ? <Logs /> : <Visual />}
        </SafeAreaView>
    );
}

export default History;
