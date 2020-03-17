import { combineReducers } from "redux";
import locationsReducer from "./locations_reducer";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
  locations: locationsReducer,
  user: userReducer
});

export default rootReducer;
