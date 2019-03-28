import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import Register from "./components/register/Register";
import LandingPage from "./components/landingPage/LandingPage";
import HomePage from "./components/home/HomePage";
import Users from "./components/users/Users";
import Feed from "./components/feed/Feed";
import { connect } from "react-redux";
import * as postActions from "./actions/postActions";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginContainer
                {...this.props}
                userLoggedIn={this.props.userLoggedIn}
              />
            )}
          />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/users" component={Users} />
          <Route
            path="/feed"
            render={props => (
              <Feed
                {...this.props}
                loadPosts={this.props.getAllPosts}
                resetPostId={this.props.resetPostId}
                posts={this.props.posts}
              />
            )}
          />
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

export default connect(
  mapStateToProps,
  postActions
)(App);
