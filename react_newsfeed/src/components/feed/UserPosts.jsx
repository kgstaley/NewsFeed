import React from "react";
import MapPosts from "./MapPosts";
import PropTypes from "prop-types";

class UserPosts extends React.PureComponent {
  componentDidMount = () => {
    this.props.loadPosts();
  };

  getPostById = id => {
    this.props
      .getPostById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdFail);
  };

  deletePost = id => {
    this.props
      .deletePost(id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteFail);
  };

  onGetByIdSuccess = () => {
    this.props.togglePostModal();
  };

  onGetByIdFail = err => {
    console.log(`Failed to get post by ID`, err);
  };

  onDeleteSuccess = res => {
    this.props.loadPosts();
  };

  onDeleteFail = err => {
    console.log(`Failed to delete post`, err);
  };

  render = () => {
    const { posts } = this.props;
    return (
      <div className="UserPostsContainer">
        {posts ? (
          <MapPosts
            posts={posts}
            deletePost={this.deletePost}
            getPostById={this.getPostById}
          />
        ) : null}
      </div>
    );
  };
}

UserPosts.propTypes = {
  posts: PropTypes.array,
  loadPosts: PropTypes.func,
  history: PropTypes.object,
  deletePost: PropTypes.func,
  getPostById: PropTypes.func
};

export default UserPosts;
