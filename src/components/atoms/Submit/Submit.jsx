import React from "react";
import PropTypes from "prop-types";

const Submit = (props) => {
  return (
    <div className="w-full">
      <input
        data-testid="submit"
        className="w-full shadow duration-250 ease-out bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200"
        type="submit"
        value={props.name}
        disabled={props.disabled}
      />
    </div>
  );
};

Submit.propTypes = {
  name: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};

export default Submit;
