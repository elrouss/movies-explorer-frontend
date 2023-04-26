import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search" aria-label="Поисковая форма фильмов">
      <div className="wrapper search__wrapper">
        <form className="search-film" name="search-film">
          <input
            className="search-film__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button
            className="btn btn-search"
            type="submit"
            aria-label="Поиск фильмов"
          />
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}

export default SearchForm;
