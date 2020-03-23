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
      return { ...state, isFetching: true };
    case RECIEVE_LOCATIONS:
      return { ...state, locations: action.locations, isFetching: false };
    default:
      return state;
  }
}
