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
        {cards.map((card) => (
          <MoviesCard key={card.movieId} card={card} />
        ))}
      </div>
    </section>
  );
}

export default MoviesCardList;
