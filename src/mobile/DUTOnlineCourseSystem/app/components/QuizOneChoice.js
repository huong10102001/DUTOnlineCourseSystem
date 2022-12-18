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
import Tag from "./Tag";
import { TAG_COLOR } from "../const/tagColor";
import { COLOR } from "../const/color";
const QuizOneChoice = ({ props }) => {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);
  const [value, setValue] = React.useState("");
  const [question, setQuestion] = React.useState(props.question);
  useEffect(() => {
    let ques = JSON.parse(JSON.stringify(question));
    for (let i = 0; i < ques.answers.length; i++) {
      ques.answers[i].is_correct = false;
    }
    setQuestion(ques);
    setCount(0);
  }, []);
  return (
    <View style={styles.contentComponent}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        Question {props.index + 1}: {props.question.content}
      </Text>
      <View style={{ flexDirection: "row", paddingVertical: 4 }}>
        <Tag
          props={{
            content: props.question.score + " points",
            type: TAG_COLOR["POINT"],
          }}
        ></Tag>
        <View style={{ width: 8 }}></View>
        <Tag
          props={{
            content: props.question.level,
            type: TAG_COLOR[props.question.level],
          }}
        ></Tag>
      </View>
      <RadioButton.Group
        onValueChange={(newValue) => {
          setValue(newValue);
          let ques = JSON.parse(JSON.stringify(question));
          for (let i = 0; i < ques.answers.length; i++) {
            ques.answers[i].is_correct = false;
            if (ques.answers[i].id == newValue) {
              ques.answers[i].is_correct = true;
            }
          }
          setQuestion(ques);
          setCount(1);
          props.onChange(ques, [newValue]);
        }}
        value={value}
      >
        {props.question.answers.map((e, index) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={e.id} color="#024547" />
            <Text>{e.content}</Text>
          </View>
        ))}
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
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
  },
  buttonCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
export default QuizOneChoice;
