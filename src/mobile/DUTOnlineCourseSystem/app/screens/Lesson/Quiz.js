import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { getCourseProcess } from "../../actions/courseProcessAction";
import QuizOneChoice from "../../components/QuizOneChoice";
import QuizMultiChoice from "../../components/QuizMultiChoice";
import { COLOR, COLOR_STATUS } from "../../const/color";
import { QUESSTION_TYPE } from "../../const/questionType";
import { submitQuiz } from "../../actions/quizAction";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import { Modal } from "../../components/Modal";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";


const Quiz = ({ props }) => {
  const dispatch = useDispatch();
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [quizzesToPost, setQuizzesToPost] = useState(
    JSON.parse(JSON.stringify(props.quizzes))
  );
  const [answers, setAnswers] = useState({ list: [] });
  const [countQuestionFilled, setCount] = useState({});
  const [countAnsweredUserQuestion, setCountAnsweredUserQuestion] = useState(0);
  const quiz_result = useSelector((state) => state.lesson.quiz_result);
  const is_quiz_result_loading = useSelector(
    (state) => state.lesson.is_quiz_result_loading
  );
  const [checkIfFirstRender,setCheckIfFirstRender] = useState(false)
  useEffect(() => {
    if (quiz_result == undefined || !checkIfFirstRender) {
      setCheckIfFirstRender(true)
    } else {
      if(is_quiz_result_loading==false){
        if (quiz_result.length >= 1) {
          if (quiz_result[0].is_passed == false) {
            setVisibleDialog(true);
          } else {
            props.closeModal(false);
          }
        }
      }
    }
  }, [is_quiz_result_loading]);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < answers.list.length; i++) {
      count += answers.list[i].completed;
    }
    setCountAnsweredUserQuestion(count);
  }, [answers]);
  const onChange = (question, answerList) => {
    console.log(question);
    console.log((answerList))
    if (answers.list.length == 0) {
      setAnswers({
        list: [
          ...answers.list,
          {
            id: question.id,
            completed: answerList.length ? 1 : 0,
          },
        ],
      });
    } else {
      let check = "";
      for (let i = 0; i < answers.list.length; i++) {
        if (answers.list[i].id == question.id) {
          check = i + 1;
          break
        }
      }
      let newAnswers = {};
      if (check) {
        newAnswers = {
          ...answers,
          ...(answers.list[check - 1].completed = answerList.length ? 1 : 0),
        };
        setAnswers(newAnswers);
      } else {
        newAnswers = {
          ...answers,
          list: [
            ...answers.list,
            {
              id: question.id,
              completed: answerList.length ? 1 : 0,
            },
          ],
        };
        setAnswers(newAnswers);
      }
    }
    let newQuizzesToPost = quizzesToPost;
    console.log(newQuizzesToPost)
    for (let i = 0; i < newQuizzesToPost.questions.length; i++) {
      if (newQuizzesToPost.questions[i].id == question.id) {
        newQuizzesToPost.questions[i] = question;
      }
    }
    console.log(newQuizzesToPost);
    setQuizzesToPost(newQuizzesToPost);
  };

  const renderQuizzes = () => {
    return props.quizzes.questions.map((e, index) => {
      if (e.question_type == QUESSTION_TYPE.SINGLE_CHOICE) {
        return (
          <View style={styles.spaceBetweenComponent} key={e}>
            <QuizOneChoice
              props={{ question: e, index: index, onChange: onChange }}
            ></QuizOneChoice>
          </View>
        );
      } else {
        return (
          <View style={styles.spaceBetweenComponent} key={e}>
            <QuizMultiChoice
              props={{ question: e, index: index, onChange: onChange }}
            ></QuizMultiChoice>
          </View>
        );
      }
    });
  };

  return (
    <ScrollView style={{}}>
      <View
        style={{
          padding: 16,
          backgroundColor: COLOR.THIRD,
          borderRadius: 8,
        }}
      >
        <Text style={{ fontWeight: "700", color: "#3778ae" }}>
          {props.title}
        </Text>
        <Text style={{ color: "#3778ae", textAlign: "justify" }}>
          {props.quizzes.description}
        </Text>
        <Text style={{ color: "#3778ae", fontSize: 12 }}>
          Need minimum {props.quizzes.threshold} points to pass this quiz
        </Text>
      </View>
      {renderQuizzes()}
      {countAnsweredUserQuestion != props.quizzes.questions.length ? (
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonCover,
            {
              backgroundColor: "#DD5353",
              width: "100%",
            },
          ]}
        >
          <Text style={{ fontWeight: "500", color: "white"}}>
            {countAnsweredUserQuestion}/{props.quizzes.questions.length}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.buttonCover]}
          onPress={() => {
            console.log(quizzesToPost);
            dispatch(submitQuiz({ quiz: quizzesToPost }));
          }}
        >
          <Button loading={false} style={{color:COLOR.WHITE, fontWeight:'600'}} textColor={COLOR.WHITE}>Submit</Button>
          {/* <Text style={{ fontWeight: "500", color: "white" }}>Submit</Text> */}
        </TouchableOpacity>
      )}
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
          props.closeModal(false);
        }}
      >
        <Text style={{ fontWeight: "500" }}>Close</Text>
      </TouchableOpacity>
      {/* Dialog */}

      <View >
        <Modal isVisible={visibleDialog}>
          <View>
            <View style={{ justifyContent: "center" }}>
              <View style={[styles.contentComponent]}>
                <Text
                  style={{ color: COLOR_STATUS.ERROR.TEXT, fontWeight: "800" }}
                >
                  Failed
                </Text>
                <Text
                  style={{ color: COLOR_STATUS.ERROR.TEXT, fontWeight: "600" }}
                >
                  To many error, do again!!!
                </Text>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Button
                    style={{
                      backgroundColor: COLOR_STATUS.ERROR.COLOR,
                      color: COLOR.WHITE,
                      fontWeight: "600",
                    }}
                    onPress={() => {
                      setVisibleDialog(false);
                    }}
                  >
                    <Text style={{color:COLOR.WHITE}}>Close</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
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
  spaceBetweenComponent: {
    marginTop: 25,
    width: "100%",
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 8,
    width: "35%",
    color: "white",
    fontWeight: "600",
    height: 40,
    justifyContent: "center",
    marginTop: 16,
  },
  buttonCover: {
    width: "100%",
    alignItems: "center",
  },
});
export default Quiz;
