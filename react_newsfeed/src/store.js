import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "../src/reducers/postReducers";
import loginReducer from "../src/reducers/loginReducer";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const middleware = [thunk];

const reducers = combineReducers({ postReducer, loginReducer });

const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState({ userLoggedIn: store.getState().userLoggedIn });
});
export default store;
