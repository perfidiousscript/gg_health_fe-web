import {
  REQUEST_CREATE_USER,
  RECIEVE_CREATE_USER
} from "../constants/action_types";

const initialState = {
  user: {}
};

export default function userReducer(state = initialState, action) {
  // switch (action.type) {
  //   case REQUEST_LOCATIONS:
  //     return Object.assign({}, state, { isFetching: true });
  //   case RECIEVE_LOCATIONS:
  //     return Object.assign({}, state, {
  //       locations: action.locations,
  //       isFetching: false
  //     });
  //   default:
  //     return state;
  // }
}
