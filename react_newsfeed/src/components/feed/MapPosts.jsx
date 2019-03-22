import React from "react";
import PropTypes from "prop-types";

const MapPosts = ({ posts }) => {
  return posts.map(post => {
    return (
      <div key={post.Id}>
        <p>{post.Body}</p>
        <small>{post.DateCreated}</small>
      </div>
    );
  });
};

MapPosts.propTypes = {
  posts: PropTypes.array
};

export default React.memo(MapPosts);
