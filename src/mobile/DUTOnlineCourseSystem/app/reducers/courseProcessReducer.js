const courseProcessState = {
  id: "",
  title: "",
  summary: "",
  description: "",
  background: "",
  slug: "",
  status: "",
  user: {},
  topics: [],
  chapter_ids: [],
  chapters: [],
  process_status: "",
  error:"",
  isLoading:false
};

const courseProcessReducer = (
  state = courseProcessState,
  { type, payload }
) => {
  switch (type) {
    case "GET_COURSE_PROCESS":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_COURSE_PROCESS_SUCCESS":
      const {
        id,
        title,
        summary,
        description,
        background,
        slug,
        status,
        user,
        topics,
        chapter_ids,
        chapters,
        process_status,
      } = payload;
      return {
        ...state,
        id: id,
        title: title,
        summary: summary,
        description: description,
        background: background,
        slug: slug,
        status: status,
        user: user,
        topics: topics,
        chapter_ids: chapter_ids,
        chapters: chapters,
        process_status: process_status,
        isLoading: false,
      };
    case "GET_COURSE_PROCESS_FAILURE":
      return {
        ...courseProcessState,
        error: payload.error,
        isLoading: false,
      };
    case "LOGOUT":
      return courseProcessState;
    default:
      return state;
  }
};
export default courseProcessReducer;
