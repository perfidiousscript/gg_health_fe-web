import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
