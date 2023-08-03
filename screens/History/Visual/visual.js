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

const Visual = () => {
    const [linedata, setLinedata] = React.useState([]);
    const [lineLabels, setLineLabels] = React.useState([]);
    const [weeklyAverage, setWeeklyAverage] = React.useState(0);
    const { unit, colorMode, textColor, alternateTextColor, renderValue } =
        React.useContext(AppContext);

    React.useEffect(() => {
        async function fetchData() {
            const data = await graphData();
            console.log(data);
            const intake = data.map((item) =>
                parseInt(renderValue(item.intake))
            );
            const date = data.map((item) => item.date.slice(3, 10));
            let totalWeeklyIntake = 0;
            intake.forEach((item) => {
                totalWeeklyIntake += item;
            });
            console.log(totalWeeklyIntake);
            console.log(intake.length);
            setWeeklyAverage(
                totalWeeklyIntake / (intake.length > 6 ? 7 : intake.length)
            );
            setLineLabels(date);
            setLinedata(intake);
        }
        fetchData();
    }, []);

    return (
        <VStack>
            <View>
                <Text fontSize={"md"} color={textColor}>
                    Weekly Average{" "}
                </Text>
                <Heading color={alternateTextColor} size={"md"}>
                    {weeklyAverage.toFixed(1)}{" "}
                    <Text fontSize={"md"} color={textColor}>
                        {unit}
                    </Text>
                </Heading>
            </View>

            <View>
                <LineChart
                    style={{
                        marginVertical: 8,
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
                    width={Dimensions.get("screen").width} // from react-native
                    height={Dimensions.get("window").height / 2}
                    yAxisSuffix={` ${unit}   `}
                    yAxisInterval={1} // optional, defaults to 1
                    yLabelsOffset={0.1}
                    withInnerLines={false}
                    withOuterLines={false}
                    bezier
                    withDots={true}
                    chartConfig={{
                        backgroundGradientFrom: "rgba(255, 255, 255, 0)",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        backgroundGradientTo: "rgba(255, 255, 255, 0)",
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
            </View>
        </VStack>
    );
};
export default Visual;

//*added graph
