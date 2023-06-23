//Merging to main

import { Text } from "native-base";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./styles";
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
import { fetchLogsData } from "../../../queries/historyQueries";
import Moment from "moment";
import { getGoal } from "../../../utils/asyncStorage";
import { createTodayRow } from "../../../queries/tableSetup";

function Logs() {
  const [logs, setLogs] = React.useState([]);
  const [goal, setGoal] = React.useState(0);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    createTodayRow();
    if (isFocused) {
      async function fetchLogs() {
        const data = await fetchLogsData();
        setLogs(data);
      }
      async function fetchGoal() {
        const data = await getGoal();
        setGoal(data);
      }

      fetchLogs();
      fetchGoal();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      {logs.map((item, key) => (
        <Stack key={key} space={3} alignItems="center">
          <HStack space={3} alignItems="center" mt="5">
            <Center w="30%">
              <Text>
                {item.date.split(" ")[1]}{" "}
                <Text style={styles.H1}> {item.date.split(" ")[2]} </Text>
                <Text>{item.date.split(" ")[3]} </Text>
              </Text>
            </Center>
            <Center w="30%">
              <Box w="100%">
                <Progress
                  size="md"
                  bg="primary.900"
                  _filledTrack={{
                    bg: "primary.200",
                  }}
                  value={(item.intake / goal) * 100}
                  mx="1"
                />
              </Box>
            </Center>
            <Center w="30%">
              <Text>
                <Text style={styles.H1}>{item.intake}</Text>/{goal}
              </Text>
            </Center>
          </HStack>
        </Stack>
      ))}
    </ScrollView>
  );
}

export default Logs;
