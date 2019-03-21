import * as helpers from "./serviceHelpers";
import axios from "axios";

const newsApiUrl = `https://newsapi.org/v2`;

const insertPost = payload => {
  const config = {
    method: "POST",
    url: `http://localhost:8080/feed`,
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

export { insertPost, getTopNews };
