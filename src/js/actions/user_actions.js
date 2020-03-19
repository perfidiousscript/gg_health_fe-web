import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER,
  SEND_UPDATE_USER,
  RECIEVE_UPDATE_USER,
  SEND_USER_AUTHENTICATE,
  RECIEVE_USER_AUTHENTICATE,
  SEND_USER_PROFILE,
  RECIEVE_USER_PROFILE,
  CALL_ERROR,
  LOG_OUT_USER
} from "../constants/action_types";

import fetch from "cross-fetch";

const api_url = "http://localhost:3001";

async function createUserCall({ firstName, lastName, emailAddress, password }) {
  const response = await fetch(
    `${api_url}/users?first_name=${firstName}&last_name=${lastName}&email_address=${emailAddress}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return await response;
}

async function updateUserCall(userValues, token) {
  const response = await fetch(`${api_url}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userValues
  });
  return await response;
}

async function authenticateUserCall({ emailAddress, password }) {
  const response = await fetch(
    `${api_url}/authenticate?email=${emailAddress}&password=${password}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return await response;
}

async function userProfileCall(token) {
  const response = await fetch(`${api_url}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return await response;
}

function sendUserCreate(user_info) {
  return { type: SEND_CREATE_USER, isFetching: true };
}

function receiveUserCreate({ user, status }) {
  return {
    type: RECIEVE_CREATE_USER,
    responseStatus: status,
    user: user,
    isFetching: false,
    recievedAt: Date.now()
  };
}

function sendUserUpdate(user_info) {
  return { type: SEND_UPDATE_USER, isFetching: true };
}

function receiveUserUpdate({ user }, nextStep) {
  return {
    type: RECIEVE_UPDATE_USER,
    user: user,
    isFetching: false,
    step: nextStep,
    recievedAt: Date.now()
  };
}

function sendUserAuth(user_info) {
  return { type: SEND_USER_AUTHENTICATE, isFetching: true };
}

function receiveUserAuth({ user, auth_token, status }) {
  return {
    type: RECIEVE_USER_AUTHENTICATE,
    responseStatus: status,
    user: user,
    jwt: auth_token,
    isFetching: false,
    recievedAt: Date.now()
  };
}

function receiveUserProfile(user) {
  return {
    type: RECIEVE_USER_PROFILE,
    user: user,
    isFetching: false,
    isAuthenticated: true,
    recievedAt: Date.now()
  };
}

function sendUserProfile() {
  return {
    type: SEND_USER_PROFILE,
    isFetching: true
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

export function authenticateUser(user_values) {
  return dispatch => {
    dispatch(sendUserAuth());
    return authenticateUserCall(user_values)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          localStorage.setItem("auth_token", json.auth_token);
          return dispatch(receiveUserAuth(json));
        }
      });
  };
}

export function getUserProfile() {
  return dispatch => {
    dispatch(sendUserProfile());
    var token = localStorage.auth_token;
    return userProfileCall(token)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          return dispatch(receiveUserProfile(json.user));
        }
      });
  };
}

export function logOutUser() {
  // dispatch();
}

export function createUser(user_values) {
  return dispatch => {
    dispatch(sendUserCreate());
    return createUserCall(user_values)
      .then(response => response.json())
      .then(json => {
        if (json.error) {
          dispatch(callError(json.error));
        } else {
          localStorage.setItem("auth_token", json.auth_token);
          dispatch(receiveUserCreate(json));
        }
      });
  };
}

export function updateUser(userValues, nextStep) {
  return dispatch => {
    dispatch(sendUserUpdate());
    var token = localStorage.auth_token;
    if (token) {
      var userValuesJson = JSON.stringify(userValues);
      return updateUserCall(userValuesJson, token)
        .then(response => response.json())
        .then(json => {
          dispatch(receiveUserUpdate(json, nextStep));
        });
    } else {
      dispatch(callError("Please Log in."));
    }
  };
}
