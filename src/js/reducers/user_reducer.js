import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER,
  SEND_USER_AUTHENTICATE,
  RECIEVE_USER_AUTHENTICATE
} from "../constants/action_types";

const initialState = {
  user: {},
  jwt: "",
  response_status: ""
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
