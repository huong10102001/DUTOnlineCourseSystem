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

export function updateAvatarUser(payload) {
  console.log(payload)
  return {
    type: "UPDATE_AVATAR_USER",
    payload,
  };
}

export function updateAvatarUserSuccess(payload) {
  return {
    type: "UPDATE_AVATAR_USER_SUCCESS",
    payload,
  };
}

export function updateAvatarUserFailure(payload) {
  return {
    type: "USER_UPDATE_AVATAR_FAILURE",
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
  updateAvatarUser,
  updateAvatarUserSuccess,
  updateAvatarUserFailure,
};
