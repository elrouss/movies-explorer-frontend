import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSearch,
  setIsSearchRequestInProgress,
  searchFormValue,
  onFilter,
  isFilterCheckboxChecked,
}) {
  const movie = useRef("");
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);
  // TODO: в случае неизменения запроса создавать видимость отправки запроса данных на сервер?
  //  + сохранять текст ничего не найдено и проч?
  // TODO: поправить верстку (чекбокс)

  function handleSubmit(evt) {
    evt.preventDefault();

    const { value } = movie.current;

    if (!value.trim()) {
      setIsSearchFormValid(false);
    } else {
      setIsSearchFormValid(true);
      onSearch(value);
      setIsSearchRequestInProgress(true);
    }
  }

  return (
    <section className="search" aria-label="Поисковая форма фильмов">
      <div className="wrapper search__wrapper">
        <form
          className="search-film"
          name="search-film"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="search-film__wrapper">
            <input
              className="search-film__input"
              ref={movie}
              type="text"
              placeholder="Фильм"
              defaultValue={searchFormValue}
              required
            />
            <button
              className="btn btn-search"
              type="submit"
              aria-label="Поиск фильмов"
            />
          </div>
          <span
            className={`error${(!isSearchFormValid && " error_visible") || ""}`}
          >
            Нужно ввести ключевое слово
          </span>
        </form>
        <FilterCheckbox
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
        />
      </div>
    </section>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
  setIsSearchRequestInProgress: PropTypes.func,
  searchFormValue: PropTypes.string,
  onFilter: PropTypes.func,
  isFilterCheckboxChecked: PropTypes.bool,
};

export default SearchForm;
