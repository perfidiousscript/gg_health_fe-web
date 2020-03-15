import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER
} from "../constants/action_types";

import fetch from "cross-fetch";

function response({ firstName, lastName, emailAddress }) {
  fetch(
    `http://localhost:3001/users?first_name=${firstName}&last_name=${lastName}&email_address=${emailAddress}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

function sendUserCreate(user_info) {
  return { type: SEND_CREATE_USER };
}

function receiveUserCreate(json) {
  return {
    type: RECIEVE_CREATE_USER,
    response_status: json,
    recievedAt: Date.now()
  };
}

export function createUser(user_values) {
  return dispatch => {
    dispatch(sendUserCreate());
    return response(user_values);
    // .then(response => response.json())
    // .then(json => dispatch(receiveUserCreate(json)));
  };
}
