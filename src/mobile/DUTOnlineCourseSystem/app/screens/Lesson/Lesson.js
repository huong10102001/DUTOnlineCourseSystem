import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authAction";
import VideoLesson from "./Video/VideoLesson";
import PDFLesson from "./PDFLesson";
import { GetLesson } from "../../actions/lessonAction";
import { getCourseProcess } from "../../actions/courseProcessAction";
import { PROCESS_STATUS } from "../../const/processStatus";

const Lesson = ({ route, navigation }) => {
  const dispatch = useDispatch();
  console.log(route)
  useEffect(()=>{
    dispatch(
      getCourseProcess({
        course_id: route.params.course_id,
      })
    );
  },[])
  const course = useSelector((state) => state.courseProcess);
  const isLoading = useSelector((state) => state.courseProcess.isLoading);
  let lesson = "";
  let previous_lesson = "";
  let next_lesson = "";
  console.log("route", route);
  const findLessonByID = (lesson_id) =>{
    for (let i = 0; i < course.chapters.length; i++) {
      for (let j = 0; j < course.chapters[i].lessons.length; j++) {
        if (course.chapters[i].lessons[j].id == lesson_id) {
          return course.chapters[i].lessons[j];
        }
      }
    }
  }
  const findNext = (chapters, lesson) => {
    let chap;
    let less;
    for (let i = 0; i < chapters.length; i++) {
      for (let j = 0; j < chapters[i].lessons.length; j++) {
        if (chapters[i].lessons[j].id == lesson.id) {
          chap = i;
          less = j;
        }
      }
    }
    for (let i = chap; i < chapters.length; i++) {
      if (i == chap && less < chapters[i].lessons.length) {
        for (let j = less + 1; j < chapters[i].lessons.length; j++) {
          if (chapters[i].lessons[j] != undefined) {
            return chapters[i].lessons[j];
          }
        }
      } else {
        for (let j = 0; j < chapters[i].lessons.length; j++) {
          if (chapters[i].lessons[j] != undefined) {
            return chapters[i].lessons[j];
          }
        }
      }
    }
    return null;
  };
  const findPrevious = (chapters, lesson) => {
    if(!lesson){
      console.log(lesson)
      return null
    }
    if (!lesson.previous_lesson) {
      for (let i = 0; i < chapters[0].lessons.length; i++) {
        if (lesson.id == chapters[0].lessons[i]) {
          return null;
        }
      }
      for (let i = 1; i < chapters.length; i++) {
        for (let j = 0; j < chapters[i].lessons.length; j++) {
          if (chapters[i].lessons[j].id == lesson.id) {
            return chapters[i - 1].lessons[chapters[i - 1].lessons.length - 1];
          }
        }
      }
    } else {
      for (let i = 0; i < chapters.length; i++) {
        for (let j = 0; j < chapters[i].lessons.length; j++) {
          if (chapters[i].lessons[j].id == lesson.previous_lesson.id) {
            return chapters[i].lessons[j];
          }
        }
      }
    }
    return null;
  };
  const findIsOpenOrInProgress = () =>{
    for (let i = 0; i < course.chapters.length; i++) {
      for (let j = 0; j < course.chapters[i].lessons.length; j++) {
        console.log(course.chapters[i].lessons[j].id);
        if (
          course.chapters[i].lessons[j].status == PROCESS_STATUS.OPEN ||
          course.chapters[i].lessons[j].status == PROCESS_STATUS.IN_PROGRESS ||
          course.chapters[i].lessons[j].status == PROCESS_STATUS.TESTING
        ) {
          return course.chapters[i].lessons[j];
        }
      }
    }
    return course.chapters[0].lessons[0];   
  }
  const render = () => {
    console.log(course);
    if (!route.params.lesson) {
      lesson = findIsOpenOrInProgress();
      // lesson = course.chapters[0].lessons[0];
      previous_lesson = findPrevious(course.chapters, lesson);
      next_lesson = findNext(course.chapters, lesson);
    } else {
      lesson = findLessonByID(route.params.lesson.id);
      console.log(lesson)
      previous_lesson = findPrevious(course.chapters, lesson);
      next_lesson = findNext(course.chapters, lesson);
    }
  };

  return (
    <>
      {isLoading ? (
        <TouchableOpacity
          style={ { opacity: 0.5 }}
        >
          <View>
            {/* <Text style={{ color: "white", fontWeight: "700" }}>Prev</Text> */}
          </View>
        </TouchableOpacity>
      ) : (
        <>
          {render()}
          {lesson.attachment.file_type == "Document" ? (
            <PDFLesson
              props={{
                course: course,
                previous_lesson: previous_lesson,
                next_lesson: next_lesson,
                lesson: lesson,
              }}
            />
          ) : (
            <VideoLesson
              props={{
                course: course,
                previous_lesson: previous_lesson,
                next_lesson: next_lesson,
                lesson: lesson,
              }}
            />
          )}
        </>
      )}
    </>
  );
};
export default Lesson;
