import { LOGIN_USER } from "./actionTypes";
import * as userService from "../services/userServices";

const login = payload => {
  return dispatch => {
    return userService
      .login(payload)
      .then(res => {
        dispatch(logUserInSuccess(res));
        console.log(`SUCCESSFUL LOGIN REDUX`, payload);
      })
      .catch(err => {
        throw err;
      });
  };
};

const logUserInSuccess = res => {
  return {
    type: LOGIN_USER,
    payload: {
      username: res.username,
      password: res.password
    }
  };
};

export { login, logUserInSuccess };
