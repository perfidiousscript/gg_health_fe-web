import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from "../constants/action_types";

const initialState = {
  locations: [],
  isFetching: false
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return { ...state, isFetching: true };
    case RECEIVE_LOCATIONS:
      return { ...state, locations: action.locations, isFetching: false };
    default:
      return state;
  }
}
