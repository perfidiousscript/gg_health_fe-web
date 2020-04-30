import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/root_reducer";
import promise from "redux-promise-middleware";

export default createStore(
  rootReducer,
  applyMiddleware(promise, thunkMiddleware)
);
