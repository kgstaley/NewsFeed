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

export { registerUser };
