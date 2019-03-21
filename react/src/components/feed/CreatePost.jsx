import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class CreatePost extends React.Component {
  componentDidMount = () => {
    //load a page here
  };
  render = () => {
    return (
      <div className="CreatePostContainer">
          <Modal>
              <ModalHeader isOpen={this.props.}>header goes here</ModalHeader>
              <ModalBody>
                  <p>some content goes here form </p>
              </ModalBody>
              <ModalFooter>NewsFeed</ModalFooter>
          </Modal>
        <div>hello </div>
      </div>
    );
  };
}

export default CreatePost;
