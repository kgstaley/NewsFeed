import { LOGIN_USER, LOGOUT_USER } from "../actions/actionTypes";

const initialState = {
  userLoggedIn: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        userLoggedIn: true
      };
    case LOGOUT_USER:
      return {
        ...state,
        userLoggedIn: false
      };
    default:
      return state;
  }
};

export default loginReducer;
