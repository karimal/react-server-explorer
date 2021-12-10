import React from "react";
import PropTypes from "prop-types";

const Warning = (props) => {
  return (
    <div>
      {props.message.length > 0 && (
        <div className="rounded-lg border mb-4 py-1 px-2 text-sm border-yellow-400 bg-yellow-300 text-yellow-900">
          {props.message}
        </div>
      )}
    </div>
  );
};

Warning.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Warning;
