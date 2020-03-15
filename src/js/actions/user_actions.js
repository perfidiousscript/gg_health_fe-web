import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER
} from "../constants/action_types";

import fetch from "cross-fetch";

const response = fetch(
  `http://localhost:3001/location_search?latitude=45.5419799&longitude=122.6486`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
);

function requestUserCreate() {
  return { type: SEND_CREATE_USER };
}

function receiveUserCreate(json) {
  return {
    type: RECIEVE_CREATE_USER,
    locations: json,
    recievedAt: Date.now()
  };
}

export function createUser() {
  return dispatch => {
    dispatch(requestLocations());
    return response
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(json)));
  };
}
