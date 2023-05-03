import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Header from "../Header/Header.js";

import Main from "../Main/Main.js";

import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

import { getMovies } from "../../utils/MoviesApi.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isSearchFormNotEmpty, setIsSearchFormNotEmpty] = useState(false);
  console.log(movies);

  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  function openModalWindow() {
    setIsModalWindowOpened(true);
  }

  function toggleHamburgerMenu() {
    if (!isModalWindowOpened) {
      openModalWindow();
    }

    setIsHamburgerMenuOpened(!isHamburgerMenuOpened);
  }

  // TODO: при открытии гамбургер-меню и растягивании экрана > 768px
  // модальное окно исчезает, но overflow: scroll не убирается,
  // хук useWindowDimension работает через 1px при растягивании
  useEffect(() => {
    const body = document.body;

    body.classList.contains("page_no-scroll")
      ? body.classList.remove("page_no-scroll")
      : body.classList.add("page_no-scroll");
  }, [isModalWindowOpened]);

  const closeModalWindow = useCallback(() => {
    setIsModalWindowOpened(false);
  }, []);

  const closeHamburgerMenu = useCallback(() => {
    setIsHamburgerMenuOpened(false);
  }, []);

  function closeHamburgerMenuOnOutsideAndNavClick({ target }) {
    const checkSelector = (selector) => target.classList.contains(selector);

    if (checkSelector("modal-window_opened") || checkSelector("link")) {
      closeHamburgerMenu();
    }
  }

  const searchMovie = (data) => setIsSearchFormNotEmpty(data ? true : false);

  // API
  // TODO: перемешивать фотографии рандомно
  useEffect(() => {
    if (!isSearchFormNotEmpty) return;

    getMovies()
      .then((movies) => setMovies(movies))
      .catch((err) =>
        console.log(`Ошибка в процессе получения карточек с сервера: ${err}`)
      );
  }, [isSearchFormNotEmpty]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header
            toggleHamburgerMenu={toggleHamburgerMenu}
            isModalWindowOpened={isModalWindowOpened}
            isHamburgerMenuOpened={isHamburgerMenuOpened}
            closeModalWindow={closeModalWindow}
            closeHamburgerMenuOnOutsideAndNavClick={
              closeHamburgerMenuOnOutsideAndNavClick
            }
          />
        }
      >
        <Route index element={<Main />} />
        <Route
          path="/movies"
          element={<Movies movies={movies} onSearch={searchMovie} />}
        />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
