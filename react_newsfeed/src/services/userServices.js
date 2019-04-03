import axios from "axios";
import * as helpers from "./serviceHelpers";

const prefix = `http://localhost:8080`;
const netPrefix = `https://localhost:50001/api`;

const registerUser = payload => {
  const config = {
    method: "POST",
    url: `${netPrefix}/users/register`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const login = payload => {
  const config = {
    method: "POST",
    url: `${prefix}/users/login`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getUsers = () => {
  const config = {
    method: "GET",
    url: `${prefix}/users`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const getUser = id => {
  const config = {
    method: "GET",
    url: `${prefix}/users/${id}`,
    data: id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updateUser = payload => {
  const config = {
    method: "PUT",
    url: `${prefix}/users/${payload.id}/edit`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const deleteUser = id => {
  const config = {
    method: "DELETE",
    url: `${prefix}/users/${id}/delete`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { registerUser, getUsers, getUser, updateUser, deleteUser, login };
