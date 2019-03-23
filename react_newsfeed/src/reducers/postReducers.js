import { CREATE_POST, GET_POSTS } from "../actions/actionTypes";

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    default:
      return state;
  }
};

export default postReducer;
