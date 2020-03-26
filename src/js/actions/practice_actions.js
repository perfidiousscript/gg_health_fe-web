import {
  SEND_CREATE_PRACTICE,
  RECEIVE_CREATE_PRACTICE,
  SEND_GET_PRACTICE,
  RECEIVE_GET_PRACTICE,
  SEND_PRACTICE_EDIT,
  RECEIVE_PRACTICE_EDIT,
  CALL_ERROR
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = "http://localhost:3001";

async function getPracticesCall(token) {
  const response = await fetch(`${api_url}/practices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response;
}

async function createPracticeCall(practiceValues, token) {
  const response = await fetch(`${api_url}/practices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: practiceValues
  });
  return await response;
}

async function editPracticeCall(practiceValues, token) {
  let callJson = JSON.stringify(practiceValues);
  console.log("callJson: ", callJson);
  const response = await fetch(`${api_url}/practices/${practiceValues.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: callJson
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
    ReceivedAt: Date.now()
  };
}

function sendPracticeEdit() {
  return { type: SEND_PRACTICE_EDIT, isFetching: true };
}

function receivePracticeEdit({ practice, status }) {
  return {
    type: RECEIVE_PRACTICE_EDIT,
    practice: practice,
    responseStatus: status,
    isFetching: false,
    ReceivedAt: Date.now()
  };
}

function callError(error) {
  return {
    type: CALL_ERROR,
    error: error,
    fetching: false,
    ReceivedAt: Date.now()
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
  var token = localStorage.auth_token;
  return dispatch => {
    dispatch(sendPracticesGet());
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
    var token = localStorage.auth_token;
    dispatch(sendPracticeCreate());
    return createPracticeCall(practiceValues, token)
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

export function editPractice(practiceValues) {
  return dispatch => {
    var token = localStorage.auth_token;
    dispatch(sendPracticeEdit());
    return editPracticeCall(practiceValues, token)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          dispatch(receivePracticeEdit(json));
        }
      });
  };
}
