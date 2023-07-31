import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Heading,
    Input,
    KeyboardAvoidingView,
    Button,
    Switch,
    Keyboard,
    Pressable,
} from "native-base";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { getPermissionsAsync } from "expo-notifications";
import * as Permissions from "expo-permissions";

import AppContext from "../../Context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parse } from "expo-linking";

function DynamicNotification(props) {
    const { onClose } = props;
    const [notificationEnabled, setNotificationEnabled] = React.useState(false);
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notificationInterval, setNotificationInterval] = React.useState(60);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    const [schedule, setSchedule] = useState([]);

    const { textColor, mainBgColor } = React.useContext(AppContext);
    const refInput = React.useRef(null);

    React.useEffect(() => {
        checkInterval();
    }, []);

    const checkInterval = async () => {
        console.log("checking interval");
        const data = await Notifications.getAllScheduledNotificationsAsync();
        if (data.length === 0) {
            setNotificationInterval(60);
            setNotificationEnabled(false);
            refInput.current.value = "60";
        } else {
            setNotificationEnabled(true);
            setNotificationInterval(data[0].trigger.seconds);
            refInput.current.value = data[0].trigger.seconds.toString();
        }
    };

    const subscribeToNotifications = (interval) => {
        console.log("interval", interval);
        registerForPushNotificationsAsync()
            .then((token) => {
                setExpoPushToken(token);
                console.log("token", token);
                if (token === undefined) {
                    setNotificationEnabled(false);
                }
                Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Time to take a break and hydrate!",
                        body: "Log your intake",
                    },
                    trigger: {
                        seconds: interval === "" ? 60 : interval,
                        repeats: true,
                    },
                });
                Alert.alert(
                    "Notifications Enabled",
                    `You will receive alerts every ${interval} minutes`
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <Heading size="lg" color={textColor}>
                Set repeating notifications
            </Heading>
            <Heading size="sm" color={textColor}>
                Modify the interval between hydration reminders
            </Heading>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            ></View>
            <View style={{ marginBottom: 10 }}>
                <Input
                    variant="filled"
                    backgroundColor="primary.100"
                    keyboardType="number-pad"
                    type="number"
                    placeholder="60"
                    size="2xl"
                    value={notificationInterval.toString()}
                    onChange={(e) => {
                        if (e.nativeEvent.text === "") {
                            setNotificationInterval("");
                            return;
                        }
                        setNotificationInterval(parseInt(e.nativeEvent.text));
                    }}
                    ref={refInput}
                    color="primary.600"
                    fontSize="2xl"
                    borderRadius={10}
                    InputRightElement={
                        <Pressable
                            onPress={() => {
                                refInput.current.focus();
                            }}
                        >
                            <Text fontSize={"2xl"} color={"primary.600"}>
                                minutes{"  "}
                            </Text>
                        </Pressable>
                    }
                />
            </View>
            <Button
                bgColor="primary.400"
                _text={{ color: "black" }}
                _pressed={{ bg: "primary.500" }}
                variant="subtle"
                endIcon={
                    <MaterialCommunityIcons
                        name="water-plus-outline"
                        size={24}
                        color="black"
                    />
                }
                size="lg"
                borderRadius={10}
                onPress={() => {
                    Alert.alert(
                        "Enable Notifications",
                        `This will enable alerts every ${
                            notificationInterval === ""
                                ? "60"
                                : notificationInterval
                        } minutes`,
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "destructive",
                            },
                            {
                                text: "Yes",
                                onPress: () => {
                                    setNotificationEnabled(true);
                                    subscribeToNotifications(
                                        notificationInterval
                                    );
                                },
                            },
                        ]
                    );
                }}
            >
                Enable Alerts
            </Button>
            <Button
                style={{ marginTop: 20 }}
                bgColor={notificationEnabled ? "danger.500" : "danger.200"}
                _text={{ color: "black" }}
                _pressed={{ bg: "danger.400" }}
                disabled={!notificationEnabled}
                variant="subtle"
                onPress={async () => {
                    Alert.alert(
                        "Are you sure?",
                        "This will disable all notifications",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "destructive",
                            },
                            {
                                text: "Yes",
                                onPress: async () => {
                                    await Notifications.cancelAllScheduledNotificationsAsync();
                                    setNotificationEnabled(false);
                                },
                            },
                        ]
                    );
                }}
                endIcon={
                    <MaterialCommunityIcons
                        name="water-minus-outline"
                        size={24}
                        color="black"
                    />
                }
                size="lg"
                borderRadius={10}
            >
                Disable Alerts
            </Button>
        </KeyboardAvoidingView>
    );
}

export default DynamicNotification;

async function schedulePushNotification(time, day) {
    time = new Date(time.getTime() - 5 * 60000);
    var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const weekday = days.indexOf(day) + 1;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: "hello",
            body: "gallon",
            // sound: 'default',
        },
        trigger: {
            weekday: weekday,
            hour: hours,
            minute: minutes,
            repeats: true,
        },
    });
    console.log("notif id on scheduling", id);
    return id;
}

async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: true,
            lightColor: "#FF231F7C",
            lockscreenVisibility:
                Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true,
        });
    }

    return token;
}
