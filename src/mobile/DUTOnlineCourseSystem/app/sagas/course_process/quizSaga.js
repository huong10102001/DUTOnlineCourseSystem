const getToken = (state) => state.auth.access_token;
function* submit_quiz(action) {
  console.log(
    `update_lesson_process type: ${action.type} with payload: ${action.payload.quiz}`
  );
  const dataToPost = action.payload.quiz
  console.log(action.payload.quiz)
  const token = yield select(getToken);
  try {
    let response = yield axios.post(
      `${BASE_URL}/api/v1/quizzes/${action.payload.quiz.id}/results/`,dataToPost,
      // {
      //   id:dataToPost.id,
      //   questions:dataToPost.questions,
      //   description:dataToPost.description,
      //   lesson_id:dataToPost.lesson_id,
      //   threshold:dataToPost.threshold,
      //   title:dataToPost.title,
      //   updated_at:dataToPost.updated_at
      // },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response);
    yield put(submitQuizSuccess({ quiz_result: response.data }));
  } catch (error) {
    console.log(error);
  }
  return;
}
export default submit_quiz;
import {
  fork,
  all,
  takeLatest,
  takeEvery,
  put,
  call,
  take,
  putResolve,
  select,
} from "redux-saga/effects";
import axios from "axios";
import BASE_URL from "../../request/url";
import {
  submitQuiz,
  submitQuizFailure,
  submitQuizSuccess,
} from "../../actions/quizAction";
