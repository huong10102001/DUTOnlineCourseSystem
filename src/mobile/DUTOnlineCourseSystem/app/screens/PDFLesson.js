import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Button,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Modal } from "../components/Modal";
import { TextInput } from "react-native-paper";
import { WebView } from "react-native-webview";
import PDF from "./PDF";
import { useNavigation } from "@react-navigation/native";
import DiscussionInput from "../components/DiscussionInput";
import { useSelector, useDispatch } from "react-redux";
import Discussion from "../components/Discussion";
import { GetLesson } from "../actions/lessonAction";
import { getCourseProcess } from "../actions/courseProcessAction";
import { updateLessonProcess } from "../actions/lessonProcessAction";
import { useState } from "react";
import { PROCESS_STATUS } from "../const/processStatus";
import ListLesson from "../components/ListLesson";
import ChapterDropDown from "../components/ChapterDropDown";
import { defaultListStyleSpecs } from "react-native-render-html";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const PDFLesson = ({ props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [previous_lesson, setPrevious_lesson] = React.useState(
    props.previous_lesson
  );
  const [chapters, setChapters] = useState(props.course.chapters);
  const [lesson, setLesson] = React.useState(props.lesson);
  const [next_lesson, setNext_lesson] = React.useState(props.next_lesson);
  const discussions = useSelector((state) => state.lesson.discussions);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  useEffect(() => {
    dispatch(
      GetLesson({
        course_id: props.course.id,
        lesson_id: props.lesson.id,
        chapter_id: props.lesson.chapter_id,
      })
    );
    if (lesson.status == "OPEN") {
      dispatch(
        updateLessonProcess({
          status: PROCESS_STATUS.COMPLETED,
          lesson_id: props.lesson.id,
          course_id: props.course.id,
        })
      );
    }
  }, [props]);
  const renderDiscussions = () => {
    if (discussions > 0) {
      return discussions.map((discussion) => {
        return <Discussion props={discussion} />;
      });
    }
  };
  const renderButtonPre = () => {
    if (props.previous_lesson) {
      return (
        <TouchableOpacity
          style={[styles.button]}
          onPress={(data) => {
            dispatch(
              getCourseProcess({
                course_id: props.course.id,
              })
            );
            navigation.navigate("Lesson", {
              course: props.course,
              lesson: props.previous_lesson,
            });
          }}
        >
          <View style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700" }}>Prev</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, { opacity: 0.5 }]}
          disabled={true}
        >
          <View
            style={[styles.button, { width: "100%", justifyContent: "center" }]}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              Prev
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderButtonNext = () => {
    console.log(props.next_lesson);
    if (props.next_lesson != null) {
      return (
        <TouchableOpacity
          onPress={(data) => {
            if (true) {
              dispatch(
                getCourseProcess({
                  course_id: props.course.id,
                })
              );
              navigation.navigate("Lesson", {
                course: props.course,
                lesson: props.next_lesson,
              });
            }
          }}
          style={styles.button}
        >
          <View style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700" }}>Next</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={[styles.button, { opacity: 0.5 }]}
          disabled={true}
        >
          <View style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700" }}>End</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <ScrollView nestedScrollEnabled={true}>
      <PDF style={{ height: "100%" }} props={props.lesson} />
      <View
        style={{
          width: "100%",
          padding: 16,
        }}
      >
        <Text style={styles.text}>{props.lesson.title}</Text>
        <View style={styles.buttonCover}>
          {renderButtonPre()}
          <TouchableOpacity style={styles.btnList} onPress={handleModal}>
            <FontAwesome5
              size={18}
              color="black"
              name="list-ul"
              width={20}
              style={{ width: 20, opacity: 0.8 }}
            />
          </TouchableOpacity>
          {renderButtonNext()}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {chapters.map((e, index) => {
          <View style={{ height: 20 }}>
            <Text style={{ height: 50 }}>TUAN DEP TRAI</Text>
          </View>;
        })}
      </View>
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1, justifyContent: "center", maxHeight: 500 }}>
            <View style={[styles.contentComponent, { minHeight: 500 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.text}>List chapter!!!</Text>
                {/* <TouchableOpacity
                  style={{ paddingHorizontal: 4 }}
                  onPress={handleModal}
                >
                  <Text style={styles.text}>X</Text>
                </TouchableOpacity> */}
              </View>
              <ScrollView style={{ maxHeight: 500 }}>
                {chapters.map((e, index) => {
                  return (
                    <View key={index}>
                      <ChapterDropDown
                        props={{
                          chapter: e,
                          course: props.course,
                          next_lesson: next_lesson ? next_lesson.id : null,
                          closeModal: setIsModalVisible,
                          current_lesson: lesson.id
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
              <View style={[styles.buttonCover, { width: "100%" }]}>
                <TouchableOpacity
                  style={[styles.button, { width: "100%" }]}
                  onPress={handleModal}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={{ padding: 25 }}>
        <View style={[styles.contentComponent]}>
          <Text style={[styles.text, { paddingLeft: 12, paddingBottom: 18 }]}>
            Q&A
          </Text>
          <DiscussionInput
            props={{
              course_id: props.course.id,
              lesson_id: props.lesson.id,
              chapter_id: props.lesson.chapter_id,
              parent_discussion_id: "",
            }}
          ></DiscussionInput>
          {renderDiscussions()}
        </View>
      </View>
    </ScrollView>
  );
};
export default PDFLesson;
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#024547",
    borderRadius: 8,
    width: "35%",
    color: "white",
    fontWeight: "600",
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnList: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "20%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonCover: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  contentComponent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "justify",
    width: "100%",
  },
  spaceBetweenComponent: {
    marginTop: 25,
  },
  avatar: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 12,
    color: "#024547",
    fontWeight: "700",
    fontSize: 18,
  },
  modal: {
    height:"80%",
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
    bottom:0
  },
});
