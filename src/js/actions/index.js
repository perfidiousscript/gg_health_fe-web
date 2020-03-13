import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECIEVE_LOCATIONS
} from "../constants/action_types";

import fetch from "cross-fetch";

function requestLocations() {
  return { type: REQUEST_LOCATIONS };
}

function receiveLocations(json) {
  return {
    type: RECIEVE_LOCATIONS,
    locations: json,
    recievedAt: Date.now()
  };
}

export function fetchLocations() {
  return dispatch => {
    console.log("Hits fetchLocations");
    dispatch(requestLocations());
    return fetch(`localhost:3001/location_search`)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(json)));
  };
}

export function addLocation(payload) {
  return { type: ADD_LOCATION, payload };
}
