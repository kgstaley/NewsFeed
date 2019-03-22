import React from "react";
import PropTypes from "prop-types";

class UserPosts extends React.Component {
  componentDidMount = () => {
    this.props.loadPosts();
  };

  mapPosts = posts => {
    return posts.map(post => {
      return (
        <div>
          <p>{post}</p>
        </div>
      );
    });
  };

  render = () => {
    return (
      <div className="UserPostsContainer">
        <div>hello </div>
        <div>{this.props.posts ? this.mapPosts(this.props.posts) : null}</div>
      </div>
    );
  };
}

UserPosts.propTypes = {
  posts: PropTypes.array,
  loadPosts: PropTypes.func
};

export default UserPosts;
