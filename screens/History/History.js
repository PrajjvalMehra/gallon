import { Text, View, ScrollView, VStack, Spinner } from "native-base";
import React from "react";
import { Dimensions, SafeAreaView } from "react-native";
import Logs from "./Logs/logs";
import Visual from "./Visual/visual";
import SwitchSelector from "react-native-switch-selector";
import AppContext from "../../Context/AppContext";
import { useIsFocused } from "@react-navigation/native";
import { graphData } from "../../queries/historyQueries";

function History() {
    const options = [
        {
            label: "List",
            value: "1",
        },
        { label: "Graph", value: "2" },
    ];

    const isFocused = useIsFocused();

    const [value, setValue] = React.useState(true);

    const [data, setData] = React.useState();

    const { mainBgColor, colorMode, textColor, appState } =
        React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchData() {
            const result = await graphData();
            console.log("result", typeof result);
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <ScrollView>
            <View
                justifyContent={"center"}
                style={{
                    height: Dimensions.get("window").height - 150,
                    paddingTop: 15,
                    backgroundColor: mainBgColor,
                }}
            >
                {data === undefined ? (
                    <Spinner />
                ) : (
                    <>
                        <Visual data={data} />
                        <Logs data={data} />
                    </>
                )}
            </View>
        </ScrollView>
    );
}

export default History;
