import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPosts } from "../../actions/postActions";

class UserPosts extends React.Component {
  componentDidMount = () => {
    this.props.getAllPosts();
  };

  render = () => {
    return (
      <div className="UserPostsContainer">
        <div>hello </div>
        <div>{this.props.posts.post}</div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => {
      dispatch(getAllPosts());
    }
  };
};

UserPosts.propTypes = {
  posts: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPosts);
