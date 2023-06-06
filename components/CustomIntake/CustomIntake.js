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

function CustomIntake(props) {
    const [intake, setIntake] = React.useState("1000");
    return (
        <View>
            <Heading size={"lg"}>Custom Intake</Heading>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Input
                    variant={"filled"}
                    backgroundColor={"primary.100"}
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
                        <Text fontSize={"3xl"} color={"primary.600"}>
                            ml{"   "}
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
