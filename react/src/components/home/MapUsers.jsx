import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "reactstrap";
import * as styles from "./homepage.module.css";

const MapUsers = ({ users, editUser, deleteUser, getUser }) => {
  return users.map(user => {
    return (
      <Card key={user.Id} className={styles.MapUserCard}>
        <p onClick={() => getUser(user.Id)} className={styles.UsernameClick}>
          Username: {user.Username}
        </p>
        <p>Firstname: {user.Firstname}</p>
        <p>Lastname: {user.Lastname}</p>
        <Button
          type="button"
          size="sm"
          color="warning"
          onClick={() => editUser(user.Id)}
        >
          Edit
        </Button>
        <Button
          type="button"
          size="sm"
          color="danger"
          onClick={() => deleteUser(user.Id)}
        >
          Delete
        </Button>
      </Card>
    );
  });
};

MapUsers.propTypes = {
  users: PropTypes.array,
  editUser: PropTypes.func,
  deleteUser: PropTypes.func
};

export default React.memo(MapUsers);
