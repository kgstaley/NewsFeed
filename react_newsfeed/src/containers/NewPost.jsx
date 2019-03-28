import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../actions/postActions";
import CreatePost from "../components/feed/CreatePost";

class NewPost extends React.Component {
  render = () => {
    return (
      <CreatePost
        onAddPost={this.props.createPost}
        postModal={this.props.postModal}
        togglePostModal={this.props.togglePostModal}
        loadPage={this.props.getAllPosts}
        getPostById={this.props.getPost}
        updatePost={this.props.updatePost}
        postId={this.props.postId}
        posts={this.props.posts}
        resetPostId={this.props.resetPostId}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    postId: state.postReducer.postId
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(NewPost);
