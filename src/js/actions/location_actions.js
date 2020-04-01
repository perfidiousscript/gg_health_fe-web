import {
  ADD_LOCATION,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = process.env.REACT_APP_API_URL || "http://localhost:3001";
// const api_url = "http://localhost:3001";

async function searchLocations(token) {
  const response = await fetch(
    `${api_url}/location_search?latitude=45.52024719&longitude=-122.67419496`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return await response;
}

async function callPracticeLocations(token, practiceId) {
  const response = await fetch(`${api_url}/practices/${practiceId}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response;
}

function requestLocations() {
  return { type: REQUEST_LOCATIONS };
}

function receiveLocations({ locations, status }) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: locations,
    responseStatus: status,
    receivedAt: Date.now()
  };
}

export function addLocation(payload) {
  return { type: ADD_LOCATION, payload };
}

export function fetchLocations(type, practiceId) {
  return dispatch => {
    dispatch(requestLocations());
    var token = localStorage.auth_token;
    let callToMake = (function(callType) {
      switch (callType) {
        case "practice":
          return callPracticeLocations;
        case null:
        default:
          return searchLocations;
      }
    })(type);
    return callToMake(token, practiceId)
      .then(response => response.json())
      .then(json => {
        dispatch(receiveLocations(json));
      });
  };
}
