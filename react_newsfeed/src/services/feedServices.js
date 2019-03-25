import * as helpers from "./serviceHelpers";
import axios from "axios";

const newsApiUrl = `https://newsapi.org/v2`;
const prefix = `http://localhost:8080`;

const insertPost = payload => {
  const config = {
    method: "POST",
    url: `${prefix}/feed`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getTopNews = () => {
  const config = {
    method: "GET",
    url: `${newsApiUrl}/top-headlines?country=us&apiKey=9ee95052dfec4f04ae0c84f9d4268cdd`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getAllPosts = () => {
  const config = {
    method: "GET",
    url: `${prefix}/feed`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getPost = id => {
  const config = {
    method: "GET",
    url: `${prefix}/feed/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updatePost = payload => {
  const config = {
    method: "PUT",
    url: `${prefix}/feed/${payload.postId}/edit`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const deletePost = id => {
  const config = {
    method: "DELETE",
    url: `${prefix}/feed/${id}/delete`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { insertPost, getTopNews, updatePost, getAllPosts, getPost, deletePost };
