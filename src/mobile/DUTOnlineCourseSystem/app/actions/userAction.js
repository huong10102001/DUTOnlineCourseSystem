export function getUser(payload)  {
  return {
    type: "GET_USER",
  payload,
  }
};

export function getUserSuccess(payload) {
  return {
    type: "GET_USER_SUCCESS",
    payload,
  };
}

export function getUserFailure(payload) {
  return {
    type: "GET_USER_FAILURE",
    payload,
  };
}

export default {
  getUser,
  getUserSuccess,
  getUserFailure,
};
