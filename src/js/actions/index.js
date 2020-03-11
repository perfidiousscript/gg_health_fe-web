import { ADD_LOCATION } from "../constanct/action_types";

export function addLocation(payload) {
  return { type: ADD_LOCATION, payload };
}
