import { Alert,Text } from "react-native";
import React  from "react";

const userState = {
  id: null,
  full_name: null,
  role: null,
  avatar: null,
  study_at: null,
  is_graduated: false,
  bio: null,
  address: null,
  phone: null,
  birthday: null,
  process_courses:[],
  account: {
    id: null,
    email: null,
    date_joined: null,
  },
  error:null,
};

const userReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case "GET_USER":
      return {
        ...state,
      };
    case "GET_USER_SUCCESS":
      const {
        id,
        full_name,
        role,
        avatar,
        study_at,
        is_graduated,
        bio,
        address,
        phone,
        birthday,
        account,
        process_courses,
      } = payload;
      return {
        ...state,
        id: id,
        full_name: full_name,
        role: role,
        avatar: avatar,
        study_at: study_at,
        is_graduated: is_graduated,
        bio: bio,
        address: address,
        phone: phone,
        birthday: birthday,
        process_courses: process_courses,
        account: {
          id: account.id,
          email: account.email,
          date_joined: account.date_joined,
        },
        error: null,
        isLoading: false,
      };
    case "GET_USER_FAILURE":
      return {
        ...state,
        error: payload.detail,
      };
    case "UPDATE_PROFILE_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PROFILE_USER_SUCCESS":
      Alert.alert("Success", "Update Success");
      return {
        ...state,
        id: payload.id,
        full_name: payload.full_name,
        role: payload.role,
        avatar: payload.avatar,
        study_at: payload.study_at,
        is_graduated: payload.is_graduated,
        bio: payload.bio,
        address: payload.address,
        phone: payload.phone,
        birthday: payload.birthday,
        account: {
          email: payload.account.email,
          date_joined: payload.account.date_joined,
        },
        error: "",
        isLoading: false,
      };
    case "UPDATE_PROFILE_USER_FAILURE":
      return {
        ...state,
        error: payload.detail,
        isLoading: false,
      };
    case "RESET_ERROR":
      return {
        ...state,
        error: "",
      };
    case "LOGOUT":
      return userState;
    case "CHANGE_PASSWORD":
      return {
        ...state,
        error:''
      };
    default:
      return state;
  }
};

export default userReducer;
