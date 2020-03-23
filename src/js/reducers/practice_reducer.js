import {
  SEND_CREATE_PRACTICE,
  RECEIVE_CREATE_PRACTICE,
  SEND_GET_PRACTICE,
  RECEIVE_GET_PRACTICE
} from "../constants/action_types";

const initialState = {
  practices: [],
  error: {},
  isFetching: false
};

export default function practiceReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_CREATE_PRACTICE:
      return { ...state, isFetching: true };
    case RECEIVE_CREATE_PRACTICE:
      return { ...state, practices: action.practices, isFetching: false };
    case SEND_GET_PRACTICE:
      return { ...state, isFetching: true };
    case RECEIVE_GET_PRACTICE:
      return { ...state, practices: action.practices, isFetching: false };
    default:
      return state;
  }
}
