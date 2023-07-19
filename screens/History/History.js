import { Text, View, ScrollView } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import Logs from "./Logs/logs";
import Visual from "./Visual/visual";
import SwitchSelector from "react-native-switch-selector";

function History() {
  const options = [
    { label: "List", value: "1" },
    { label: "Graph", value: "2" },
  ];

  const [value, setValue] = React.useState(true);

  return (
    <SafeAreaView>
      <SwitchSelector
        options={options}
        initial={0}
        buttonColor={"#0891b2"}
        onPress={(value) => {
          if (value == 1) {
            setValue(true);
          } else {
            setValue(false);
          }
        }}
        style={{ padding: 10, paddingTop: 20 }}
      />
      {value ? <Logs /> : <Visual />}
    </SafeAreaView>
  );
}

export default History;
