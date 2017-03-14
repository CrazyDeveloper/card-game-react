import { createStore, applyMiddleware } from "redux";
import combineReducer from "./reducers/combineReducer";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";

const loggerMiddleware = createLogger();

const store = createStore(
  combineReducer,
  applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
  )
);

export default store;
