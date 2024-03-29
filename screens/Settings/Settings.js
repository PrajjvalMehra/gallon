import {
    View,
    Button,
    Pressable,
    Actionsheet,
    useDisclose,
    Fab,
} from "native-base";
import { Text } from "native-base";
import { useColorMode, KeyboardAvoidingView } from "native-base";
import React from "react";
import { SafeAreaView, Alert, Modal, Animated, Easing } from "react-native";
import AppContext from "../../Context/AppContext";
import { StyleSheet } from "react-native";
import { Keyboard, Platform, KeyboardEvent } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import ModifyGoal from "../../components/ModifyGoal/ModifyGoal";
import { Feather, Entypo } from "@expo/vector-icons";
import PersonalizedIntake from "../../components/PersonalizedIntake/Personalized";
import Notifications from "../../components/Notifications/Notifications";
import { getGoal } from "../../utils/asyncStorage";
import { dropTable } from "../../queries/tableSetup";
import { PixelRatio } from "react-native";

const useKeyboardBottomInset = () => {
    const [bottom, setBottom] = React.useState(0);

    const subscriptions = React.useRef([]);

    React.useEffect(() => {
        subscriptions.current = [
            Keyboard.addListener("keyboardDidHide", (e) => setBottom(0)),
            Keyboard.addListener("keyboardDidShow", (e) => {
                if (Platform.OS === "android") {
                    setBottom(e.endCoordinates.height);
                } else {
                    setBottom(
                        Math.max(
                            e.startCoordinates.height,
                            e.endCoordinates.height
                        )
                    );
                }
            }),
        ];

        return () => {
            subscriptions.current.forEach((subscription) => {
                subscription.remove();
            });
        };
    }, [setBottom, subscriptions]);

    return bottom;
};
function Settings() {
    const {
        toggleColorMode,
        bg,
        textColor,
        unit,
        setUnit,
        renderValue,
        colorMode,
        mainBgColor,
    } = React.useContext(AppContext);
    const fontScale = PixelRatio.getFontScale();
    const getFontSize = (size) => size / fontScale;

    const { showActionSheetWithOptions } = useActionSheet();

    const [actionElement, setActionElement] = React.useState();
    const { isOpen, onOpen, onClose } = useDisclose();
    const bottomInset = useKeyboardBottomInset();
    const [goal, setGoal] = React.useState(0);
    const [puckIconColor, setPuckIconColor] = React.useState("black");
    const [modalVisible, setModalVisible] = React.useState(false);
    const bottomAni = React.useRef(new Animated.Value(bottomInset)).current;

    React.useEffect(() => {
        fetchGoal();
    }, [goal, isOpen]);

    React.useEffect(() => {
        if (colorMode === "dark") {
            setPuckIconColor("white");
        } else {
            setPuckIconColor("black");
        }
    }, [colorMode]);

    const fetchGoal = () => {
        async function fetchGoal() {
            const goal = await getGoal();
            setGoal(goal);
        }
        fetchGoal();
    };

    React.useEffect(() => {
        Animated.timing(bottomAni, {
            toValue: bottomInset,
            duration: 50,
            easing: Easing.out(Easing.bezier(0.25, 0.1, 0.25, 1)),
            useNativeDriver: false,
        }).start();
    }, [bottomInset]);

    const handleUnitChange = () => {
        const options = ["ml", "fl oz", "Cancel"];
        const cancelButtonIndex = 2;
        const cancelButtonTintColor = "red";

        showActionSheetWithOptions(
            {
                options,
                cancelButtonTintColor,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    setUnit("ml");
                } else if (buttonIndex === 1) {
                    setUnit("fl oz");
                }
            }
        );
    };

    const resetHistory = () => {
        Alert.alert(
            "Reset History Logs",
            "It will erase ALL your logs. Would you like to continue?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        dropTable();
                        setModalVisible(true);
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={{ height: "100%" }}>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Entypo
                            name="check"
                            size={50}
                            style={{ color: "green" }}
                        />
                        <Text style={styles.modalText}>
                            Reset Logs Successful
                        </Text>
                        <Button onPress={() => setModalVisible(!modalVisible)}>
                            Close
                        </Button>
                    </View>
                </View>
            </Modal>

            <View
                style={[
                    styles.container,
                    {
                        backgroundColor:
                            colorMode === "light" ? "#f5f5f5" : "black",
                    },
                ]}
            >
                <Button
                    style={[
                        styles.settingsPuck,
                        {
                            backgroundColor:
                                colorMode === "dark" ? "#1f2937" : "white",
                        },
                    ]}
                    variant="unstyled"
                    onPress={() => {
                        setActionElement(
                            <Notifications goal={goal} onClose={onClose} />
                        );
                        onOpen();
                    }}
                    background={"white"}
                    width={"50%"}
                    borderRadius={15}
                    marginBottom={2}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text
                        color={textColor}
                        style={[
                            styles.modifyGoalText,
                            { fontSize: getFontSize(15) },
                        ]}
                    >
                        Alerts{"              "}
                        <Pressable>
                            <Feather
                                color={puckIconColor}
                                name="edit"
                                size={getFontSize(15)}
                            />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={getFontSize(15)}>
                        Notifications
                    </Text>
                </Button>
                <Button
                    style={[
                        styles.settingsPuck,
                        {
                            backgroundColor:
                                colorMode === "dark" ? "#1f2937" : "white",
                        },
                    ]}
                    variant="unstyled"
                    onPress={() => {
                        setActionElement(
                            <ModifyGoal goal={goal} onClose={onClose} />
                        );
                        onOpen();
                    }}
                    width={"50%"}
                    borderRadius={15}
                    marginBottom={2}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text
                        color={textColor}
                        style={{
                            fontSize: getFontSize(15),
                            fontWeight: "bold",
                        }}
                    >
                        Daily Goal{"      "}
                        <Pressable>
                            <Feather
                                color={puckIconColor}
                                name="edit"
                                size={getFontSize(15)}
                            />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={getFontSize(15)}>
                        {renderValue(goal)} {unit}
                    </Text>
                </Button>
                <Button
                    style={[
                        styles.settingsPuck,
                        {
                            backgroundColor:
                                colorMode === "dark" ? "#1f2937" : "white",
                        },
                    ]}
                    variant="unstyled"
                    onPress={() => {
                        setActionElement(
                            <PersonalizedIntake goal={goal} onClose={onClose} />
                        );
                        onOpen();
                    }}
                    background={"white"}
                    width={"50%"}
                    borderRadius={15}
                    marginBottom={2}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text
                        color={textColor}
                        style={[
                            styles.modifyGoalText,
                            { fontSize: getFontSize(15) },
                        ]}
                    >
                        User Info{"        "}
                        <Pressable>
                            <Feather
                                color={puckIconColor}
                                name="edit"
                                size={getFontSize(15)}
                            />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={getFontSize(13)}>
                        Suggested Intake
                    </Text>
                </Button>
                <Button
                    style={[
                        styles.settingsPuck,
                        {
                            backgroundColor:
                                colorMode === "dark" ? "#1f2937" : "white",
                        },
                    ]}
                    variant="unstyled"
                    onPress={() => {
                        handleUnitChange();
                    }}
                    background={"white"}
                    width={"50%"}
                    borderRadius={15}
                    marginBottom={2}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text
                        color={textColor}
                        style={[
                            styles.modifyGoalText,
                            { fontSize: getFontSize(15) },
                        ]}
                    >
                        Unit{"                  "}
                        <Pressable>
                            <Feather
                                color={puckIconColor}
                                name="edit"
                                size={getFontSize(15)}
                            />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={getFontSize(14)}>
                        {unit}
                    </Text>
                </Button>
            </View>

            <Actionsheet
                isOpen={isOpen}
                onClose={() => {
                    Keyboard.dismiss();
                    onClose();
                }}
            >
                <Animated.View style={{ width: "100%", bottom: bottomAni }}>
                    <Actionsheet.Content
                        backgroundColor={
                            colorMode === "dark" ? "primary.900" : "white"
                        }
                    >
                        <View width={"100%"} padding={2}>
                            {actionElement}
                        </View>
                    </Actionsheet.Content>
                </Animated.View>
            </Actionsheet>
            <Button style={styles.resetButton} onPress={resetHistory}>
                Reset History Logs
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        height: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    modifyGoalText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    settingsPuck: {
        width: "47%",
        marginTop: 10,
        height: 70,
    },
    resetButton: {
        color: "#dc2626",
        margin: 20,
        borderRadius: 10,
        bottom: 0,
        position: "absolute",
        width: "90%",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.5)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default Settings;
