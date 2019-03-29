import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import HomePage from "./components/home/HomePage";
import Users from "./components/users/Users";
import Feed from "./components/feed/Feed";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const {
      userLoggedIn,
      posts,
      logout,
      resetPostId,
      getAllPosts
    } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            render={props => <LoginContainer {...this.props} />}
          />
          (
          <Route
            exact
            path="/logout"
            render={props => (
              <Logout
                {...this.props}
                userLoggedIn={userLoggedIn}
                logout={logout}
              />
            )}
          />
          <Route exact path="/register" component={Register} />
          {userLoggedIn && (
            <Route
              path="/home"
              render={props => (
                <HomePage {...this.props} userLoggedIn={userLoggedIn} />
              )}
            />
          )}
          {userLoggedIn && <Route exact path="/users" component={Users} />}
          {userLoggedIn && (
            <Route
              path="/feed"
              render={props => (
                <Feed
                  {...this.props}
                  loadPosts={getAllPosts}
                  resetPostId={resetPostId}
                  posts={posts}
                />
              )}
            />
          )}
        </Switch>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    postId: state.postReducer.postId,
    userLoggedIn: state.loginReducer.userLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({ type: "LOGOUT_USER" });
    },
    login: () => {
      dispatch({ type: "LOGIN_USER" });
    },
    getAllPosts: () => {
      dispatch({ type: "GET_POSTS" });
    },
    resetPostId: () => {
      dispatch({ type: "RESET_POSTID" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
