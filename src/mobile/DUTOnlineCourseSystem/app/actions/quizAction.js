export const submitQuiz = (payload) => ({
  type: "SUBMIT_QUIZ",
  payload,
});

export function submitQuizSuccess(payload) {
  return {
    type: "SUBMIT_QUIZ_SUCCESS",
    payload,
  };
}

export function submitQuizFailure(payload) {
  return {
    type: "SUBMIT_QUIZ_FAILURE",
    payload,
  };
}
export function setQuizResult(payload){
  return {
    type: "SET_QUIZ_RESULT",
    payload,
  };
}
export default {
  submitQuiz,
  submitQuizSuccess,
  submitQuizFailure,
  setQuizResult,
};