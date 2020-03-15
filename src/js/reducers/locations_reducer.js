import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECIEVE_LOCATIONS
} from "../constants/action_types";

const initialState = {
  locations: [],
  isFetching: false
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_LOCATIONS:
      return Object.assign({}, state, {
        locations: action.locations,
        isFetching: false
      });
    default:
      return state;
  }
}
