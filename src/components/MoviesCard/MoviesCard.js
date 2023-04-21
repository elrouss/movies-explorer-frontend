import React from "react";
import PropTypes from "prop-types";

function MoviesCard({ card: { nameRU, duration, image } }) {
  function countTime(duration) {
    const time = duration / 60;
    const hours = Math.floor(time);
    const minutes = duration - hours * 60;

    if (hours && minutes) return `${hours}ч ${minutes}м`;

    return hours ? `${hours}ч` : `${minutes}м`;
  }

  console.log(countTime(duration));

  return (
    <article className="movies-card">
      <div className="movies-card__description">
        <h2 className="movies-card__heading">{nameRU}</h2>
        <span className="movies-card__duration">{countTime(duration)}</span>
      </div>
      <button
        className="btn movies-card__btn-favourite"
        type="submit"
        aria-label="Добавление карточки с фильмом в избранные"
      >
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z"
            stroke="#424242"
          />
        </svg>
      </button>
      <img
        className="movies-card__photo"
        src={image}
        alt={`Карточка с фильмом, называющимся "${nameRU}"`}
      />
    </article>
  );
}

MoviesCard.propTypes = {
  card: PropTypes.object.isRequired,
  nameRU: PropTypes.string,
  duration: PropTypes.number,
  image: PropTypes.string,
};

export default MoviesCard;
