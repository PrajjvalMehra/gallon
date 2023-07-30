import React from "react";
import {
    Text,
    View,
    Heading,
    Input,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard, TouchableWithoutFeedbackComponent } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { modifyGoal } from "../../utils/asyncStorage";
import AppContext from "../../Context/AppContext";
function ModifyGoal(props) {
    const { goal, onClose } = props;
    const { unit, renderValue, textColor } = React.useContext(AppContext);
    const [localGoal, setLocalGoal] = React.useState(goal);

    const setDBGoal = async (goal) => {
        await modifyGoal(goal);
    };

    React.useEffect(() => {
        console.log("goal", goal);
    }, [goal]);

    const handleGoalUpdate = async () => {
        Keyboard.dismiss();
        await setDBGoal(localGoal);

        onClose();

        // handleGoalChange(localGoal);
    };

    return (
        <KeyboardAvoidingView bounces={false}>
            <Heading color={textColor} size={"lg"}>
                Modify Daily Goal
            </Heading>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Input
                    variant={"filled"}
                    backgroundColor={"primary.100"}
                    keyboardType="number-pad"
                    type={"number"}
                    value={localGoal.toString()}
                    size={"2xl"}
                    onChange={(e) => {
                        setLocalGoal(e.nativeEvent.text);
                    }}
                    color={"primary.600"}
                    fontSize={"2xl"}
                    clearTextOnFocus={true}
                    borderRadius={10}
                    InputRightElement={
                        <Text fontSize={"3xl"} color={"primary.600"}>
                            {unit.toString()}
                            {"   "}
                        </Text>
                    }
                ></Input>
            </View>
            <Button
                bgColor={"primary.400"}
                _text={{ color: "black" }}
                _pressed={{ bg: "primary.500" }}
                variant={"subtle"}
                endIcon={
                    <MaterialCommunityIcons
                        name="water-plus-outline"
                        size={24}
                        color="black"
                    />
                }
                size={"lg"}
                borderRadius={10}
                onPress={() => {
                    handleGoalUpdate();
                }}
            >
                Modify Goal
            </Button>
        </KeyboardAvoidingView>
    );
}

export default ModifyGoal;
