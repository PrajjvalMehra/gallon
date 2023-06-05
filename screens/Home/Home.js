import { Button, KeyboardAvoidingView, ScrollView, View } from "native-base";
import {
    Text,
    VStack,
    Heading,
    Actionsheet,
    useDisclose,
    Divider,
} from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { unitValueDisplay } from "../../utils/helpers";
import { getUnit, getGoal } from "../../utils/asyncStorage";
import { fetchIntake, increaseIntake } from "../../queries/homeQueries";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AppContext from "../../Context/AppContext";
import CustomIntake from "../../components/CustomIntake/CustomIntake";
import { Keyboard, Platform, KeyboardEvent } from "react-native";
import { parse } from "expo-linking";
import { useIsFocused } from "@react-navigation/native";

const useKeyboardBottomInset = () => {
    const [bottom, setBottom] = React.useState(0);
    const subscriptions = React.useRef([]);

    React.useEffect(() => {
        function onKeyboardChange(e) {
            if (
                e.startCoordinates &&
                e.endCoordinates.screenY < e.startCoordinates.screenY
            )
                setBottom(e.endCoordinates.height);
            else setBottom(0);
        }

        if (Platform.OS === "ios") {
            subscriptions.current = [
                Keyboard.addListener(
                    "keyboardWillChangeFrame",
                    onKeyboardChange
                ),
            ];
        } else {
            subscriptions.current = [
                Keyboard.addListener("keyboardDidHide", onKeyboardChange),
                Keyboard.addListener("keyboardDidShow", onKeyboardChange),
            ];
        }
        return () => {
            subscriptions.current.forEach((subscription) => {
                subscription.remove();
            });
        };
    }, [setBottom, subscriptions]);

    return bottom;
};
function Home() {
    const isFocus = useIsFocused();
    const { appState } = React.useContext(AppContext);
    const [fill, setFill] = React.useState(0);
    const [goal, setGoal] = React.useState(0);
    const [unit, setUnit] = React.useState("ml");
    const [progress, setProgress] = React.useState(2);
    const { isOpen, onOpen, onClose } = useDisclose();

    React.useEffect(() => {
        if (!isOpen) Keyboard.dismiss();
    }, [isOpen]);

    React.useEffect(() => {
        async function fetchUnit() {
            const unit = await getUnit();
            setUnit(unit);
        }
        async function fetchGoal() {
            const goal = await getGoal();
            setGoal(goal);
        }
        async function fetchProgress() {
            const progress = await fetchIntake();
            setProgress(progress);
        }
        fetchProgress();
        fetchGoal();
        progressCircle();
        fetchUnit();
    }, [progress, appState, isOpen, isFocus]);

    const progressCircle = () => {
        const fill = Math.ceil((progress * 100) / goal);
        // if (fill / 100 > 0) return;
        setFill(fill);
    };
    const increaseProgress = (value) => {
        const toInt = parseInt(value);
        onClose();
        increaseIntake(toInt);
        setProgress(progress + toInt);
    };

    const bottomInset = useKeyboardBottomInset();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.container}>
                <VStack>
                    <View style={styles.headerContainer}>
                        <Heading>{new Date().toDateString()}</Heading>
                    </View>
                    <View style={styles.progressContainer}>
                        <AnimatedCircularProgress
                            ref={(ref) => {
                                if (isFocus) progressCircle();
                            }}
                            size={260}
                            width={30}
                            fill={fill}
                            tintColor="#a5f3fc"
                            lineCap="round"
                            animate={(fill) => {}}
                            rotation={0}
                            onAnimationComplete={() => {}}
                            backgroundColor={"#164e63"}
                        >
                            {(fill) => (
                                <Text fontSize={"4xl"}>{Math.ceil(fill)}%</Text>
                            )}
                        </AnimatedCircularProgress>
                    </View>
                    <View style={styles.actionsContainer}>
                        <View style={styles.buttonContainer}>
                            <Button
                                styles={styles.modifyButton}
                                onPress={(e) => increaseProgress(250)}
                                bgColor={"primary.100"}
                                borderRadius={10}
                                _pressed={{ bg: "primary.200" }}
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
                                borderRadius={10}
                                bgColor={"primary.200"}
                                _pressed={{ bg: "primary.300" }}
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
                                bgColor={"primary.300"}
                                _pressed={{ bg: "primary.400" }}
                                onPress={(e) => {
                                    onOpen();
                                }}
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
                                <Text>Modify</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <VStack space={2}>
                            <Heading>Today's Progress</Heading>
                            <Text fontSize={"3xl"}>
                                <Text color={"primary.600"}>{progress}</Text> /{" "}
                                {goal} <Text fontSize={"2xl"}>{unit}</Text>
                            </Text>
                        </VStack>
                    </View>
                </VStack>
                <Actionsheet size="full" isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content bottom={bottomInset}>
                        <View width={"100%"} padding={2}>
                            <CustomIntake
                                increaseProgress={increaseProgress}
                                onClose={() => {
                                    onClose();
                                    Keyboard.dismiss();
                                }}
                            />
                        </View>
                    </Actionsheet.Content>
                </Actionsheet>
            </ScrollView>
        </KeyboardAvoidingView>
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
        marginTop: 30,
        width: "100%",
        justifyContent: "space-between",
        // backgroundColor: "red",
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
        width: "30%",
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
