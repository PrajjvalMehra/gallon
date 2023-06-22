import { View, Button, Pressable, Actionsheet, useDisclose } from "native-base";
import { Text } from "native-base";
import { useColorMode, useColorModeValue } from "native-base";
import React from "react";
import { SafeAreaView, Alert } from "react-native";
import AppContext from "../../Context/AppContext";
import { StyleSheet } from "react-native";
import { Keyboard, Platform, KeyboardEvent } from "react-native";

import ModifyGoal from "../../components/ModifyGoal/ModifyGoal";
import { Feather } from "@expo/vector-icons";
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
        Keyboard.addListener("keyboardWillChangeFrame", onKeyboardChange),
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
  const { toggleColorMode, bg, textColor } = React.useContext(AppContext);
  const [actionElement, setActionElement] = React.useState();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclose();
  const bottomInset = useKeyboardBottomInset();
  const [goal, setGoal] = React.useState(0);

  React.useEffect(() => {
    fetchGoal();
  }, [goal, isOpen]);

  const fetchGoal = () => {
    async function fetchGoal() {
      const goal = await getGoal();
      handleGoalChange(goal);
    }
    fetchGoal();
  };

  const handleGoalChange = (goal) => {
    setGoal(goal);
  };

  const resetHistory = () =>
    Alert.alert(
      "Reset History Logs",
      "It will erase ALL your logs. Would you like to continue?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => dropTable() },
      ]
    );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          variant="unstyled"
          onPress={() => {
            setActionElement(
              <ModifyGoal
                handleGoalChange={handleGoalChange}
                goal={goal}
                onClose={onClose}
              />
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
            {goal} ml
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
  },
  modifyGoalContainer: {
    backgroundColor: "#fff",
    width: "50%",
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
  },
  modifyGoalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  resetButton: {
    color: "#dc2626",
    margin: 20,
  },
});

export default Settings;
