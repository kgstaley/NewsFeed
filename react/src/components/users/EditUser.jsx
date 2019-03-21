import React from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup
} from "reactstrap";
import PropTypes from "prop-types";

class EditUser extends React.PureComponent {
  render = () => {
    const { editModal, user } = this.props;
    return (
      <div>
        <Modal isOpen={editModal} toggle={this.props.toggleEditModal}>
          <ModalHeader toggle={this.props.toggleEditModal}>
            <h2>Header</h2>
          </ModalHeader>
          <ModalBody>
            <Form>
              <h5>Edit a profile: </h5>
              <FormGroup>
                <Input
                  type="text"
                  name="Username"
                  value={user.Username}
                  placeholder="Username"
                  onChange={this.props.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="Firstname"
                  value={user.Firstname}
                  placeholder="firstname"
                  onChange={this.props.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="Lastname"
                  value={user.Lastname}
                  placeholder="lastname"
                  onChange={this.props.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="Email"
                  value={user.Email}
                  placeholder="email"
                  onChange={this.props.handleChange}
                />
              </FormGroup>
              <Button
                type="button"
                color="danger"
                size="sm"
                onClick={this.props.toggleEditModal}
              >
                Cancel
              </Button>
              <div className="float-right">
                <Button
                  type="button"
                  onClick={() => this.props.updateUser(user)}
                  size="sm"
                  color="warning"
                >
                  Update
                </Button>
              </div>
            </Form>
          </ModalBody>
          <ModalFooter>NewsFeed</ModalFooter>
        </Modal>
      </div>
    );
  };
}

EditUser.propTypes = {
  user: PropTypes.object,
  toggleEditModal: PropTypes.func,
  handleChange: PropTypes.func
};

export default EditUser;
