// import {
//   REGISTER_USER,
//   GET_USER,
//   DELETE_USER,
//   UPDATE_USER
// } from "../actions/actionTypes";
// import { combineReducers } from "redux";

// const initialState = {
//   user: {
//     username: "",
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: ""
//   },
//   newsArticles: []
// };

// const userReducer = (state = initialState.user, action) => {
//   switch (action.type) {
//     case REGISTER_USER:
//       Object.assign(
//         {},
//         (state = {
//           user: {
//             username: state.username,
//             firstname: state.firstname,
//             lastname: state.lastname,
//             email: state.email,
//             password: state.password
//           }
//         })
//       );
//       break;
//     case GET_USER:
//       Object.assign(
//         {},
//         (state = {
//           user: {
//             username: state.username,
//             firstname: state.firstname,
//             lastname: state.lastname,
//             email: state.email
//           }
//         })
//       );
//       break;
//     default:
//       return state;
//   }
// };

// const newsReducer = (state = initialState.newsArticles, action) => {
//     switch(action.type)
// }

// export const reducer = combineReducers({ userReducer, newsReducer });
