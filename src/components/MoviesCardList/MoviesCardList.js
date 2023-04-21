import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";

// ДЛЯ СТАТИЧНОЙ ОТРИСОВКИ
import { cards } from "./cardsDataTemporary";

function MoviesCardList() {
  return (
    <section
      className="movies-gallery"
      aria-label="Галерея с карточками фильмов"
    >
      <div className="wrapper movies-gallery__wrapper">
        <div className="movies-gallery__movies">
          {cards.map((card) => (
            <MoviesCard key={card.movieId} card={card} />
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

export default MoviesCardList;
