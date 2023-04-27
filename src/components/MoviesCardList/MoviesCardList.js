import React from "react";
import PropTypes from "prop-types";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, icon }) {
  return (
    <section
      className="movies-gallery"
      aria-label="Галерея с карточками фильмов"
    >
      <div className="wrapper movies-gallery__wrapper">
        <div className="movies-gallery__movies">
          {movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} icon={icon} />
          ))}
        </div>
        <button
          className="btn movies-gallery__btn-more"
          type="button"
          aria-label="Отображение новых карточек с фильмами в галерее"
        >
          Ещё
        </button>
      </div>
    </section>
  );
}

MoviesCardList.propTypes = {
  icon: PropTypes.element,
  movies: PropTypes.array,
};

export default MoviesCardList;
