import axios from "axios";
import * as helpers from "./serviceHelpers";

const registerUser = payload => {
  const config = {
    method: "POST",
    url: `http://localhost:8080/register`,
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
    url: `http://localhost:8080/users`,
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
    url: `http://localhost:8080/user/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

const updateUser = (id, payload) => {};

const deleteUser = id => {
  const config = {
    method: "DELETE",
    url: `http://localhost:8080/${id}/delete`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(helpers.onGlobalSuccess)
    .catch(helpers.onGlobalError);
};

export { registerUser, getUsers, getUser, updateUser, deleteUser };
