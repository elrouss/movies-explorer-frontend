import React from "react";
import PropTypes from "prop-types";

import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  movies,
  icon,
  onLoad,
  hasUserSearched,
  error: { moviesResponse },
}) {
  function renderResults() {
    if (onLoad) return <Preloader />;

    if (hasUserSearched && !movies.length && !moviesResponse) {
      return <p className="paragraph">Ничего не найдено</p>;
    }

    if (hasUserSearched && !movies.length && moviesResponse) {
      return <p className="paragraph paragraph_type_error">{moviesResponse}</p>;
    }

    return (
      <div className="movies-gallery__movies">
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} icon={icon} />
        ))}
      </div>
    );
  }

  return (
    <section
      className="movies-gallery"
      aria-label="Галерея с карточками фильмов"
    >
      <div className="wrapper movies-gallery__wrapper">
        {renderResults()}

        {/* // <button>
        //     className="btn movies-gallery__btn-more"
        //     type="button"
        //     aria-label="Отображение новых карточек с фильмами в галерее"

        //     Ещё
        //   </button> */}
      </div>
    </section>
  );
}

MoviesCardList.propTypes = {
  icon: PropTypes.element,
  movies: PropTypes.array,
  onLoad: PropTypes.bool,
  hasUserSearched: PropTypes.bool,
  error: PropTypes.object,
};

export default MoviesCardList;
