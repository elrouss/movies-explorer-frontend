import React from "react";

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <div className="filter-checkbox__wrapper">
        <input
          className="filter-checkbox__input"
          id="filter-films"
          type="checkbox"
        />
        <label className="filter-checkbox__label" htmlFor="filter-films" />
      </div>
      <span className="filter-checkbox__span">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
