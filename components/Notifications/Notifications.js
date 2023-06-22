import React from "react";
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
import AppContext from "../../Context/AppContext";

function Notifications(props) {
  const { goal, onClose } = props;
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);
  const [notificationInterval, setNotificationInterval] = React.useState("");


  const saveConfiguration = async () => {
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
          marginTop:20,
          marginBottom: 20,
        }}
      >
        <Text fontSize="xl" marginRight={4}>
          Notifications:
        </Text>
        <Switch
          isChecked={notificationEnabled}
          onToggle={(value) => setNotificationEnabled(value)}
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
            onChange={(e) => {
              setNotificationInterval(e.nativeEvent.text);
            }}
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
        onPress={saveConfiguration}
      >
        Save configuration
      </Button>
    </KeyboardAvoidingView>
  );
}

export default Notifications;
