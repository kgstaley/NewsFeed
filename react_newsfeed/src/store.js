import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "../src/reducers/postReducers";
import loginReducer from "../src/reducers/loginReducer";

const middleware = [thunk];

const reducers = combineReducers({ postReducer, loginReducer });

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
