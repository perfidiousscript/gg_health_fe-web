import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECIEVE_LOCATIONS
} from "../constants/action_types";

import fetch from "cross-fetch";

async function callLocations() {
  const response = await fetch(
    `http://localhost:3001/location_search?latitude=45.5419799&longitude=122.6486`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return await response;
}

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
    dispatch(requestLocations());
    return callLocations()
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(json)));
  };
}

export function addLocation(payload) {
  return { type: ADD_LOCATION, payload };
}
