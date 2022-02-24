import PropTypes from "prop-types";

import React from "react";

import Select from "react-select";

function Filters(props) {
  const { changeOption, options, defaultValue, placeholder } = props;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}

Filters.propTypes = {
  changeOption: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.object,
  placeholder: PropTypes.string,
};

Filters.displayName = "Filters";

export default Filters;
