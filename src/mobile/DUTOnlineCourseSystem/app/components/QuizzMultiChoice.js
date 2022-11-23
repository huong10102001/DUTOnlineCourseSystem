import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import { Checkbox } from "react-native-paper";
const QuizzMultiChoice = () => {
  const [checked_1, setChecked_1] = React.useState(false);
  const [checked_2, setChecked_2] = React.useState(false);
  const [checked_3, setChecked_3] = React.useState(false);
  const [checked_4, setChecked_4] = React.useState(false);
  const data = {
    id: 1,
    question: "Xin chao",
    answers: [{}],
  };
  return (
    <View style={styles.contentComponent}>
      <Text>
        Cau {data.id}: {data.question}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={checked_1 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked_1(!checked_1);
          }}
        />
        <Text>Alo</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={checked_2 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked_2(!checked_2);
          }}
        />
        <Text>Alo</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={checked_3 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked_3(!checked_3);
          }}
        />
        <Text>Alo</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={checked_4 ? "checked" : "unchecked"}
          onPress={() => {
            setChecked_4(!checked_4);
          }}
        />
        <Text>Alo</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
});
export default QuizzMultiChoice;
