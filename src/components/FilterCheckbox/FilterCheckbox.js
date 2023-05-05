import React from "react";
import PropTypes from "prop-types";

function FilterCheckbox({ onFilter, isFilterCheckboxChecked }) {
  // TODO: добавить переключение чекбокса с клавиатуры на 3-м этапе

  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__wrapper">
        <input
          className="filter-checkbox__input"
          id="filter-films"
          type="checkbox"
          checked={isFilterCheckboxChecked}
          onChange={(evt) => onFilter(evt)}
        />
        <label
          className="filter-checkbox__label"
          htmlFor="filter-films"
          tabIndex="0"
        />
      </div>
      <span className="filter-checkbox__span">Короткометражки</span>
    </div>
  );
}

FilterCheckbox.propTypes = {
  isFilterCheckboxChecked: PropTypes.bool,
  onFilter: PropTypes.func,
};

export default FilterCheckbox;
