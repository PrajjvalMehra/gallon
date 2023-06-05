import { Text } from "native-base";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./styles"
import { Divider, Stack, Heading, VStack, HStack, ScrollView, Center, Box, Progress } from 'native-base';

function Logs() {

    const month = "April";
    const day = "1";
    const year = "2023";

    return (

        <ScrollView>

            <Stack space={3} alignItems="center">
                <HStack space={3} alignItems="center" mt="5">

                    <Center w="30%">

                        <Text>{month}
                            <Text style={styles.H1}> {day} </Text>
                            <Text>{year}</Text>
                        </Text>

                    </Center>
                    <Center w="30%">
                        <Box w="100%">
                            <Progress size="md" bg="primary.900" _filledTrack={{
                                bg: "primary.200"
                            }} value={75} mx="1" />
                        </Box>
                    </Center>
                    <Center w="30%">
                    <Text><Text style={styles.H1}>80</Text>/100
                    </Text>
                    </Center>
                </HStack>
            </Stack>

            <Stack space={3} alignItems="center">
                <HStack space={3} alignItems="center" mt="5">

                    <Center w="30%">

                        <Text>{month}
                            <Text style={styles.H1}> 2 </Text>
                            <Text>{year}</Text>
                        </Text>

                    </Center>
                    <Center w="30%">
                        <Box w="100%">
                            <Progress size="md" bg="primary.900" _filledTrack={{
                                bg: "primary.200"
                            }} value={20} mx="1" />
                        </Box>
                    </Center>
                    <Center w="30%">
                    <Text><Text style={styles.H1}>20</Text>/100
                    </Text>
                    </Center>
                </HStack>
            </Stack>

            <Stack space={3} alignItems="center">
                <HStack space={3} alignItems="center" mt="5">

                    <Center w="30%">

                        <Text>{month}
                            <Text style={styles.H1}> 3 </Text>
                            <Text>{year}</Text>
                        </Text>

                    </Center>
                    <Center w="30%">
                        <Box w="100%">
                            <Progress size="md" bg="primary.900" _filledTrack={{
                                bg: "primary.200"
                            }} value={50} mx="1" />
                        </Box>
                    </Center>
                    <Center w="30%">
                    <Text><Text style={styles.H1}>50</Text>/100
                    </Text>
                    </Center>
                </HStack>
            </Stack>


        </ScrollView>


    );
}

export default Logs;