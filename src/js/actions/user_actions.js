import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER,
  SEND_USER_AUTHENTICATE,
  RECIEVE_USER_AUTHENTICATE
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

function sendUserCreate(user_info) {
  return { type: SEND_CREATE_USER, isFetching: true };
}

function receiveUserCreate({ status }) {
  return {
    type: RECIEVE_CREATE_USER,
    responseStatus: status,
    isFetching: false,
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

export function authenticateUser(user_values) {
  return dispatch => {
    dispatch(sendUserAuth());
    return authenticateUserCall(user_values)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem("token", json.auth_token);
        dispatch(receiveUserAuth(json));
      });
  };
}

export function createUser(user_values) {
  return dispatch => {
    dispatch(sendUserCreate());
    return createUserCall(user_values).then(json =>
      dispatch(receiveUserCreate(json))
    );
  };
}
