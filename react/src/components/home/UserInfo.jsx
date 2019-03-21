import React from "react";
import PropTypes from "prop-types";

const MapUserInfo = ({ users }) => {
  return users.map(user => {
    return (
      <div>
        <div>{user.Firstname}</div>
      </div>
    );
  });
};

MapUserInfo.propTypes = {
  users: PropTypes.array
};

export default React.memo(MapUserInfo);
