import React, { Component, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { StackActions } from "@react-navigation/native";
import DiscussionInput from "../components/DiscussionInput";
import { TextInput } from "react-native-paper";
import { Video, AVPlaybackStatus } from "expo-av";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import Discussion from "../components/Discussion";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { GetLesson } from "../actions/lessonAction";
import { getCourseProcess } from "../actions/courseProcessAction";
import { updateLessonProcess } from "../actions/lessonProcessAction";
import { PROCESS_STATUS } from "../const/processStatus";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ChapterDropDown from "../components/ChapterDropDown";
import { Modal } from "../components/Modal";
const VideoLession = ({ props }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  useEffect(() => {
    dispatch(
      GetLesson({
        course_id: props.course.id,
        lesson_id: props.lesson.id,
        chapter_id: props.lesson.chapter_id,
      })
    );
  }, []);
  let checkDispatchComplete = false;
  console.log(props);
  const navigation = useNavigation();
  const video = useRef(null);
  const [previous_lesson, setPrevious_lession] = useState(
    props.previous_lesson
  );
  const [next_lession, setNext_lession] = useState(null);
  const [lesson, setLesson] = useState(props.lesson);
  console.log(lesson);
  const [isCanNext, setIsCanNext] = useState(true);
  const discussions = useSelector((state) => state.lesson.discussions);
  const [chapters, setChapters] = useState(props.course.chapters);
  const getLessonIdIfCanNext = () => {
    if(isCanNext){
      return props.next_lesson.id
    }
    return null
  }
  useEffect(() => {
    if (lesson.status == PROCESS_STATUS.OPEN) {
      console.log("ALOOO");
      dispatch(
        updateLessonProcess({
          status: PROCESS_STATUS.IN_PROGRESS,
          lesson_id: props.lesson.id,
          course_id: props.course.id,
        })
      );
    }
    if (
      props.lesson.status == PROCESS_STATUS.OPEN ||
      props.lesson.status == PROCESS_STATUS.IN_PROGRESS
    ) {
      setIsCanNext(false);
    }
  }, [props]);
  if (props.lesson.status == "COMPLETE") {
  }

  console.log(lesson);
  const renderDiscussions = () => {
    if(discussions){
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
          <View style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700" }}>Prev</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderButtonNext = () => {
    if (props.next_lesson != null) {
      return (
        <TouchableOpacity
          onPress={() => {
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
          disabled={!isCanNext}
        >
          <View style={styles.button}>
            {isCanNext ? (
              <Text style={{ color: "white", fontWeight: "700" }}>Next</Text>
            ) : (
              <Text style={{ color: "white", fontWeight: "700" }}>Lock</Text>
            )}
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
            <Text style={{ color: "white" }}>End</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: props.lesson.attachment.file,
        }}
        useNativeControls
        resizeMode="cover"
        onPlaybackStatusUpdate={(playbackStatus) => {
          if (
            playbackStatus.positionMillis / playbackStatus.durationMillis >
            0.85
          ) {
            setIsCanNext(true);
            if (
              (lesson.status == PROCESS_STATUS.OPEN ||
                lesson.status == PROCESS_STATUS.IN_PROGRESS) &&
              !checkDispatchComplete
            ) {
              checkDispatchComplete = true;
              dispatch(
                updateLessonProcess({
                  status: PROCESS_STATUS.COMPLETED,
                  lesson_id: props.lesson.id,
                  course_id: props.course.id,
                })
              );
            }
          }
        }}
      />
      <ScrollView style={{ width: "100%" }}>
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
                </View>
                <ScrollView style={{ maxHeight: 500 }}>
                  {chapters.map((e, index) => {
                    return (
                      <View key={index}>
                        <ChapterDropDown
                          props={{
                            chapter: e,
                            course: props.course,
                            next_lesson: getLessonIdIfCanNext(),
                            current_lesson: lesson.id,
                            closeModal: setIsModalVisible
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
          <View style={[styles.contentComponent, styles.spaceBetweenComponent]}>
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
    </View>
  );
};
export default VideoLession;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 4,
  },
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
  avatar: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
    top: 0,
    resizeMode: "cover",
    height: 250,
    minHeight: 220,
  },
  buttons: {
    margin: 16,
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
  text: {
    marginBottom: 12,
    color: "#024547",
    fontWeight: "700",
    fontSize: 18,
  },
});
