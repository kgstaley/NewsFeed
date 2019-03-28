import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
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

const logout = () => {
  this.dispatch(logoutUserSuccess())
    .then(res => {
      console.log(`SUCCESSFULLY LOGGED USER OUT REDUX.`, res);
    })
    .catch(err => {
      throw err;
    });
};

const logoutUserSuccess = res => {
  return {
    type: LOGOUT_USER
  };
};

export { login, logUserInSuccess, logout, logoutUserSuccess };
