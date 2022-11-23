const courseState = {
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
  process_status:"",
  chapters: [
    {
      id: "",
      lessons: [
        {
          attachment: "",
          attachment_id: "",
          chapter_id: "",
          content: "",
          discussions: [],
          id: "",
          previous_lesson: undefined,
        },
      ],
    },
  ],
  certificate_frame: null,
  ratings: [],
  total_rating: 0,
  avg_rating: 0,
  status_rating: false,
  isLoading: false,
  error:""
};

const courseReducer = (state = courseState, { type, payload }) => {
  console.log(`coursesReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case "GET_COURSE_DETAIL":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_COURSE_DETAIL_SUCCESS":
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
        certificate_frame,
        ratings,
        total_rating,
        avg_rating,
        status_rating,
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
        certificate_frame: certificate_frame,
        ratings: ratings,
        total_rating: total_rating,
        avg_rating: avg_rating,
        status_rating: status_rating,
        process_status:process_status,
        error: "",
        isLoading: false,
      };
    case "GET_COURSE_DETAIL_FAILURE":
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case "CREATE_RATING":
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case "CREATE_RATING_SUCCESS":
      return {
        ...state,
        error: "",
        isLoading: false,
      };
    case "CREATE_RATING_FAILURE":
      return {
        ...state,
        error: "Create false",
        isLoading: false,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: "",
      };
    case "LOGOUT":
      return courseState;
    default:
      return state;
  }
};
export default courseReducer;
