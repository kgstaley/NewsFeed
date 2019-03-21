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

export { createPost, onCreatePostSuccess };
