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

export default function App() {
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  function openHamburgerMenu() {
    setIsHamburgerMenuOpened(!isHamburgerMenuOpened);
  }

  // TODO: при открытии гамбургер-меню и растягивании экрана > 768px
  // модальное окно исчезает, но overflow: scroll не убирается
  // хук useWindowDimension работает через 1px при растягивании
  useEffect(() => {
    const body = document.body;

    body.classList.contains("page_no-scroll")
      ? body.classList.remove("page_no-scroll")
      : body.classList.add("page_no-scroll");
  }, [openHamburgerMenu]);

  const closeModalWindow = useCallback(() => {
    setIsHamburgerMenuOpened(false);
  }, []);

  function closeModalWindowOnOutsideClick({ target }) {
    const checkSelector = (selector) => target.classList.contains(selector);

    if (checkSelector("modal-window_opened") || checkSelector("link")) {
      closeModalWindow();
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Header
            openHamburgerMenu={openHamburgerMenu}
            isModalWindowOpened={isHamburgerMenuOpened}
            onCloseModalWindow={closeModalWindowOnOutsideClick}
          />
        }
      >
        <Route index element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
