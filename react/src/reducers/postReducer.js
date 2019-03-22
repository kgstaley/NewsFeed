import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POST,
  GET_POSTS
} from "../actions/postActions";

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case DELETE_POST:
      return state.filter(post => post.id !== action.payload.id);
    case GET_POSTS:
      return action.posts;
    default:
      return state;
  }
};

export default postReducer;
