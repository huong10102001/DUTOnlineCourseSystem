import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import CheckBox from "./Checkbox";
import Tag from "./Tag";
import { TAG_COLOR } from "../const/tagColor";
import {COLOR} from "../const/color";
const QuizMultiChoice = ({ props }) => {
  const [choices, setChoices] = useState({ list: [] });
  const [question, setQuestion] = useState(props.question);

  useEffect(() => {
    let ques = JSON.parse(JSON.stringify(question));
    for (let i = 0; i < ques.answers.length; i++) {
      ques.answers[i].is_correct = false;
    }
    setQuestion(ques);
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
      {question.answers.map((e, index) => (
        <View
          style={{ flexDirection: "row", alignItems: "center" }}
          key={index}
        >
          <CheckBox
            label="Checkbox"
            selected={question.answers[index].is_correct}
            onPress={() => {
              let ques = JSON.parse(JSON.stringify(question));
              ques.answers[index].is_correct = !ques.answers[index].is_correct;
              setQuestion(ques);
              let indexOfChoice = choices.list.filter((id) => {
                return id == ques.answers[index].id;
              });
              if (indexOfChoice.length != 0) {
                let newChoice = {
                  ...choices,
                  list: [
                    ...choices.list.filter((id) => {
                      return id != ques.answers[index].id;
                    }),
                  ],
                };
                console.log(newChoice);
                setChoices(newChoice);
                props.onChange(ques, newChoice.list);
              } else {
                let newChoice = {
                  ...choices,
                  list: [...choices.list, ques.answers[index].id],
                };
                setChoices(newChoice);
                console.log(newChoice);
                props.onChange(ques, newChoice.list);
              }
            }}
          />
          <Text>{e.content}</Text>
        </View>
      ))}
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
});
export default QuizMultiChoice;
