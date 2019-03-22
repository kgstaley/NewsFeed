import {
  CREATE_POST,
  UPDATE_POST,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  DELETE_POST
} from "../actions/actionTypes";

const initialState = {
  id: null,
  createdBy: null,
  body: "",
  dateCreated: ""
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case UPDATE_POST:
      return [...state, action.payload];
    case GET_ALL_POSTS:
      return action.posts;
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload.id);
    default:
      return state;
  }
};

export default postReducer;
