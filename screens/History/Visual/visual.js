//Merging to main

import { Text } from "native-base";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import {
    Divider,
    Stack,
    Heading,
    VStack,
    HStack,
    ScrollView,
    Center,
    Box,
    Progress,
} from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { fetchLogsData, graphData } from "../../../queries/historyQueries";
import Moment from "moment";
import { getGoal } from "../../../utils/asyncStorage";
import { createTodayRow } from "../../../queries/tableSetup";
import AppContext from "../../../Context/AppContext";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function Visual() {
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#164e63",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#164e63",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForLabels: {
            fontSize: 8,
        },
    };
    const chartConfig2 = {
        backgroundGradientFrom: "#164e63",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#164e63",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(240, 249, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForLabels: {
            fontSize: 8,
        },
    };
    const [logs, setLogs] = React.useState([]);
    const [goal, setGoal] = React.useState(0);
    const { appState, renderValue, unit, textColor, mainBgColor } =
        React.useContext(AppContext);
    const isFocused = useIsFocused();

    useEffect(
        () => {
            async function fetchLogs() {
                const data = await graphData();
                setLogs(data);
            }
            async function fetchGoal() {
                const data = await getGoal();
                setGoal(data);
            }
            fetchGoal();
            fetchLogs();
        },
        [isFocused],
        appState
    );

    const data = {
        labels: logs.map(
            (item, key) =>
                key < 15 && item.date.split(" ")[1] + item.date.split(" ")[2]
        ),
        datasets: [
            {
                data: logs.map((item, key) => key < 15 && item.intake),
                color: (opacity = 1) => `rgba(103, 232, 249, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
        ],
    };

    const data2 = {
        labels: logs.map(
            (item, key) =>
                key < 5 && item.date.split(" ")[1] + item.date.split(" ")[2]
        ), // optional
        datasets: [{ data: logs.map((item, key) => key < 5 && item.intake) }],
    };

    function graph15Days() {
        return (
            <Center style={{ paddingRight: 10, paddingLeft: 10 }}>
                <LineChart
                    data={data}
                    yAxisSuffix={"ml"}
                    width={screenWidth - 20}
                    style={{ borderRadius: 16 }}
                    height={260}
                    chartConfig={chartConfig}
                />
            </Center>
        );
    }

    function graph5Days() {
        return (
            <Center style={{ paddingRight: 10, paddingLeft: 10 }}>
                <BarChart
                    data={data2}
                    width={screenWidth - 20}
                    style={{ borderRadius: 16 }}
                    height={230}
                    yAxisSuffix="ml"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </Center>
        );
    }

    return (
        <ScrollView style={{ backgroundColor: mainBgColor, height: "100%" }}>
            <Text
                color={textColor}
                style={{
                    textAlign: "center",
                    paddingTop: 20,
                    fontSize: 16,
                }}
            >
                5 Days water intake logs
            </Text>
            {data2.labels.length > 0 ? (
                graph5Days()
            ) : (
                <Text>No record to show</Text>
            )}

            <Text
                color={textColor}
                style={{
                    textAlign: "center",
                    paddingTop: 20,
                    fontSize: 16,
                }}
            >
                15 Days water intake logs
            </Text>

            {data.labels.length > 0 ? (
                graph15Days()
            ) : (
                <Text>No record to show</Text>
            )}
        </ScrollView>
    );
}

export default Visual;

//*added graph
