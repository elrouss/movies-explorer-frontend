import React from "react";
import PropTypes from "prop-types";

function MoviesCard({ movie, icon, onMovieSelect }) {
  const { nameRU, duration, trailerLink, image, selected } = movie;

  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;

    return hours ? `${hours}ч` : `${minutes}м`;
  }

  return (
    <article className="movies-card">
      <div className="movies-card__description">
        <h2 className="movies-card__heading">{nameRU}</h2>
        <span className="movies-card__duration">{countTime(duration)}</span>
      </div>
      <button
        className={`btn movies-card__btn-favourite${
          (selected && " btn movies-card__btn-favourite_active") || ""
        }`}
        type="button"
        aria-label="Добавление карточки с фильмом в избранные"
        onClick={(evt) => onMovieSelect(evt, movie)}
      >
        {icon}
      </button>
      <a
        className="link movies-card__link"
        href={trailerLink}
        rel="noreferrer"
        target="_blank"
      >
        <img
          className="movies-card__photo"
          src={
            (image?.url && `https://api.nomoreparties.co${image?.url}`) || image
          }
          alt={`Постер фильма "${nameRU}"`}
        />
      </a>
    </article>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.object,
  icon: PropTypes.element,
  onMovieSelect: PropTypes.func,
};

export default MoviesCard;
