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
          <ModalHeader toggle={toggleUserModal}> Modal Header </ModalHeader>
          <ModalBody>
            <div>
              {userAttribute.Firstname} {userAttribute.Lastname}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  });
};

MapUserInfo.propTypes = {
  user: PropTypes.array
};

export default React.memo(MapUserInfo);
