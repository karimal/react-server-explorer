import React from "react";
import PropTypes from "prop-types";

const SortDDL = (props) => {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
      className="border-2 border-gray-200 py-2 px-4 rounded w-full sm:w-1/5"
      data-testid="sort-ddl"
    >
      <option value="">Sort</option>
      <option value="name-asc">Locations Ascending</option>
      <option value="name-desc">Locations Descending</option>
      <option value="distance-asc">Distance Ascending</option>
      <option value="distance-desc">Distance Descending</option>
    </select>
  );
};

SortDDL.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SortDDL;
