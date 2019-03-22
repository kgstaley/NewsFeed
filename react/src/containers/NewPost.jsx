import CreatePost from "../components/feed/CreatePost";
import { connect } from "react-redux";
import { createPost } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    onAddPost: post => {
      dispatch(createPost(post));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePost);
