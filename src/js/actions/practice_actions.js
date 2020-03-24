import {
  SEND_CREATE_PRACTICE,
  RECEIVE_CREATE_PRACTICE,
  SEND_GET_PRACTICE,
  RECEIVE_GET_PRACTICE,
  CALL_ERROR
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = "http://localhost:3001";

async function getPracticesCall(token) {
  const response = await fetch(`http://localhost:3001/practices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response;
}

async function createPracticeCall(practiceValues, token) {
  const response = await fetch(`http://localhost:3001/practices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: practiceValues
  });
  return await response;
}

function sendPracticeCreate(user_info) {
  return { type: SEND_CREATE_PRACTICE, isFetching: true };
}

function receivePracticeCreate({ practice, status }) {
  return {
    type: RECEIVE_CREATE_PRACTICE,
    responseStatus: status,
    practice: practice,
    isFetching: false,
    RECEIVEdAt: Date.now()
  };
}

function callError(error) {
  return {
    type: CALL_ERROR,
    error: error,
    fetching: false,
    RECEIVEdAt: Date.now()
  };
}

function sendPracticesGet(user_info) {
  return { type: SEND_GET_PRACTICE, isFetching: true };
}

function receivePracticesGet({ practices }) {
  return {
    type: RECEIVE_GET_PRACTICE,
    practices: practices,
    isFetching: false
  };
}

export function getPractices() {
  return dispatch => {
    dispatch(sendPracticesGet());
    var token = localStorage.auth_token;
    return getPracticesCall(token)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          dispatch(receivePracticesGet(json));
        }
      });
  };
}

export function createPractice(practiceValues) {
  return dispatch => {
    dispatch(sendPracticeCreate());
    return createPracticeCall(practiceValues)
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
