import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import { RadioButton } from "react-native-paper";
const QuizzOneChoice = ({ props }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("first");
  const data = {
    id: 1,
    question: "Xin chao",
    answers: [{}],
  };
  // console.log(props);
  return (
    <View style={styles.contentComponent}>
    <Text>Cau {data.id}: {data.question}</Text>
      <RadioButton.Group
        onValueChange={(newValue) => setValue(newValue)}
        value={value}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="first" />
          <Text>
            First anh tuan dp trai nha ge maht trai lai tuan co nhieu dieu
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="second" />
          <Text>Second</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="third" />
          <Text>
            First anh tuan dp trai nha ge maht trai lai tuan co nhieu dieu
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton value="fourth" />
          <Text>Second</Text>
        </View>
      </RadioButton.Group>
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
export default QuizzOneChoice;
