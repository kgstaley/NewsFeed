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
