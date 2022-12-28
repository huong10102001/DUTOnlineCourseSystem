export function enRoll(payload) {
  return {
    type: "ENROLL_COURSE",
    payload,
  };
}

export default {
    enRoll,
}