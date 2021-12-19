import React from "react";
import PropTypes from "prop-types";

const Server = (props) => {
  return (
    <li
      className="flex p-2 px-6 hover:bg-blue-500 hover:text-white justify-between text-sm"
      data-testid="server-item"
    >
      <span>{props.server.name}</span>
      <span>{props.server.distance}km</span>
    </li>
  );
};

Server.propTypes = {
  server: PropTypes.object.isRequired,
};

export default Server;
