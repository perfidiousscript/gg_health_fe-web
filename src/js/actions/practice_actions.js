import {
  SEND_CREATE_PRACTICE,
  RECIEVE_CREATE_PRACTICE,
  SEND_GET_PRACTICE,
  RECIEVE_GET_PRACTICE
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = "http://localhost:3001";

function sendPracticeCreate(user_info) {
  return { type: SEND_CREATE_PRACTICE, isFetching: true };
}

function receivePracticeCreate({ practice, status }) {
  return {
    type: RECIEVE_CREATE_PRACTICE,
    responseStatus: status,
    practice: practice,
    isFetching: false,
    recievedAt: Date.now()
  };
}

function callError(error) {
  return {
    type: CALL_ERROR,
    error: error,
    fetching: false,
    recievedAt: Date.now()
  };
}

function sendPracticesGet(user_info) {
  return { type: SEND_GET_PRACTICE, isFetching: true };
}

function recievePracticesGet({ practices }) {
  return {
    type: RECIEVE_GET_PRACTICE,
    practices: practices,
    isFetching: false
  };
}

export function getPractices() {
  return dispatch => {
    dispatch(sendPracticeGet());
    return getPracticesCall()
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          dispatch(receivePracticeGet(json));
        }
      });
  };
}

export function createPractice(practice_values) {
  return dispatch => {
    dispatch(sendPracticeCreate());
    return createPracticeCall(user_values)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          dispatch(receivePracticeCreate(json));
        }
      });
  };
}
