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
    //load a page here
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
    if (this.state.body.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
    }
  };

  handleKeyDownSubmit = evt => {
    evt.preventDefault();
    this.handleSubmit(evt);
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
            <Form onSubmit={this.handleKeyDownSubmit}>
              <FormGroup>
                <Input
                  type="textarea"
                  name="body"
                  value={this.props.body}
                  placeholder="Write your post here..."
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                type="submit"
                size="sm"
                color="primary"
                onClick={this.handleSubmit}
                onKeyDown={this.handleKeyDownSubmit}
              >
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
