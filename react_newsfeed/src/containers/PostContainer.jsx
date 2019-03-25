import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/postActions";
import UserPosts from "../components/feed/UserPosts";

class PostContainer extends React.PureComponent {
  render = () => {
    return (
      <UserPosts
        posts={this.props.posts}
        loadPosts={this.props.getAllPosts}
        getPostById={this.props.getPost}
        deletePost={this.props.deletePost}
        postModal={this.props.postModal}
        togglePostModal={this.props.togglePostModal}
      />
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
