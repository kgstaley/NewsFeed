import {
  CREATE_POST,
  UPDATE_POST,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  DELETE_POST
} from "../actions/actionTypes";
import { combineReducers } from "redux";

const initialState = {
  post: {
    id: null,
    createdBy: null,
    body: "",
    dateCreated: ""
  }
};

const postReducer = (state = initialState.post, action) => {
  switch (action.type) {
    case CREATE_POST:
      Object.assign(
        {},
        (state = {
          post: {
            id: state.id
          }
        })
      );
      break;
    case UPDATE_POST:
      Object.assign(
        {},
        (state = {
          user: {
            username: state.username,
            firstname: state.firstname,
            lastname: state.lastname,
            email: state.email
          }
        })
      );
      break;
    case GET_ALL_POSTS:
      Object.assign(
        {},
        (state = {
          post: {
            id: state.id,
            createdBy: state.createdBy,
            body: state.body,
            dateCreated: state.dateCreated
          }
        })
      );
      break;
    default:
      return state;
  }
};

export const reducer = combineReducers({ postReducer });
