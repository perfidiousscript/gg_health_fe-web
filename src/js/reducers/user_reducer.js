import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER,
  SEND_UPDATE_USER,
  RECIEVE_UPDATE_USER,
  SEND_USER_AUTHENTICATE,
  RECIEVE_USER_AUTHENTICATE,
  SEND_USER_PROFILE,
  RECIEVE_USER_PROFILE,
  CALL_ERROR,
  LOG_OUT_USER
} from "../constants/action_types";

const initialState = {
  user: {},
  jwt: "",
  responseStatus: "",
  error: "",
  isFetching: false,
  authError: false,
  isAuthenticated: false,
  signUpStep: 1
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_USER_AUTHENTICATE:
      return { ...state, isFetching: true };
    case RECIEVE_USER_AUTHENTICATE:
      return {
        ...state,
        responseStatus: action.responseStatus,
        user: action.user,
        jwt: action.jwt,
        isAuthenticated: true,
        isFetching: false
      };
    case CALL_ERROR:
      return {
        ...state,
        error: action.error,
        isAuthenticated: false,
        isFetching: false
      };
    case SEND_CREATE_USER:
      return { ...state, isFetching: true };
    case RECIEVE_CREATE_USER:
      return {
        ...state,
        user: action.user,
        jwt: action.jwt,
        isFetching: false,
        signUpStep: 2
      };
    case SEND_UPDATE_USER:
      return { ...state, isFetching: true };
    case RECIEVE_UPDATE_USER:
      return {
        ...state,
        user: action.user,
        isFetching: false,
        signUpStep: action.step
      };
    case SEND_USER_PROFILE:
      return { ...state, isFetching: true };
    case RECIEVE_USER_PROFILE:
      return {
        ...state,
        user: action.user,
        isFetching: false,
        isAuthenticated: true
      };
    case LOG_OUT_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
}
