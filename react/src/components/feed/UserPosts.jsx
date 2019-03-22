import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserPosts extends React.Component {
  componentDidMount = () => {
    this.props.getAllPosts();
  };

  render = () => {
    return (
      <div className="UserPostsContainer">
        <div>hello </div>
        <div>{this.props.posts.posts}</div>
      </div>
    );
  };
}

UserPosts.propTypes = {
  posts: PropTypes.array
};

export default UserPosts;
