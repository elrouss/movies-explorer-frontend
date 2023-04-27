import React from "react";
import PropTypes from "prop-types";

function MoviesCard({
  movie: {
    nameRU,
    duration,
    trailerLink,
    image: { url },
  },
  icon,
}) {
  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;

    return hours ? `${hours}ч` : `${minutes}м`;
  }

  // TODO: ДЛЯ СТАТИЧНОГО МАКЕТА
  let isFavouriteCard = false;

  return (
    <article className="movies-card">
      <div className="movies-card__description">
        <h2 className="movies-card__heading">{nameRU}</h2>
        <span className="movies-card__duration">{countTime(duration)}</span>
      </div>
      <button
        className={`btn movies-card__btn-favourite${
          (isFavouriteCard && " movies-card__btn-favourite_active") || ""
        }`}
        type="button"
        aria-label="Добавление карточки с фильмом в избранные"
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
          src={`https://api.nomoreparties.co/${url}`}
          alt={`Карточка с фильмом, называющимся "${nameRU}"`}
        />
      </a>
    </article>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.object,
  nameRU: PropTypes.string,
  duration: PropTypes.number,
  trailerLink: PropTypes.string,
  image: PropTypes.object,
  url: PropTypes.string,
  icon: PropTypes.element,
};

export default MoviesCard;
