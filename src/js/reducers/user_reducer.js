import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER,
  SEND_USER_AUTHENTICATE,
  RECIEVE_USER_AUTHENTICATE,
  AUTHENTICATION_ERROR
} from "../constants/action_types";

const initialState = {
  user: {},
  jwt: "",
  responseStatus: "",
  isFetching: false,
  authError: false,
  isAuthenticated: false
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_USER_AUTHENTICATE:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_USER_AUTHENTICATE:
      return Object.assign({}, state, {
        responseStatus: action.responseStatus,
        user: action.user,
        jwt: action.jwt,
        isAuthenticated: true,
        isFetching: false
      });
    case AUTHENTICATION_ERROR:
      return Object.assign({}, state, {
        authError: action.authError,
        isAuthenticated: false,
        isFetching: false
      });
    case SEND_CREATE_USER:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_CREATE_USER:
      return Object.assign({}, state, {
        responseStatus: action.responseStatus,
        isFetching: false
      });
    default:
      return state;
  }
}
