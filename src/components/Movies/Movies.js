import React from "react";
import PropTypes from "prop-types";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies({
  movies,
  onSearch,
  setIsSearchRequestInProgress,
  searchFormValue,
  isUserSearching,
  onFilter,
  isFilterCheckboxChecked,
  onMovieLike,
  onLoad,
  error,
}) {
  const icon = (
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
  );

  return (
    <>
      <main>
        <SearchForm
          onSearch={onSearch}
          setIsSearchRequestInProgress={setIsSearchRequestInProgress}
          searchFormValue={searchFormValue}
          onFilter={onFilter}
          isFilterCheckboxChecked={isFilterCheckboxChecked}
        />
        <MoviesCardList
          movies={movies}
          icon={icon}
          onMovieLike={onMovieLike}
          onLoad={onLoad}
          isUserSearching={isUserSearching}
          error={error}
        />
      </main>
      <Footer />
    </>
  );
}

Movies.propTypes = {
  movies: PropTypes.array,
  onSearch: PropTypes.func,
  setIsSearchRequestInProgress: PropTypes.func,
  searchFormValue: PropTypes.string,
  isUserSearching: PropTypes.bool,
  onFilter: PropTypes.func,
  isFilterCheckboxChecked: PropTypes.bool,
  onMovieLike: PropTypes.func,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
};

export default Movies;
