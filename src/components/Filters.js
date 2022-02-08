import PropTypes from "prop-types";

import React from "react";

import Select from "react-select";

function Filters(props) {
  const { changeOption, options } = props;
  const optionsData = options;
  const onChangeHandler = function (e) {
    changeOption(e.value);
  };
  return (
    <div className="filter-component">
      <Select
        onChange={onChangeHandler}
        isSearchable={true}
        options={optionsData}
      />
    </div>
  );
}

Filters.propTypes = {
  changeOption: PropTypes.func,
  options: PropTypes.array,
};

Filters.displayName = "Filters";

export default Filters;
