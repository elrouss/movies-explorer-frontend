import React from "react";
import PropTypes from "prop-types";

import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Footer from "../Footer/Footer.js";

function SavedMovies({ movies, onMovieSelect, onLoad }) {
  const icon = (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4.94287L6.35705 7.29992L7.41771 6.23926L5.06066 3.88221L7.29992 1.64295L6.23926 0.582291L4 2.82155L1.76086 0.582406L0.700195 1.64307L2.93934 3.88221L0.582406 6.23914L1.64307 7.2998L4 4.94287Z"
        fill="white"
      />
    </svg>
  );

  return (
    <>
      <main>
        <SearchForm />
        <MoviesCardList
          movies={movies}
          icon={icon}
          onMovieSelect={onMovieSelect}
          onLoad={onLoad}
        />
      </main>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
  movies: PropTypes.array,
  onMovieSelect: PropTypes.func,
  onLoad: PropTypes.bool,
};

export default SavedMovies;
