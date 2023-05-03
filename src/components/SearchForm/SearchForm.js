import React, { useState } from "react";
import PropTypes from "prop-types";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ onSearch }) {
  const [isSearchFormValid, setIsSearchFormValid] = useState(true);
  const [movieName, setMovieName] = useState("");

  function getMovieName({ target: { value } }) {
    setMovieName(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const trim = movieName.trim();

    setIsSearchFormValid(trim ? true : false);

    if (trim) {
      onSearch(trim.toLowerCase().replace(/\s/g, ""));
    } else {
      return;
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
              type="text"
              placeholder="Фильм"
              required
              value={movieName || ""}
              onChange={getMovieName}
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
        <FilterCheckbox />
      </div>
    </section>
  );
}

SearchForm.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchForm;
