import { Text } from "native-base";
import React from "react";
import { SafeAreaView, View } from "react-native";
import styles from "./styles"
import * as Progress from 'react-native-progress';

function Logs() {

    const month = "April";
    const day = "1";
    const year = "2023";

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.flexContainer}>
                <View style={styles.flexRow}>
                    <Text>{month}
                    <Text style={styles.H1}> {day} </Text>
                    <Text>{year}</Text>
                    </Text>
                </View>
                <View style={styles.flexRow}>
                    <Progress.Bar progress={0.3} width={130} height={15} />
                </View>
                <View style={styles.flexRow}>
                    <Text>20/100</Text>                    
                </View>

            </View>
            
        </SafeAreaView>
    );
}

export default Logs;