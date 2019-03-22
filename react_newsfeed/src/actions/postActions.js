import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POST,
  GET_POSTS
} from "./actionTypes";
import * as feedServices from "../services/feedServices";

const createPost = payload => {
  return dispatch => {
    return feedServices
      .insertPost(payload)
      .then(res => {
        dispatch(createPostSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

const createPostSuccess = res => {
  return {
    type: CREATE_POST,
    payload: {
      createdBy: res.createdBy,
      body: res.body
    }
  };
};

const deletePost = id => {
  return dispatch => {
    return feedServices
      .deletePost(id)
      .then(res => {
        dispatch(deletePostSuccess(res.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

const deletePostSuccess = id => {
  return {
    type: DELETE_POST,
    payload: {
      id
    }
  };
};

const getAllPosts = () => {
  return dispatch => {
    return feedServices
      .getAllPosts()
      .then(res => {
        dispatch(getPosts(res.recordset));
      })
      .catch(err => {
        throw err;
      });
  };
};

const getPosts = posts => {
  return {
    type: GET_POSTS,
    posts: posts
  };
};

export {
  createPost,
  createPostSuccess,
  deletePost,
  deletePostSuccess,
  getAllPosts,
  getPosts
};
