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
import {
  fetchLogsData,
  graphData,
  graphData2,
} from "../../../queries/historyQueries";
import Moment from "moment";
import { getGoal } from "../../../utils/asyncStorage";
import { createTodayRow } from "../../../queries/tableSetup";
import AppContext from "../../../Context/AppContext";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
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
  const [logs5days, setLogs5days] = React.useState([]);
  const [goal, setGoal] = React.useState(0);
  const { appState, renderValue, unit } = React.useContext(AppContext);
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

      async function fetchLogs5days() {
        const data = await graphData2();
        console.log(data);
        setLogs5days(data);
      }

      fetchGoal();
      fetchLogs();
      fetchLogs5days();
    },
    [isFocused],
    appState
  );

  const data = {
    labels: logs.map(
      (item, key) => item.date.split(" ")[1] + item.date.split(" ")[2]
    ),
    datasets: [
      {
        data: logs.map((item, key) => item.intake),
        color: (opacity = 1) => `rgba(103, 232, 249, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  const data2 = {
    labels: logs5days.map(
      (item) => item.date.split(" ")[1] + item.date.split(" ")[2]
    ), // optional
    datasets: [{ data: logs5days.map((item) => item.intake) }],
  };

  function graph15Days() {
    return (
      <LineChart
        data={data}
        yAxisSuffix={"ml"}
        width={screenWidth}
        height={260}
        chartConfig={chartConfig}
      />
    );
  }

  function graph5Days() {
    return (
      <BarChart
        data={data2}
        width={screenWidth}
        height={220}
        yAxisSuffix="ml"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    );
  }

  return (
    <ScrollView>
      <Text
        style={{ textAlign: "center", fontStyle: "italic", paddingTop: 20 }}
      >
        5 Days water intake logs
      </Text>
      {data2.labels.length > 0 ? graph5Days() : <Text>No record to show</Text>}

      <Text
        style={{ textAlign: "center", fontStyle: "italic", paddingTop: 20 }}
      >
        15 Days water intake logs
      </Text>

      {data.labels.length > 0 ? graph15Days() : <Text>No record to show</Text>}
    </ScrollView>
  );
}

export default Visual;
