const initState = {
  id: "",
  title: "",
  content: "",
  previous_lesson: {},
  chapter_id: {},
  attachment: {},
  slug: "",
  discussions: [],
  total_discussion: 0,
  error: "",
  quizzes: [],
  quiz_result: [],
  is_quiz_result_loading:false,
  isLoading:false,
  chapter:{}
};

const lessonReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "GET_LESSON":
      return {
        ...state,
        isLoading:true
      };
    case "GET_LESSON_SUCCESS":
      const {
        id,
        title,
        content,
        previous_lesson,
        chapter_id,
        attachment,
        slug,
        discussions,
        total_discussion,
        quizzes,
        chapter
      } = payload;
      return {
        ...state,
        id: id,
        title: title,
        content: content,
        previous_lesson: previous_lesson,
        chapter_id: chapter_id,
        attachment: attachment,
        slug: slug,
        discussions: discussions,
        total_discussion: total_discussion,
        quizzes: quizzes,
        chapter:chapter,
        isLoading: false,
      };
    case "GET_LESSON_FAILURE":
      return {
        ...initState,
        error: payload,
        isLoading: false,
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
    case "SET_QUIZ_RESULT":
      return {
        ...state,
        quiz_result: payload.quiz_result,
      };
    case "SUBMIT_QUIZ":
      return {
        ...state,
        is_quiz_result_loading:true
      };
    case "SUBMIT_QUIZ_SUCCESS":
    return {
      ...state,
      quiz_result: [payload.quiz_result],
      is_quiz_result_loading: false,
    };
    case "SUBMIT_QUIZ_FAILURE":
      return {
        ...state,
        is_quiz_result_loading: false,
      };
    default:
      return state;
  }
};

export default lessonReducer;
