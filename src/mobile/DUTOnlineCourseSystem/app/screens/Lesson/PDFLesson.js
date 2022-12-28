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
import { Modal } from "../../components/Modal";
import { TextInput } from "react-native-paper";
import { WebView } from "react-native-webview";
import PDF from "../../components/PDF";
import { useNavigation } from "@react-navigation/native";
import DiscussionInput from "../../components/DiscussionInput";
import { useSelector, useDispatch } from "react-redux";
import Discussion from "../../components/Discussion";
import { GetLesson } from "../../actions/lessonAction";
import { getCourseProcess } from "../../actions/courseProcessAction";
import { updateLessonProcess } from "../../actions/lessonProcessAction";
import { useState } from "react";
import { PROCESS_STATUS } from "../../const/processStatus";
import ListLesson from "../../components/ListLesson";
import ChapterDropDown from "../../components/ChapterDropDown";
import { defaultListStyleSpecs } from "react-native-render-html";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { setQuizResult } from "../../actions/quizAction";
import { COLOR } from "../../const/color";
import { COLOR_STATUS } from "../../const/color";
import Quiz from "./Quiz";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  const [isModalListVisible, setIsModalListVisible] = React.useState(false);
  const handleModal = () => setIsModalListVisible(() => !isModalListVisible);
  const handleQuizzesModal = () =>
    setIsModalQuizzesVisible(() => !isModalQuizzesVisible);
  const [isModalQuizzesVisible, setIsModalQuizzesVisible] = useState(false);
  const [stateBtnDoQuizz, setStateBtnDoQuizz] = useState(false); // check lesson have quiz
  const isLoading = useSelector((state) => state.lesson.isLoading);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isModalQuizResult, setIsModalQuizResult] = useState(false);
  const [checkFirstTime, setCheckFirstTime] = useState(false); // Check the first to use effect
  const [quizzes, setQuizzes] = useState(props.lesson.quizzes);
  const haveQuizzes = quizzes.length >= 1;
  const [isPassedQuiz, setIsPassedQuiz] = useState(false);
  const is_quiz_result_loading = useSelector(
    (state) => state.lesson.is_quiz_result_loading
  );
  const quiz_result = useSelector((state) => state.lesson.quiz_result);
  const [isCanNext, setIsCanNext] = useState(false);

  useEffect(() => {
    dispatch(
      GetLesson({
        course_id: props.course.id,
        lesson_id: props.lesson.id,
        chapter_id: props.lesson.chapter_id,
      })
    );
    dispatch(
      setQuizResult({
        quiz_result: props.lesson.quiz_result,
      })
    );
    if (lesson.status == PROCESS_STATUS.OPEN) {
      if (haveQuizzes) {
        setIsCanNext(false)
        dispatch(
          updateLessonProcess({
            status: PROCESS_STATUS.TESTING,
            lesson_id: props.lesson.id,
            course_id: props.course.id,
          })
        );
      } else {
        dispatch(
          updateLessonProcess({
            status: PROCESS_STATUS.COMPLETED,
            lesson_id: props.lesson.id,
            course_id: props.course.id,
          })
        );
        setIsCanNext(true);
      }
    }
    if (haveQuizzes) {
      setShowQuiz(true);
    }
    if (props.lesson.quiz_result) {
      if (props.lesson.quiz_result.length >= 1) {
        if (props.lesson.quiz_result[0].is_passed == true) {
          setIsPassedQuiz(true);
          setShowQuiz(true);
        }
      }
    }
    if (lesson.status == PROCESS_STATUS.TESTING) {
      setShowQuiz(true);
    }
    console.log(lesson.status);
    if (lesson.status == PROCESS_STATUS.COMPLETED) {
      if (quizzes.length) {
        setShowQuiz(true);
      }
    }
  }, [props]);

  useEffect(() => {
    if (quiz_result) {
      if (quiz_result.length >= 1) {
        if (quiz_result[0].is_passed == true) {
          setIsPassedQuiz(true);
          setShowQuiz(true);
        }
      }
    }
    if (checkFirstTime) {
      if (quiz_result == undefined) {
      } else {
        if (quiz_result.length >= 1) {
          if (quiz_result[0].is_passed == true) {
            Toast.show({
              type: "success",
              position: "top",
              text1: "Quiz",
              text2: `you were passed the quiz with ${
                quiz_result.length >= 1 ? quiz_result[0].score : "0"
              } points`,
              visibilityTime: 5000,
              autoHide: true,
              onShow: () => {},
              onHide: () => {},
            });
            dispatch(
              updateLessonProcess({
                status: PROCESS_STATUS.COMPLETED,
                lesson_id: props.lesson.id,
                course_id: props.course.id,
              })
            );
            setIsCanNext(true);
          } else {
          }
        }
      }
    } else {
      setCheckFirstTime(true);
    }
  }, [is_quiz_result_loading || quizzes]);
  const renderDiscussions = () => {
    if (discussions) {
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
            style={[{ width: "100%", justifyContent: "center" }]}
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", fontWeight: "700" }}>End</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
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
          <Modal isVisible={isModalQuizzesVisible}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={[styles.contentComponent, { minHeight: 500 }]}>
                <Quiz
                  props={{
                    quizzes: quizzes[0],
                    closeModal: setIsModalQuizzesVisible,
                    title: lesson.title,
                    quiz_result: lesson.quiz_result,
                  }}
                ></Quiz>
              </View>
            </View>
          </Modal>
        </View>
        {/* <View style={{ flex: 1 }}>
          {chapters.map((e, index) => {
            <View style={{ height: 20 }}>
              <Text style={{ height: 50 }}>TUAN DEP TRAI</Text>
            </View>;
          })}
        </View> */}
        <View>
          <Modal isVisible={isModalListVisible}>
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
                            next_lesson: next_lesson ? next_lesson.id : null,
                            closeModal: setIsModalListVisible,
                            current_lesson: lesson.id,
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
        <Toast
          ref={(ref) => {
            Toast.setRef(ref);
          }}
        />
      </ScrollView>
      {isLoading ? (
        <></>
      ) : (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            alignSelf: "flex-end",
          }}
        >
          {showQuiz ? (
            <>
              {haveQuizzes ? (
                !isPassedQuiz ? (
                  <View
                    backgroundColor="#1572A1"
                    flexDirection="row"
                    alignItems="center"
                    style={{ padding: 12, borderRadius: 8 }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        setIsModalQuizzesVisible(!isModalQuizzesVisible)
                      }
                    >
                      <FontAwesome
                        size={18}
                        color="white"
                        name="question"
                        width={20}
                        style={{ width: 20, opacity: 0.8 }}
                      />
                      <Text style={{ fontWeight: "500", color: "white" }}>
                        Quiz
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    backgroundColor="#1572A1"
                    style={{ padding: 12, borderRadius: 8 }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => setIsModalQuizResult(!isModalQuizResult)}
                    >
                      <FontAwesome
                        size={18}
                        color="white"
                        name="question"
                        width={20}
                        style={{ width: 20 }}
                      />
                      <Text style={{ fontWeight: "500", color: "white" }}>
                        Quiz result
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      )}
      <View>
        <Modal isVisible={isModalQuizResult}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={[styles.contentComponent]}>
              <View
                style={{
                  padding: 16,
                  backgroundColor: COLOR_STATUS.SUCCESS.COLOR,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: COLOR_STATUS.SUCCESS.TEXT,
                  }}
                >
                  Congrats! You have passed this quiz!
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      backgroundColor: COLOR_STATUS.SUCCESS.TEXT,
                      padding: 6,
                      borderRadius: 4,
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: COLOR_STATUS.SUCCESS.COLOR,
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      Score achieved:{" "}
                      <Text style={{ fontWeight: "900" }}>
                        {quiz_result.length >= 1 ? quiz_result[0].score : "0"}{" "}
                        points
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 40,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  borderColor: "#D0C9C0",
                  borderWidth: 1,
                  borderRadius: 8,
                  marginTop: 8,
                }}
                onPress={() => {
                  setIsModalQuizResult(!isModalQuizResult);
                  console.log(quiz_result);
                }}
              >
                <Text style={{ fontWeight: "500" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
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
  text: {
    marginBottom: 12,
    color: "#024547",
    fontWeight: "700",
    fontSize: 18,
  },
  modal: {
    height: "80%",
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 100,
    bottom: 0,
  },
});
