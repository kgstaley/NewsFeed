import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      createdBy: 22
    };
  }

  componentDidMount = () => {
    const { postId, posts } = this.props;
    if (postId) {
      const filteredPost = posts.filter(post => post.Id === postId);
      this.setState({
        body: filteredPost[0].Body
      });
    } else {
      this.handleReset();
    }
  };

  handleChange = evt => {
    evt.preventDefault();
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    });
  };

  handleSubmit = evt => {
    const { body } = this.state;
    const id = this.props.postId;
    const payload = this.state;
    const updatePayload = { id, body };
    evt.preventDefault();
    if (!this.props.postId) {
      if (body) {
        this.props
          .onAddPost(payload)
          .then(this.onSubmitSuccess)
          .catch(this.onSubmitFail);
      }
    } else {
      this.props
        .updatePost(updatePayload)
        .then(this.onUpdateSuccess)
        .catch(this.onUpdateFail);
    }
  };

  handleReset = () => {
    this.setState({
      body: ""
    });
  };
  //#region onSuccess & onFail

  onSubmitSuccess = () => {
    this.handleReset();
    this.props.loadPage();
    this.props.togglePostModal();
    this.props.resetPostId();
  };

  onSubmitFail = err => {
    console.log(`Failed to insert new post.`, err);
  };

  onUpdateSuccess = () => {
    this.handleReset();
    this.props.loadPage();
    this.props.togglePostModal();
    this.props.resetPostId();
  };

  onUpdateFail = err => {
    console.log(`Failed to update post.`, err);
  };

  //#endregion

  render = () => {
    return (
      <div className="CreatePostContainer">
        <Modal
          isOpen={this.props.postModal}
          toggle={this.props.togglePostModal}
        >
          <ModalHeader toggle={this.props.togglePostModal}>
            Create a post
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="textarea"
                  name="body"
                  value={this.state.body}
                  placeholder="Write your post here..."
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit" size="sm" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>NewsFeed</ModalFooter>
        </Modal>
        <div>hello </div>
      </div>
    );
  };
}

export default CreatePost;
