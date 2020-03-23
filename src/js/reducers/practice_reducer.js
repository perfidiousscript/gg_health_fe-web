import {
  SEND_CREATE_PRACTICE,
  RECIEVE_CREATE_PRACTICE
} from "../constants/action_types";

const initialState = {
  practice: {},
  error: {},
  isFetching: false
};

export default function practiceReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_CREATE_PRACTICE:
      return { ...state, isFetching: true };
    case RECIEVE_CREATE_PRACTICE:
      return { ...state, practice: action.practice, isFetching: false };
    default:
      return state;
  }
}
