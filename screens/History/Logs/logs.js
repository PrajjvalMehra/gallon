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

function Logs() {
  const [logs, setLogs] = React.useState([]);
  const [goal, getGoal] = React.useState(0);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      async function fetchLogs() {
        const data = await fetchLogsData();
        setLogs(data);
      }
      async function fetchGoal() {
        const data = await getGoal();
        getGoal(data);
      }

      fetchLogs();
      fetchGoal();
    }
  }, [isFocused]);

  var logsDay = "";

  return (
    <ScrollView>
      {logs &&
        logs.map((item, key) => (
          <Stack key={key} space={3} alignItems="center">
            <HStack space={3} alignItems="center" mt="5">
              <Center w="30%">
                <Text>
                  {Moment(item.date).format("MMM")}
                  <Text style={styles.H1}>
                    {" "}
                    {Moment(item.date).format("D")}{" "}
                  </Text>
                  <Text>{Moment(item.date).format("YYYY")}</Text>
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
