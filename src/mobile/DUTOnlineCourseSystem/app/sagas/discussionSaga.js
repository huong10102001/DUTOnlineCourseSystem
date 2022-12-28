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
import BASE_URL from "../request/url";
import { GetLesson, GetLessonFailure, GetLessonSuccess } from "../actions/lessonAction";
import { CreateDiscussionFailure, CreateDiscussionSuccess, DeleteDiscussionsSuccess, DeleteDiscussionFailure } from "../actions/discussionAction";
const getToken = (state) => state.auth.access_token;
function* create_discussion_api(action) {
    console.log(
        `create_discussion type: ${action.type} with payload: ${action.payload.course_id}`
    );
    const token = yield select(getToken);
    try {
        let response_parent;
        try {
        let response = yield axios.post(
            `${BASE_URL}/api/v1/courses/${action.payload.course_id}/chapters/${action.payload.chapter_id}/lessons/${action.payload.lesson_id}/discussions/`,
            {
            content: action.payload.content,
            parent_discussion_id: action.payload.parent_discussion_id,
            },
            {
            headers: {
                Authorization: "Bearer " + token,
            },
            }
        );
        console.log(response);
        response_parent = response;
        yield put(CreateDiscussionSuccess(response.data))
        } catch (error) {
            yield put({
                type:"CREATE_DISCUSSION_FAILURE",
                payload:{
                    error:"Error"
                }
            });
        }
        yield put(GetLesson({
            course_id:action.payload.course_id,
            lesson_id:action.payload.lesson_id,
            chapter_id:action.payload.chapter_id
        }));
    } catch (error) {
        yield put(GetLessonFailure("Error"));
        console.log(error);
    }
    return;
}

function* delete_discussion_api(action){
    console.log(
    `delete_discussion_api type: ${action.type} with payload: ${action.payload}`
    );
    const token = yield select(getToken);
    let response_parent;
    try {
        let response = yield axios.delete(
        `${BASE_URL}/api/v1/courses/${action.payload.course_id}/chapters/${action.payload.chapter_id}/lessons/${action.payload.lesson_id}/discussions/${action.payload.discussion_id}/`,
        {
            headers: {
            Authorization: "Bearer " + token,
            },
        }
        );
        console.log(response);
        response_parent = response;
        yield put(DeleteDiscussionSuccess())
    } catch (error) {
        yield put(DeleteDiscussionFailure("Error"));
    }
    yield put(GetLesson({
        course_id:action.payload.course_id,
        lesson_id:action.payload.lesson_id,
        chapter_id:action.payload.chapter_id
    }));
    return;
}

function* discussion_api(action) {
    yield takeLatest("CREATE_DISCUSSION", create_discussion_api);
    yield takeLatest("DELETE_DISCUSSION", delete_discussion_api);
}
export default discussion_api;
