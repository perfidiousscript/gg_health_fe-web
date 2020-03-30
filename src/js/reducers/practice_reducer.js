import {
  SEND_CREATE_PRACTICE,
  RECEIVE_CREATE_PRACTICE,
  SEND_GET_PRACTICE,
  RECEIVE_GET_PRACTICE,
  SEND_PRACTICE_EDIT,
  RECEIVE_PRACTICE_EDIT,
  CALL_ERROR
} from "../constants/action_types";

const initialState = {
  practices: [],
  error: {},
  isFetching: false
};

export default function practiceReducer(state = initialState, action) {
  switch (action.type) {
    case CALL_ERROR:
      return {
        ...state,
        responseStatus: action.responseStatus,
        error: action.error,
        isFetching: false
      };
    case SEND_GET_PRACTICE:
    case SEND_CREATE_PRACTICE:
    case SEND_PRACTICE_EDIT:
      return { ...state, responseStatus: null, isFetching: true };
    case RECEIVE_PRACTICE_EDIT:
      return {
        ...state,
        practices: action.practice,
        responseStatus: action.responseStatus,
        isFetching: false
      };
    case RECEIVE_CREATE_PRACTICE:
    case RECEIVE_GET_PRACTICE:
      return {
        ...state,
        practices: action.practices,
        responseStatus: action.responseStatus,
        isFetching: false
      };
    default:
      return state;
  }
}
