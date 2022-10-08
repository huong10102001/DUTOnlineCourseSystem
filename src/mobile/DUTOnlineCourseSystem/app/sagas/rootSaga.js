import { fork, all, takeLatest, takeEvery,put ,call,take, putResolve} from 'redux-saga/effects';
import axios from 'axios';
import { loginFailed, loginSuccess } from '../actions/authAction';
import { registerAction,registerSuccessAction,registerFailureAction } from '../actions/registerAction';
import register_api from './registerSaga';
import fetch_login from './loginSaga';
import fetch_courses from './coursesSaga'
import get_user from './userSaga';

const sagas = function*() {
    yield takeEvery("USER_LOGIN_REQUEST",fetch_login);
    yield takeEvery("REGISTER_HANDLE",register_api);
    yield takeEvery("GET_ALL_COURSES",fetch_courses);
    yield takeEvery("GET_USER",get_user);
};
export default sagas;
