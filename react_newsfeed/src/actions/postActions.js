import {
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  GET_POST,
  GET_POSTS
} from "./actionTypes";
import * as feedServices from "../services/feedServices";

const createPost = ({ body, createdBy }) => {
  return dispatch => {
    return feedServices
      .insertPost({ body, createdBy })
      .then(res => {
        dispatch(createPostSuccess(res));
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
      Id: res.Id,
      Body: res.Body,
      CreatedBy: res.CreatedBy
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
        console.log(`Successfully grabbed posts, REDUX`, res.recordset);
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
