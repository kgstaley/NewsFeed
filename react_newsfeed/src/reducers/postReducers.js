import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POST,
  GET_POSTS,
  RESET_POSTID
} from "../actions/actionTypes";

const initialState = {
  posts: [],
  postId: 0
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case GET_POST:
      return {
        ...state,
        posts: [...state.posts],
        postId: action.posts[0].Id
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: [action.posts, action.payload],
        postId: action.payload.Id
      };
    case DELETE_POST:
      return {
        posts: state.posts.filter(post => post.Id !== action.payload.Id)
      };
    case RESET_POSTID:
      return {
        ...state,
        ...state.posts,
        postId: 0
      };
    default:
      return state;
  }
};

export default postReducer;
