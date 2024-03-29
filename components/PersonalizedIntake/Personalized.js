import React from "react";
import {
    Text,
    View,
    Heading,
    Input,
    KeyboardAvoidingView,
    Button,
    Pressable,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { modifyGoal } from "../../utils/asyncStorage";
import AppContext from "../../Context/AppContext";

function PersonalizedIntake(props) {
    const { goal, onClose } = props;
    const { unit, textColor, mainBgColor } = React.useContext(AppContext);
    const [weight, setWeight] = React.useState("");
    const [age, setAge] = React.useState("");
    const [gender, setGender] = React.useState("male");

    const weightRef = React.useRef(null);
    const ageRef = React.useRef(null);

    const setDBGoal = async (goal) => {
        await modifyGoal(goal);
    };

    //Calculate Function
    const calculateWaterIntake = () => {
        const weightInKg = parseFloat(weight);
        const ageInYears = parseInt(age);

        if (gender === "male") {
            let dailyIntake = weightInKg * 35;

            if (ageInYears >= 9 && ageInYears <= 18) {
                dailyIntake += 300; // Add extra 300 mL for individuals aged 9-18
            }

            return dailyIntake;
        } else if (gender === "female") {
            let dailyIntake = weightInKg * 31;

            if (ageInYears >= 9 && ageInYears <= 18) {
                dailyIntake += 300; // Add extra 300 mL for individuals aged 9-18
            }

            return dailyIntake;
        } else {
            return null; // Handle case when gender is not selected
        }
    };

    const handleGoalUpdate = async () => {
        const dailyIntake = calculateWaterIntake();
        if (dailyIntake !== null) {
            //const goal = { weight, age, gender, dailyIntake };
            const goal = dailyIntake;
            await setDBGoal(goal);
            onClose();
        } else {
            // Handle case when gender is not selected
            // Display an error message or provide appropriate feedback to the user
        }
    };

    return (
        <KeyboardAvoidingView behavior="height">
            <Heading color={textColor} size={"lg"}>
                User Info
            </Heading>
            <Heading color={textColor} size={"sm"}>
                Enter your details to get personalized intake recommendation
                from us
            </Heading>

            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Input
                    variant={"filled"}
                    backgroundColor={"primary.100"}
                    keyboardType="number-pad"
                    type={"number"}
                    size={"2xl"}
                    ref={weightRef}
                    onChange={(e) => {
                        setWeight(e.nativeEvent.text);
                    }}
                    color={"primary.600"}
                    fontSize={"2xl"}
                    clearTextOnFocus={true}
                    borderRadius={10}
                    InputRightElement={
                        <Pressable
                            onPress={() => {
                                weightRef.current.focus();
                            }}
                        >
                            <Text fontSize={"xl"} color={"primary.600"}>
                                Weight (in kg)
                                {"   "}
                            </Text>
                        </Pressable>
                    }
                ></Input>
            </View>

            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Input
                    variant={"filled"}
                    backgroundColor={"primary.100"}
                    keyboardType="number-pad"
                    type={"number"}
                    ref={ageRef}
                    value={age}
                    size={"2xl"}
                    onChange={(e) => {
                        setAge(e.nativeEvent.text);
                    }}
                    color={"primary.600"}
                    fontSize={"2xl"}
                    clearTextOnFocus={true}
                    borderRadius={10}
                    InputRightElement={
                        <Pressable onPress={() => ageRef.current.focus()}>
                            <Text fontSize={"xl"} color={"primary.600"}>
                                Age
                                {"   "}
                            </Text>
                        </Pressable>
                    }
                />
            </View>

            <View style={{ marginTop: 20, marginBottom: 10 }}>
                <Text color={textColor} fontSize="xl" marginBottom={2}>
                    Gender:
                </Text>
                <Button.Group>
                    <Button
                        bgColor={gender === "male" ? "primary.400" : "gray.200"}
                        _text={{ color: "black" }}
                        style={{ width: "25%" }}
                        borderRadius={10}
                        onPress={() => {
                            setGender("male");
                        }}
                    >
                        Male
                    </Button>
                    <Button
                        bgColor={
                            gender === "female" ? "primary.400" : "gray.200"
                        }
                        style={{ width: "25%" }}
                        _text={{ color: "black" }}
                        borderRadius={10}
                        onPress={() => {
                            setGender("female");
                        }}
                    >
                        Female
                    </Button>
                </Button.Group>
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
                Generate Intake recommendation
            </Button>
        </KeyboardAvoidingView>
    );
}

export default PersonalizedIntake;
