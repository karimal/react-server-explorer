import React from "react";
import PropTypes from "prop-types";

const Input = (props) => {
  return (
    <section className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
          htmlFor={props.id}
        >
          {props.label}
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </div>
    </section>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
