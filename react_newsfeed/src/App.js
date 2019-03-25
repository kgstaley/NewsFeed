import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
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
          <Route exact path="/login" component={Login} />
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
    posts: state.posts,
    postId: state.postId
  };
};

export default connect(
  mapStateToProps,
  postActions
)(App);
