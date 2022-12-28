export function createDiscussion(payload) {
  return {
    type: "CREATE_DISCUSSION",
    payload,
  };
}
export function createDiscussionSuccess(payload) {
  return {
    type: "CREATE_DISCUSSION_SUCCESS",
    payload,
  };
}

export function createDiscussionFailure(payload) {
  return {
    type: "CREATE_DISCUSSION_FAILURE",
    payload,
  };
}
export function DeleteDiscussion(payload) {
  return {
    type: "DELETE_DISCUSSION",
    payload,
  };
}
export function DeleteDiscussionSuccess(payload) {
  return {
    type: "DELETE_DISCUSSION_SUCCESS",
    payload,
  };
}

export function DeleteDiscussionFailure(payload) {
  return {
    type: "DELETE_DISCUSSION_FAILURE",
    payload,
  };
}
export default {
  createDiscussion,
  createDiscussionSuccess,
  createDiscussionFailure,
  DeleteDiscussion,
  DeleteDiscussionSuccess,
  DeleteDiscussionFailure,
};
