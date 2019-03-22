import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/postActions";
import UserPosts from "../components/feed/UserPosts";

class PostContainer extends React.Component {
  render = () => {
    return (
      <UserPosts posts={this.props.posts} loadPosts={this.props.getAllPosts} />
    );
  };
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(PostContainer);
