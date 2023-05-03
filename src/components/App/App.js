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
  const [searchFormValue, setSearchFormValue] = useState("");

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

  function searchMovie(data) {
    setSearchFormValue(data);
  }

  // API
  useEffect(() => {
    if (!searchFormValue) return;

    getMovies()
      .then((movies) => {
        const data = movies.filter(({ nameRU, nameEN }) => {
          const isCompliedWithSearchRequest = (data) =>
            data.toLowerCase().replace(/\s/g, "").includes(searchFormValue);

          return (
            isCompliedWithSearchRequest(nameRU) ||
            isCompliedWithSearchRequest(nameEN)
          );
        });

        // Fisher–Yates shuffle
        for (let i = 0; i < data.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));

          [data[i], data[j]] = [data[j], data[i]];
        }

        setMovies(data);
      })
      .catch((err) =>
        console.log(
          `Ошибка в процессе получения и сохранения карточек с сервера: ${err}`
        )
      );
  }, [searchFormValue]);

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
