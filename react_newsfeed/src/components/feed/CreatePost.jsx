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
    console.log(`MOUNTING CREATE POST`);
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
    if (this.state.body) {
      this.props
        .onAddPost(this.state)
        .then(this.onSubmitSuccess)
        .catch(this.onSubmitFail);
    }
  };

  onSubmitSuccess = () => {
    this.handleReset();
    this.props.loadPage();
  };

  onSubmitFail = err => {
    console.log(`Failed to insert new post.`, err);
  };

  handleReset = () => {
    this.setState({
      body: ""
    });
  };

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
