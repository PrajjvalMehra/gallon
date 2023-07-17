import React,{ useState, useEffect } from "react";
import {
    Text,
    View,
    Heading,
    Input,
    KeyboardAvoidingView,
    Button,
    Switch,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';
import { ToastContainer, toast } from 'react-toastify';
import AppContext from "../../Context/AppContext";

function DynamicNotification(props) {

    const { onClose } = props;
    const [notificationEnabled, setNotificationEnabled] = React.useState(false);
    const [schedule, setSchedule] = useState([]);

    const [notificationInterval, setNotificationInterval] = React.useState("");

    const handleIntervalChange = text => setNotificationInterval(text);

    useEffect(() => {
        (async () => {

            const previouslyScheduled = await getSchedule();
            setSchedule(previouslyScheduled);


            if (previouslyScheduled.find((item) => item.type === 'reminder')) {
                setNotificationEnabled(true);
                setNotificationInterval(async () => {
                    const now = new Date();
                    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
                    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);

                    // Check if the current time is within the time period
                    if (now >= start && now <= end) {
                        await scheduleReminder();
                    }
                }, 15 * 60 * 1000);
            }
        })();

    }, []);



    const handleReminderPress = async () => {

        if (!notificationEnabled) {
            const scheduled = await scheduleReminder();
            if (scheduled) {
                setNotificationEnabled(true);
                setSchedule(await getSchedule());
            }
        }
        else {
            cancelReminder();
            setNotificationEnabled(false);
        }



        onClose();
    };
    
    const handleGoalUpdate = async () => {
        Keyboard.dismiss();
        await setDBGoal(localGoal);
        onClose();
      };

    return (
        <KeyboardAvoidingView behavior="padding" enabled>
            <Heading size="lg">Set repeating notifications</Heading>
            <Heading size="sm">Toggle this switch to turn repeating notifications ON/OFF</Heading>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                }}
            >
                <Text fontSize="xl" marginRight={4}>
                    Notifications:
                </Text>
                <Switch
                    isChecked={notificationEnabled}
                    onToggle={handleReminderPress}
                    size="lg"
                />
            </View>
            {notificationEnabled && (
                <View style={{ marginBottom: 20 }}>
                    <Text fontSize="xl" marginBottom={2}>
                        Notification Interval (minutes):
                    </Text>
                    <Input
                        variant="filled"
                        backgroundColor="primary.100"
                        keyboardType="number-pad"
                        type="number"
                        value={notificationInterval}
                        size="lg"
                        onChangeText={handleIntervalChange}
                        color="primary.600"
                        fontSize="lg"
                        borderRadius={10}
                    />
                </View>
            )}
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
                onPress={handleReminderPress}
            >
                Save configuration
            </Button>
        </KeyboardAvoidingView>
    );
}

export default DynamicNotification;


async function scheduleReminder() {

    try {
        const permissions = await Notifications.getPermissionsAsync();
        console.log('-Permissions:', permissions);
        if (!permissions.granted) {
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true
                }
            });
            if (!request.granted) {
                return false;
            }
        }


        // Schedule a notification.
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Drink Water Reminder',
                body: 'its time to drink water',
                sound: true,
                priority: Notifications.AndroidAudioContentType.HIGH,
                badge: 0,
                data: {
                    type: 'reminder'
                }
            },
            trigger: null,// Trigger immediately
        });
        console.log('Notification ID:', id);
        if (!id) {
            return false
        }
        return true;
    }
    catch {
        return false
    }

}

async function cancelReminder() {
    let cancelled = false;
    const schedule = await getSchedule();
    schedule.forEach(async (item) => {
        if (item.type === 'reminder') {
            await Notifications.cancelScheduledNotificationAsync(item.id);
            cancelled = true;
        }
    });
}

async function getSchedule() {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const schedule = [];
    scheduledNotifications.forEach((scheduledNotification) => {
        schedule.push({
            id: scheduledNotification.identifier,
            type: scheduledNotification.content.data.type
        });
    });
    return schedule;
}
