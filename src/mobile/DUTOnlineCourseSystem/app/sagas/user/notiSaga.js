import { put, select } from "redux-saga/effects";
import axios from "axios";
import BASE_URL from "../../request/url";
import { getNotificationSuccess } from "../../actions/notiAction";
const getToken = (state) => state.auth.access_token;
function* noti_saga(action) {
  const token = yield select(getToken);
  try {
    const response = yield axios.get(
      `${BASE_URL}/api/v1/notification/list-notification/?page=1`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    yield put(getNotificationSuccess(response.data.results.list_notification));
    console.log("@@@@@", response.data.results);
  } catch (error) {
    console.log(error);
  }
  return;
}

function* noti_change_state_saga(action) {
  const token = yield select(getToken);
  try {
    const response = yield axios.put(
      `${BASE_URL}/api/v1/notification/change-state/?page=1`,{},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("@@@@@", response);
  } catch (error) {
    console.log(error);
  }
  return;
}

export { noti_change_state_saga, noti_saga };
