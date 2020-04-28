import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  SENDING_APPOINTMENT,
  SENT_APPOINTMENT
} from "../constants/action_types";

const initialState = {
  locations: {},
  isFetching: false,
  appointment: {},
  validAppointment: false
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return { ...state, isFetching: true };
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
        responseStatus: action.responseStatus,
        isFetching: false
      };
    case SENDING_APPOINTMENT:
    case SENT_APPOINTMENT:
    default:
      return state;
  }
}
