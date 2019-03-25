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
    if (this.props.postId) {
      this.setState({
        body: this.props.posts[0].Body
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
    evt.preventDefault();
    if (this.props.postId === 0) {
      if (this.state.body) {
        this.props
          .onAddPost(this.state)
          .then(this.onSubmitSuccess)
          .catch(this.onSubmitFail);
      }
    } else {
      this.props
        .updatePost(this.props.postId)
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
  };

  onSubmitFail = err => {
    console.log(`Failed to insert new post.`, err);
  };

  onUpdateSuccess = res => {
    console.log(`Successfully updated post.`, res);
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
