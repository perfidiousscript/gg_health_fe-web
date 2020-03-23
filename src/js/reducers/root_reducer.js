import { combineReducers } from "redux";
import locationsReducer from "./locations_reducer";
import userReducer from "./user_reducer";
import practiceReducer from "./practice_reducer";

const rootReducer = combineReducers({
  locations: locationsReducer,
  user: userReducer,
  practices: practiceReducer
});

export default rootReducer;
