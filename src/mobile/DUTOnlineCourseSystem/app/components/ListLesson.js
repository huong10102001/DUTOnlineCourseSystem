import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import ChapterDropDown from "../components/ChapterDropDown";
const ListLesson = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const courseProcess = useSelector((state) => state.courseProcess);
  const renderChapterDropDown = () => {
    if (courseProcess.chapters.length >= 1) {
      console.log(courseProcess.chapters);
      return courseProcess.chapters.map((e, index) => {
        <View>
          <ChapterDropDown key={index} props={{ chapter: e }} />;
        </View>;
      });
    }
  };
  return (
    <TouchableOpacity>
      <View>
        {courseProcess.chapters.map((e, index) => {
          <View>
            <ChapterDropDown key={index} props={{ chapter: e }} />;
          </View>
        })}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});
export default ListLesson;
