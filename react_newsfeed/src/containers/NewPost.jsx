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
      />
    );
  };
}

export default connect(
  null,
  actionCreators
)(NewPost);
