import {
  SEND_CREATE_USER,
  RECIEVE_CREATE_USER
} from "../constants/action_types";

import fetch from "cross-fetch";

async function createUserCall({ firstName, lastName, emailAddress, password }) {
  const response = await fetch(
    `http://localhost:3001/users?first_name=${firstName}&last_name=${lastName}&email_address=${emailAddress}&password=${password}`,
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

export function createUser(user_values) {
  return dispatch => {
    dispatch(sendUserCreate());
    return createUserCall(user_values).then(json =>
      dispatch(receiveUserCreate(json))
    );
  };
}
