export function updateKeyNoti(payload) {
  return {
    type: "UPDATE_KEY",
    payload,
  };
}
export function updateNotiNumber(payload) {
  return {
    type: "UPDATE_NOTI_NUMBER",
    payload,
  };
}
export function getNotification(payload) {
  return {
    type: "GET_NOTI",
  };
}
export function getNotificationSuccess(payload) {
  return {
    type: "GET_NOTIFICATION_SUCCESS",
    payload
  };
}
export function notiChangeState() {
  return {
    type: "NOTI_CHANGE_STATE",
  };
}
export default {
  updateKeyNoti,
  updateNotiNumber,
  getNotification,
  getNotificationSuccess,
};
