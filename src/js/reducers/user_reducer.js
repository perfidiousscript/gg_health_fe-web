import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER
} from "../constants/action_types";

const initialState = {
  user: {},
  response_status: ""
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_CREATE_USER:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_CREATE_USER:
      console.log("In Recieve Create User: ", action);
      return Object.assign({}, state, {
        responseStatus: action.responseStatus,
        isFetching: false
      });
    default:
      return state;
  }
}
