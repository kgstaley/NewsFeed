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
  componentDidMount = () => {
    //load a page here
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
            <Form>
              <FormGroup>
                <Input type="text" />
              </FormGroup>
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
