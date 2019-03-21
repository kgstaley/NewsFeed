import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle
} from "reactstrap";

const MapUserInfo = ({ user, userModal, toggleUserModal }) => {
  return user.map(userAttribute => {
    return (
      <div key={userAttribute.Id}>
        <Modal isOpen={userModal} toggle={toggleUserModal}>
          <ModalHeader toggle={toggleUserModal}>
            {" "}
            {userAttribute.Firstname} {userAttribute.Lastname}
          </ModalHeader>
          <ModalBody>
            <p>Username: {userAttribute.Username}</p>
            <p>Email: {userAttribute.Email}</p>
          </ModalBody>
          <ModalFooter>NewsFeed</ModalFooter>
        </Modal>
      </div>
    );
  });
};

MapUserInfo.propTypes = {
  user: PropTypes.array
};

export default React.memo(MapUserInfo);
