//Merging to main

import { Text } from "native-base";
import React, { memo } from "react";
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

const Visual = (props) => {
    const [linedata, setLinedata] = React.useState([]);
    const [lineLabels, setLineLabels] = React.useState([]);
    const [weeklyAverage, setWeeklyAverage] = React.useState(0);
    const isFocused = useIsFocused();
    const {
        unit,
        colorMode,
        textColor,
        alternateTextColor,
        renderValue,
        appState,
    } = React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchData() {
            const data = props.data;

            const date = data.map((item) => item.date.slice(3, 10));
            const intake = data.map((item) => renderValue(item.intake));
            let totalWeeklyIntake = 0;
            intake.forEach((item) => {
                totalWeeklyIntake += item;
            });
            setWeeklyAverage(
                totalWeeklyIntake / (intake.length > 6 ? 7 : intake.length)
            );
            setLineLabels(date);
            setLinedata(intake);
        }
        fetchData();
    }, [props.data, appState]);

    return (
        <VStack>
            <View
                style={{
                    marginHorizontal: 10,
                }}
            >
                <Text fontSize={"md"} color={textColor}>
                    Weekly Average{" "}
                </Text>
                <Heading color={alternateTextColor} size={"md"}>
                    {renderValue(weeklyAverage.toFixed(1))}{" "}
                    <Text
                        fontWeight={"normal"}
                        fontSize={"md"}
                        color={textColor}
                    >
                        {unit}
                    </Text>
                </Heading>
            </View>
            <View style={{ marginBottom: -30 }}>
                {linedata.length === 0 ? null : (
                    <LineChart
                        style={{
                            marginTop: 10,
                            // marginHorizontal: 5,
                        }}
                        data={{
                            labels: lineLabels,
                            datasets: [
                                {
                                    data: linedata,
                                },
                            ],
                        }}
                        fromZero={true}
                        width={Dimensions.get("screen").width}
                        height={Dimensions.get("window").height / 2.5}
                        yAxisSuffix={`  `}
                        withOuterLines={false}
                        withHorizontalLines={false}
                        bezier
                        withDots={true}
                        chartConfig={{
                            backgroundGradientFrom: "rgba(255, 255, 255, 0)",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientToOpacity: 0,
                            backgroundGradientTo: "rgba(255, 255, 255, 1)",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 1) =>
                                `rgba(${
                                    colorMode === "light"
                                        ? "19, 61, 80"
                                        : "151, 241, 251"
                                }, ${opacity})`,
                            labelColor: (opacity = 1) =>
                                `rgba(${
                                    colorMode === "light"
                                        ? "19, 61, 80"
                                        : "151, 241, 251"
                                }, ${opacity})`,
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                            },
                        }}
                    />
                )}
            </View>
        </VStack>
    );
};
export default Visual;

//*added graph
