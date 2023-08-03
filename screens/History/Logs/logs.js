//Merging to main

import { Text } from "native-base";
import React, { memo } from "react";
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
import AppContext from "../../../Context/AppContext";

function Logs({ data }) {
    const [logs, setLogs] = React.useState(data);
    const [goal, setGoal] = React.useState(0);
    const {
        appState,
        renderValue,
        unit,
        alternateTextColor,
        textColor,
        mainBgColor,
    } = React.useContext(AppContext);
    const isFocused = useIsFocused();

    React.useEffect(
        () => {
            createTodayRow();
            if (isFocused) {
                async function fetchGoal() {
                    const data = await getGoal();
                    setGoal(data);
                }
                fetchGoal();
            }
        },
        [isFocused],
        appState
    );

    return (
        <ScrollView style={{ backgroundColor: mainBgColor }}>
            {logs?.map((item, key) => (
                <Stack key={key} space={3} alignItems="center">
                    <HStack space={3} alignItems="center" mt="5">
                        <Center w="30%">
                            <Text color={textColor}>
                                {item.date.split(" ")[1]}{" "}
                                <Text color={"red"} style={styles.H1}>
                                    {" "}
                                    {item.date.split(" ")[2]}{" "}
                                </Text>
                                <Text color={textColor}>
                                    {item.date.split(" ")[3]}{" "}
                                </Text>
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
                                    value={
                                        (renderValue(item.intake) /
                                            renderValue(goal)) *
                                        100
                                    }
                                    mx="1"
                                />
                            </Box>
                        </Center>
                        <Center w="30%">
                            <Text color={textColor}>
                                <Text style={styles.H1}>
                                    {renderValue(item.intake)}
                                </Text>
                                /{renderValue(goal)} {unit}
                            </Text>
                        </Center>
                    </HStack>
                </Stack>
            ))}
        </ScrollView>
    );
}

export default memo(Logs);
