import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import {
  LAPTOP_SCREEN_WIDTH,
  MOBILE_SCREEN_WIDTH,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  icon,
  onLoad,
  isUserSearching,
  error: { moviesResponse },
}) {
  const windowWidth = useWindowDimensions();
  const isDesktop = windowWidth > LAPTOP_SCREEN_WIDTH;
  const isTablet =
    windowWidth > MOBILE_SCREEN_WIDTH && windowWidth <= LAPTOP_SCREEN_WIDTH;

  const numCardsDesktopInit = 12;
  const numCardsTabletInit = 8;
  const numCardsMobileInit = 5;

  const numCardsDesktopAdd = 3;
  const numCardsTabletAdd = 2;
  const numCardsMobileAdd = 2;

  const [visibleCards, setVisibleCards] = useState(0);

  useEffect(() => {
    // Initial rendering cards number
    if (
      [numCardsDesktopInit, numCardsTabletInit, numCardsMobileInit, 0].includes(
        visibleCards
      )
    ) {
      setVisibleCards(
        isDesktop
          ? numCardsDesktopInit
          : isTablet
          ? numCardsTabletInit
          : numCardsMobileInit
      );
    }

    // Here we check, whether user's width of device has been changed
    // and he clicked on button to see more cards.
    // If, after this action he again has changed
    // the device's width, then we render more cards (if it's needed)
    // on each width to fill the possible void in the gallery
    if (
      isDesktop &&
      visibleCards % 3 !== 0 &&
      ![
        numCardsDesktopInit,
        numCardsTabletInit,
        numCardsMobileInit,
        0,
      ].includes(visibleCards)
    ) {
      setVisibleCards((prevVal) =>
        prevVal % 3 === 1 ? prevVal + 2 : prevVal + 1
      );
    }

    if (isTablet && visibleCards % 2 !== 0) {
      setVisibleCards((prevVal) => prevVal + 1);
    }
  }, [windowWidth]);

  const { length: moviesLength } = movies;

  function renderCards() {
    return (
      <div className="movies-gallery__movies">
        {movies.slice(0, visibleCards).map((movie) => (
          <MoviesCard key={movie.id} movie={movie} icon={icon} />
        ))}
      </div>
    );
  }

  function setMoreCards() {
    setVisibleCards(
      (prevVal) =>
        prevVal +
        (isDesktop
          ? numCardsDesktopAdd
          : isTablet
          ? numCardsTabletAdd
          : numCardsMobileAdd)
    );
  }

  function renderResults() {
    if (onLoad) return <Preloader />;

    if (isUserSearching && !moviesLength && !moviesResponse) {
      return <p className="paragraph">Ничего не найдено</p>;
    }

    if (isUserSearching && !moviesLength && moviesResponse) {
      return <p className="paragraph paragraph_type_error">{moviesResponse}</p>;
    }

    return renderCards();
  }

  return (
    <section
      className="movies-gallery"
      aria-label="Галерея с карточками фильмов"
    >
      <div className="wrapper movies-gallery__wrapper">
        {renderResults()}

        {visibleCards < moviesLength && (
          <button
            className="btn movies-gallery__btn-more"
            type="button"
            aria-label="Отображение новых карточек с фильмами в галерее"
            onClick={() => setMoreCards()}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}

MoviesCardList.propTypes = {
  icon: PropTypes.element,
  movies: PropTypes.array,
  onLoad: PropTypes.bool,
  isUserSearching: PropTypes.bool,
  error: PropTypes.object,
};

export default MoviesCardList;
