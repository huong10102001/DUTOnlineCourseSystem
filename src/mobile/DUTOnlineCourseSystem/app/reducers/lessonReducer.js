const initState = {
  id: "",
  title: "",
  content: "",
  previous_lesson: {},
  chapter: {},
  attachment: {},
  slug: "",
  discussions: [],
  total_discussion: 0,
  error: ""
}

const lessonReducer = (state = initState, { type, payload }) => {
  console.log(`lessonReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_LESSON":
      return {
        ...state,
      };
    case "GET_LESSON_SUCCESS":
      const {
        id,
        title,
        content,
        previous_lesson,
        chapter,
        attachment,
        slug,
        discussions,
        total_discussion,
      } = payload;
      return {
        ...state,
        id: id,
        title: title,
        content: content,
        previous_lesson: previous_lesson,
        chapter: chapter,
        attachment: attachment,
        slug: slug,
        discussions: discussions,
        total_discussion: total_discussion,
      };
    case "GET_LESSON_FAILURE":
      return {
        ...initState,
        error: payload,
      };
    case "LOGOUT":
      return {
        initState,
      };
    case "CREATE_DISCUSSION":
      return {
        ...state,
      };
    case "CREATE_DISCUSSION_SUCCESS":
      return {
        ...state,
      };
    case "CREATE_DISCUSSION_FAILURE":
      return {
        ...state,
      };
    case "DELETE_DISCUSSION":
      return {
        ...state,
      };
    case "DELETE_DISCUSSION_SUCCESS":
      return {
        ...state,
      };
    case "DELETE_DISCUSSION_FAILURE":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default lessonReducer;
