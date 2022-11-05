import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCourseProcess } from "../actions/courseProcessAction";
import { useState } from "react";
import { getCombinedStyles } from "react-native-paper";
import { Button } from "react-native-paper";
import { PROCESS_STATUS } from "../const/processStatus";
const ChapterDropDown = ({ props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hide, setHide] = useState(false);
  let chapter = {};
  console.log(props);
  if (props.chapter) {
    chapter = props.chapter;
    try {
      chapter.lessons.length;
    } catch {
      chapter.lessons = {};
    }
  }
  const [open, setOpen] = useState(false);
  return (
    <View style={{ paddingBottom: 8 }}>
      <TouchableOpacity
        //   onPress={(data) => {
        //     navigation.navigate("DetailCourse", { course_id: course_data.id });
        //   }}
        onPress={() => setHide(!hide)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#F2F2F2",
            borderRadius: 5,
            alignItems: "center",
            padding: 8,
            paddingHorizontal: 12,
            paddingBottom: 10,
          }}
        >
          <Text>{chapter.title}</Text>
          {hide ? (
            <>
              <AntDesign
                size={18}
                color="black"
                name="down"
                width={20}
                style={{ width: 20, opacity: 0.8 }}
              />
            </>
          ) : (
            <>
              <AntDesign
                size={18}
                color="black"
                name="right"
                width={20}
                style={{ width: 20, opacity: 0.8 }}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
      <View style={{ paddingLeft: 12, paddingTop: 5 }}>
        {hide ? (
          <>
            {chapter.lessons.map((e, index) => {
            console.log(e);
              if (
                e.status == PROCESS_STATUS.COMPLETED ||
                e.status == PROCESS_STATUS.IN_PROGRESS ||
                e.id == props.next_lesson ||
                e.id == props.current_lesson
              ) {
                return (
                  <TouchableOpacity
                    onPress={(data) => {
                      navigation.navigate("Lesson", {
                        course: props.course,
                        lesson: e,
                      });
                      dispatch(
                        getCourseProcess({
                          course_id: props.course.id,
                        })
                      );
                      props.closeModal();
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 5,
                        padding: 8,
                        paddingHorizontal: 12,
                        marginVertical: 5,
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text>{e.title}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
              return (
                <View
                  style={{
                    backgroundColor: "#F2F2F2",
                    borderRadius: 5,
                    padding: 8,
                    paddingHorizontal: 12,
                    marginVertical: 5,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text>{e.title}</Text>
                  <EvilIcons
                    size={18}
                    color="black"
                    name="lock"
                    width={20}
                    style={{ width: 20, opacity: 0.8 }}
                  />
                </View>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 324,
    width: 268,
    borderColor: "#024547",
    borderWidth: 2,
    borderBottomWidth: 10,
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#fff",
  },
  image: {
    width: 268,
    height: 158,
    position: "absolute",
    borderRadius: 5,
    top: -2,
    left: -2,
  },
  logo: {
    width: 66,
    height: 58,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 21,
    color: "#024547",
  },
  decription: {
    fontWeight: "400",
    fontSize: 12,
    opacity: 0.6,
    marginVertical: 5,
    textAlign: "justify",
  },
  text: {
    paddingLeft: 4,
  },
  buttonPlay: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderColor: "#024547",
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 25,
    top: "42%",
    right: 20,
    borderWidth: 1,
  },
});
export default ChapterDropDown;
