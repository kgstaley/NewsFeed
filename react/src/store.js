import { createStore, combineReducers } from "redux";
import postReducer from "./reducers/postReducer";

const store = createStore(
  combineReducers({ postReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
