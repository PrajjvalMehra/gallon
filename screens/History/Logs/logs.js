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

function Logs() {
  const [logs, setLogs] = React.useState([]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      async function fetchLogs() {
        const historyLogs = await fetchLogsData();
        setLogs(historyLogs);
        console.log(historyLogs, "History Logs");
      }
      fetchLogs();
    }
  }, [isFocused]);

  const month = "April";
  const day = "1";
  const year = "2023";

  return (
    <ScrollView>
      {logs &&
        logs.map((item) => (
          <Stack space={3} alignItems="center">
            <HStack space={3} alignItems="center" mt="5">
              <Center w="30%">
                <Text>
                  {month}
                  <Text style={styles.H1}> {day} </Text>
                  <Text>{year}</Text>
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
                    value={75}
                    mx="1"
                  />
                </Box>
              </Center>
              <Center w="30%">
                <Text>
                  <Text style={styles.H1}>{item.intake}</Text>/100
                </Text>
              </Center>
            </HStack>
          </Stack>
        ))}
    </ScrollView>
  );
}

export default Logs;
