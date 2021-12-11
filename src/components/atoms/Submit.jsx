import React from "react";
import PropTypes from "prop-types";

const Submit = (props) => {
  return (
    <div className="w-full">
      <input
        data-testid="submit"
        className="w-full shadow duration-250 ease-out bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit"
        value={props.name}
      />
    </div>
  );
};

Submit.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Submit;
