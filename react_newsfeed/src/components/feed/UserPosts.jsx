import React from "react";
import MapPosts from "./MapPosts";
import PropTypes from "prop-types";

class UserPosts extends React.PureComponent {
  componentDidMount = () => {
    this.props.loadPosts();
  };

  render = () => {
    const { posts } = this.props;
    return (
      <div className="UserPostsContainer">
        <div>hello </div>
        {posts ? <MapPosts posts={posts} /> : null}
      </div>
    );
  };
}

UserPosts.propTypes = {
  posts: PropTypes.array,
  loadPosts: PropTypes.func
};

export default UserPosts;
