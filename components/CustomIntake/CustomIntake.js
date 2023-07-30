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
import AppContext from "../../Context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard, TouchableWithoutFeedbackComponent } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

function CustomIntake(props) {
    const [intake, setIntake] = React.useState("0");
    const { unit, textColor } = React.useContext(AppContext);
    const intakeRef = React.useRef(null);
    return (
        <View>
            <Heading color={textColor} size={"lg"}>
                Custom Intake
            </Heading>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Input
                    variant={"filled"}
                    backgroundColor={"primary.100"}
                    ref={intakeRef}
                    keyboardType="number-pad"
                    type={"number"}
                    value={intake}
                    size={"2xl"}
                    onChange={(e) => {
                        setIntake(e.nativeEvent.text);
                    }}
                    color={"primary.600"}
                    fontSize={"2xl"}
                    clearTextOnFocus={true}
                    borderRadius={10}
                    InputRightElement={
                        <Pressable onPress={() => intakeRef.current.focus()}>
                            <Text fontSize={"3xl"} color={"primary.600"}>
                                {unit}
                                {"   "}
                            </Text>
                        </Pressable>
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
                onPress={(e) => {
                    props.increaseProgress(intake);
                    props.onClose();
                }}
            >
                Add
            </Button>
        </View>
    );
}

export default CustomIntake;
