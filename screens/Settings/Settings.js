import { View, Button, Pressable, Actionsheet, useDisclose } from "native-base";
import { Text } from "native-base";
import { useColorMode, useColorModeValue } from "native-base";
import React from "react";
import { SafeAreaView, Alert, Modal } from "react-native";
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
function Settings() {
    const { toggleColorMode, bg, textColor, unit, setUnit, renderValue } =
        React.useContext(AppContext);

    const { showActionSheetWithOptions } = useActionSheet();

    const [actionElement, setActionElement] = React.useState();
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclose();
    const bottomInset = useKeyboardBottomInset();
    const [goal, setGoal] = React.useState(0);
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        fetchGoal();
    }, [goal, isOpen]);

    const fetchGoal = () => {
        async function fetchGoal() {
            const goal = await getGoal();
            setGoal(goal);
        }
        fetchGoal();
    };

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
                    onPress: () => console.log("Cancel Pressed"),
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
        <SafeAreaView>
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

            <View style={styles.container}>
                <Button
                    style={styles.settingsPuck}
                    variant="unstyled"
                    onPress={() => {
                        setActionElement(
                            <ModifyGoal goal={goal} onClose={onClose} />
                        );
                        onOpen();
                    }}
                    background={"white"}
                    width={"50%"}
                    borderRadius={15}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text style={styles.modifyGoalText}>
                        Daily Goal{"      "}
                        <Pressable>
                            <Feather name="edit" size={20} />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={"lg"}>
                        {renderValue(goal)} {unit}
                    </Text>
                </Button>
                <Button
                    style={styles.settingsPuck}
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
                    <Text style={styles.modifyGoalText}>
                        User Info{"        "}
                        <Pressable>
                            <Feather name="edit" size={20} />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={"lg"}>
                        sd
                    </Text>
                </Button>
                <Button
                    style={styles.settingsPuck}
                    variant="unstyled"
                    onPress={() => {
                        handleUnitChange();
                    }}
                    background={"white"}
                    width={"50%"}
                    borderRadius={15}
                    _pressed={{ opacity: 0.5 }}
                >
                    <Text style={styles.modifyGoalText}>
                        Unit{"                  "}
                        <Pressable>
                            <Feather name="edit" size={20} />
                        </Pressable>
                    </Text>
                    <Text color={textColor} fontSize={"lg"}>
                        {unit}
                    </Text>
                </Button>
            </View>
            <Button style={styles.resetButton} onPress={resetHistory}>
                Reset History Logs
            </Button>
            <Actionsheet
                isOpen={isOpen}
                onClose={() => {
                    Keyboard.dismiss();
                    onClose();
                }}
            >
                <Actionsheet.Content bottom={bottomInset}>
                    <View width={"100%"} padding={2}>
                        {actionElement}
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        // backgroundColor: "red",
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
