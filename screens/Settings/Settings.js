import { View, Button, Pressable, Actionsheet, useDisclose } from "native-base";
import { Text } from "native-base";
import { useColorMode, useColorModeValue } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import AppContext from "../../Context/AppContext";
import { StyleSheet } from "react-native";
import { Keyboard, Platform, KeyboardEvent } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

import ModifyGoal from "../../components/ModifyGoal/ModifyGoal";
import { Feather } from "@expo/vector-icons";
import { getGoal } from "../../utils/asyncStorage";

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
  const { toggleColorMode, bg, textColor, unit, setUnit, renderValue } =
    React.useContext(AppContext);

  const { showActionSheetWithOptions } = useActionSheet();

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          style={styles.settingsPuck}
          variant="unstyled"
          onPress={() => {
            setActionElement(<ModifyGoal goal={goal} onClose={onClose} />);
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
            handleUnitChange();
          }}
          background={"white"}
          width={"50%"}
          borderRadius={15}
          _pressed={{ opacity: 0.5 }}
        >
          <Text style={styles.modifyGoalText}>
            Unit{"                    "}
            <Pressable>
              <Feather name="edit" size={20} />
            </Pressable>
          </Text>
          <Text color={textColor} fontSize={"lg"}>
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
    width: "49%",
  },
});

export default Settings;

//Done, Reset history logs
