export function getUser(payload) {
  return {
    type: "GET_USER",
    payload,
  };
}

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

export function updateProfileUser(payload) {
  return {
    type: "UPDATE_PROFILE_USER",
    payload,
  };
}
export function updateProfileUserSuccess(payload) {
  return {
    type: "UPDATE_PROFILE_USER_SUCCESS",
    payload,
  };
}
export function updateProfileUserFailure(payload) {
  return {
    type: "UPDATE_PROFILE_USER_FAILURE",
    payload,
  };
}
export function resetErrorUser() {
  return {
    type: "RESET_ERROR",
  };
}
export default {
  getUser,
  getUserSuccess,
  getUserFailure,
  updateProfileUser,
  updateProfileUserSuccess,
  updateProfileUserFailure,
  resetErrorUser,
};
