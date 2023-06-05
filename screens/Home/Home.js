import { Button, ScrollView, View } from "native-base";
import { Text, VStack, Heading, HStack } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { unitValueDisplay } from "../../utils/helpers";
import { getUnit, getGoal } from "../../utils/asyncStorage";
import { fetchIntake, increaseIntake } from "../../queries/homeQueries";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
function Home() {
    const [fill, setFill] = React.useState(0);
    const [goal, setGoal] = React.useState(0);
    const [unit, setUnit] = React.useState("ml");
    const [progress, setProgress] = React.useState(2);
    React.useEffect(() => {
        console.log("useEffect");
        async function fetchUnit() {
            const unit = await getUnit();
            setUnit(unit);
        }
        async function fetchGoal() {
            const goal = await getGoal();
            console.log(goal, "goal");
            setGoal(goal);
        }
        async function fetchProgress() {
            const progress = await fetchIntake();
            setProgress(progress);
            console.log(progress, "prog");
        }
        fetchProgress();
        fetchGoal();
        fetchUnit();
        progressCircle();
        console.log(unit, goal, progress);
    }, [progress]);
    const progressCircle = () => {
        console.log("sdf", progress, goal);
        const fill = Math.ceil((progress * 100) / goal);
        console.log("sdf", fill);
        return fill;
    };
    const increaseProgress = (value) => {
        console.log(typeof progress, "value");
        increaseIntake(value);
        setProgress(progress + value);
    };
    return (
        <ScrollView style={styles.container}>
            <VStack>
                <View style={styles.headerContainer}>
                    <Heading>{new Date().toDateString()}</Heading>
                </View>
                <View style={styles.progressContainer}>
                    <AnimatedCircularProgress
                        size={260}
                        width={30}
                        fill={progressCircle()}
                        tintColor="#a5f3fc"
                        lineCap="round"
                        rotation={0}
                        onAnimationComplete={() =>
                            console.log("onAnimationComplete")
                        }
                        backgroundColor={"#164e63"}
                    >
                        {(fill) => <Text fontSize={"4xl"}>{fill}%</Text>}
                    </AnimatedCircularProgress>
                </View>
                <View style={styles.actionsContainer}>
                    <View style={styles.buttonContainer}>
                        <Button
                            styles={styles.modifyButton}
                            onPress={(e) => increaseProgress(250)}
                            // marginRight={"2.5%"}
                            bgColor={"primary.200"}
                            borderRadius={10}
                            _pressed={{ bg: "primary.300" }}
                            variant={"subtle"}
                            rightIcon={
                                <MaterialCommunityIcons
                                    name="cup-water"
                                    size={24}
                                    color="black"
                                />
                            }
                        >
                            <Text>
                                250
                                {unit}
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            styles={styles.modifyButton}
                            onPress={(e) => increaseProgress(500)}
                            // marginRight={"2.5%"}
                            borderRadius={10}
                            bgColor={"primary.300"}
                            _pressed={{ bg: "primary.400" }}
                            variant={"subtle"}
                            endIcon={
                                <MaterialCommunityIcons
                                    name="bottle-wine-outline"
                                    size={24}
                                    color="black"
                                />
                            }
                        >
                            <Text>
                                500
                                {unit}
                            </Text>
                        </Button>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            styles={styles.modifyButton}
                            bgColor={"primary.400"}
                            _pressed={{ bg: "primary.500" }}
                            onPress={increaseProgress}
                            // marginRight={"2.5%"}
                            borderRadius={10}
                            variant={"subtle"}
                            rightIcon={
                                <Ionicons
                                    name="ios-water-outline"
                                    size={22}
                                    color="black"
                                />
                            }
                        >
                            <Text>Custom</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <VStack space={2}>
                        <Heading>Today's Progress</Heading>
                        <Text fontSize={"3xl"}>
                            {progress} / {goal}{" "}
                            <Text fontSize={"2xl"}>{unit}</Text>
                        </Text>
                    </VStack>
                </View>
            </VStack>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        paddingRight: 30,
        paddingLeft: 30,
        paddingBottom: 30,
        paddingTop: 30,
    },
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
    },
    progressContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    buttonContainer: {
        // width: "33.3%",
    },
    dataContainer: {
        backgroundColor: "white",
        height: 120,
        marginTop: 30,
        padding: 15,
        borderRadius: 20,
    },
});

export default Home;
