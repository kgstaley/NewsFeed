import {
  CREATE_POST,
  UPDATE_POST,
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  DELETE_POST
} from "./actionTypes";
import * as feedServices from "../services/feedServices";

const createPost = ({ payload }) => {
  return dispatch => {
    return feedServices
      .insertPost(payload)
      .then(res => {
        dispatch(onCreatePostSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

const onCreatePostSuccess = res => {
  return {
    type: CREATE_POST,
    payload: {
      createdBy: res.createdBy,
      body: res.body
    }
  };
};

const updatePost = ({ payload }) => {
  return dispatch => {
    return feedServices.updatePost;
  };
};

const getPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts
  };
};

const getAllPosts = () => {
  return dispatch => {
    return feedServices
      .getAllPosts()
      .then(res => {
        dispatch(getPosts(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export { createPost, onCreatePostSuccess, getPosts, getAllPosts };
