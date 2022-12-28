import React, { Component, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import DiscussionInput from "../../../components/DiscussionInput";
import { Video, AVPlaybackStatus } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Discussion from "../../../components/Discussion";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch, useSelector } from "react-redux";
import { GetLesson } from "../../../actions/lessonAction";
import { getCourseProcess } from "../../../actions/courseProcessAction";
import { updateLessonProcess } from "../../../actions/lessonProcessAction";
import { PROCESS_STATUS } from "../../../const/processStatus";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ChapterDropDown from "../../../components/ChapterDropDown";
import { Modal } from "../../../components/Modal";
import { styles } from "./Style";
import Quiz from "../Quiz";
import { COLOR } from "../../../const/color";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLOR_STATUS } from "../../../const/color";
import { setQuizResult } from "../../../actions/quizAction";
import NexenPlayer, { NexenPlayerRef } from "react-native-best-player";

const VideoLession = ({ props }) => {
  const [paused, setPaused] = React.useState(true);
  const playerRef = React.useRef < NexenPlayerRef > null;
  const onPausePress = () => {
    if (paused) {
      playerRef.current?.play();
    } else {
      playerRef?.current?.pause();
    }
    setPaused((prevState) => !prevState);
  };
  const [nativeControl,setNativeControl] = useState(false)
  const dispatch = useDispatch();
  const [isModalListVisible, setIsListModalVisible] = useState(false);
  const [isModalQuizzesVisible, setIsModalQuizzesVisible] = useState(false);
  const handleListModal = () =>
    setIsListModalVisible(() => !isModalListVisible);
  const handleQuizzesModal = () =>
    setIsModalQuizzesVisible(() => !isModalQuizzesVisible);
  const [checkDispatchComplete, setCheckDispatchComplete] = useState(false);
  const navigation = useNavigation();
  const video = useRef(null);
  const [lesson, setLesson] = useState(props.lesson);
  const [chapters, setChapters] = useState(props.course.chapters);
  const [stateBtnDoQuizz, setStateBtnDoQuizz] = useState(false); // check lesson have quiz

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
  }, []);

  const isLoading = useSelector((state) => state.lesson.isLoading);
  const [previous_lesson, setPrevious_lession] = useState(
    props.previous_lesson
  );
  const [next_lession, setNext_lession] = useState(null);
  const [isCanNext, setIsCanNext] = useState(false);
  const discussions = useSelector((state) => state.lesson.discussions);
  const quizzes = useSelector((state) => state.lesson.quizzes);
  const haveQuizzes = quizzes.length >= 1;
  const quiz_result = useSelector((state) => state.lesson.quiz_result);
  const [checkFirstTime, setCheckFirstTime] = useState(false); // Check the first to use effect
  const [isPassedQuiz, setIsPassedQuiz] = useState(false);
  const [isModalQuizResult, setIsModalQuizResult] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const is_quiz_result_loading = useSelector(
    (state) => state.lesson.is_quiz_result_loading
  );

  const getLessonIdIfCanNext = () => {
    if (isCanNext) {
      if (props.next_lesson) {
        return props.next_lesson.id;
      }
    }
    return null;
  };

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
      if (lesson.status == PROCESS_STATUS.COMPLETED) {
      } else {
        if (quiz_result == undefined) {
        } else {
          if (quiz_result.length >= 1) {
            if (quiz_result[0].is_passed == true) {
              Alert.alert(
                "Congratulation",
                `you were passed the quiz with ${
                  quiz_result.length >= 1 ? quiz_result[0].score : "0"
                } points`
              );
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
      }
    } else {
      setCheckFirstTime(true);
    }
  }, [is_quiz_result_loading || quizzes]);
  
  useEffect(() => {
    if (lesson.status == PROCESS_STATUS.OPEN) {
      setPaused(true)
      dispatch(
        updateLessonProcess({
          status: PROCESS_STATUS.IN_PROGRESS,
          lesson_id: props.lesson.id,
          course_id: props.course.id,
        })
      );
    }
    if (lesson.status == PROCESS_STATUS.COMPLETED) {
      setNativeControl(true)
      setIsCanNext(true);
    } else {
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
      setIsCanNext(false);
      setNativeControl(true);
      setShowQuiz(true);
    }
  }, [props]);

  const renderDiscussions = () => {
    if (discussions) {
      return discussions.map((discussion, index) => {
        return <Discussion props={discussion} key={index.toString()} />;
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              size={18}
              color="white"
              name="chevron-left"
              width={20}
              style={{ width: 20, opacity: 0.8 }}
            />
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo
              size={18}
              color="white"
              name="chevron-left"
              width={20}
              style={{ width: 20, opacity: 0.8 }}
            />
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isCanNext ? (
              <>
                <Text style={{ color: "white", fontWeight: "700" }}>Next</Text>
                <Entypo
                  size={18}
                  color="white"
                  name="chevron-right"
                  width={20}
                  style={{ width: 20, opacity: 0.8 }}
                />
              </>
            ) : (
              <>
                <Text style={{ color: "white", fontWeight: "700" }}>Lock</Text>
                <Entypo
                  size={18}
                  color="white"
                  name="lock"
                  width={20}
                  style={{ width: 20, opacity: 0.8 }}
                />
              </>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", fontWeight: "700" }}>End</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView style={{ width: "100%" }}>
        <Video
          style={styles.video}
          source={{
            uri: props.lesson.attachment.file,
          }}
          useNativeControls={nativeControl}
          onTouchStart={() => {
            console.log(paused);
            setPaused(!paused);
          }}
          shouldPlay={paused}
          resizeMode={"contain"}
          
          onPlaybackStatusUpdate={(playbackStatus) => {
            if (
              playbackStatus.positionMillis / playbackStatus.durationMillis >
              0.85
            ) {
              console.log(showQuiz, haveQuizzes);
              if (
                (lesson.status == PROCESS_STATUS.OPEN ||
                  lesson.status == PROCESS_STATUS.IN_PROGRESS) &&
                !checkDispatchComplete
              ) {
                if (haveQuizzes >= 1) {
                  setCheckDispatchComplete(true);
                  setShowQuiz(true);
                  setNativeControl(true);
                  dispatch(
                    updateLessonProcess({
                      status: PROCESS_STATUS.TESTING,
                      lesson_id: props.lesson.id,
                      course_id: props.course.id,
                    })
                  );
                } else {
                  setCheckDispatchComplete(true);
                  setIsCanNext(true);
                  setNativeControl(true);
                  dispatch(
                    updateLessonProcess({
                      status: PROCESS_STATUS.COMPLETED,
                      lesson_id: props.lesson.id,
                      course_id: props.course.id,
                    })
                  );
                }
              }
            }
          }}
        />
        <View
          style={{
            width: "100%",
            padding: 16,
          }}
        >
          <Text style={styles.text}>{props.lesson.title}</Text>
          <View style={styles.buttonCover}>
            {renderButtonPre()}
            <TouchableOpacity style={styles.btnList} onPress={handleListModal}>
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
        {/* List chapter */}
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
                      <View key={index.toString()}>
                        <ChapterDropDown
                          props={{
                            chapter: e,
                            course: props.course,
                            next_lesson: getLessonIdIfCanNext(),
                            current_lesson: lesson.id,
                            closeModal: setIsListModalVisible,
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
                <View style={[styles.buttonCover, { width: "100%" }]}>
                  <TouchableOpacity
                    style={[styles.button, { width: "100%" }]}
                    onPress={handleListModal}
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
        {/* Discussion */}
        {isLoading ? (
          <></>
        ) : (
          <View style={{ padding: 25 }}>
            <View style={[styles.contentComponent]}>
              <Text
                style={[styles.text, { paddingLeft: 12, paddingBottom: 18 }]}
              >
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
        )}
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
              {haveQuizzes >= 1 ? (
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

export default VideoLession;
