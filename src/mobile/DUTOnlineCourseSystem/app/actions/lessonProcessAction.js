export const updateLessonProcess = (payload) => ({
  type: "UPDATE_LESSON_PROCESS",
  payload,
});

export function updateLessonProcessSuccess(payload) {
  return {
    type: "UPDATE_LESSON_PROCESS_SUCCESS",
    payload,
  };
}

export function updateLessonProcessFailure(payload) {
  return {
    type: "UPDATE_LESSON_PROCESS_FAILURE",
    payload,
  };
}

export default {
  updateLessonProcess,
  updateLessonProcessSuccess,
  updateLessonProcessFailure,
};
