import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import Header from "../Header/Header.js";

import Main from "../Main/Main.js";

import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

import { registerUser } from "../../utils/MainApi.js";
import { getMovies } from "../../utils/MoviesApi.js";

// import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function App() {
  // TODO: проверить правильно подключения контекста
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    name: "",
    isLoggedIn: true,
  });

  const [movies, setMovies] = useState([]);

  const [searchFormValue, setSearchFormValue] = useState("");
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [isUserSearching, setisUserSearching] = useState(false);
  const [isSearchRequestInProgress, setIsSearchRequestInProgress] =
    useState(false);

  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    registrationResponse: "",
    moviesResponse: "",
  });

  const navigate = useNavigate();

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

  function toggleFilterCheckbox({ target: { checked } }) {
    setIsFilterCheckboxChecked(checked);
  }

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies")) || []);
    setSearchFormValue("" || localStorage.getItem("searchRequest"));
    setIsFilterCheckboxChecked(
      false || JSON.parse(localStorage.getItem("isFilterCheckboxChecked"))
    );
  }, []);

  // API
  // Users' registration
  function handleUserRegistration({ email, password, name }) {
    setIsProcessLoading(true);

    registerUser(email, password, name)
      .then((res) => {
        if (res.ok) {
          navigate("/movies");
          setErrorMessages({ registrationResponse: "" });
        } else {
          setErrorMessages({
            registrationResponse:
              res.status === 500
                ? "На сервере произошла ошибка"
                : res.status === 409
                ? "Пользователь с таким email уже существует"
                : "При регистрации пользователя произошла ошибка",
          });
        }
      })
      .catch((err) => {
        console.log(
          `Ошибка в процессе регистрации пользователя на сайте: ${err}`
        );
      })
      .finally(() => {
        setIsProcessLoading(false);
      });
  }

  // Sending search request to get cards with movies
  useEffect(() => {
    if (!isSearchRequestInProgress) return;

    setIsProcessLoading(true);

    getMovies()
      .then((movies) => {
        const data = movies.filter(({ nameRU }) => {
          const isCompliedWithSearchRequest = (data) =>
            data
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(
                searchFormValue.toLowerCase().trim().replace(/\s/g, "")
              );

          return isCompliedWithSearchRequest(nameRU);
        });

        // Fisher–Yates shuffle
        for (let i = 0; i < data.length; i++) {
          let j = Math.floor(Math.random() * (i + 1));

          [data[i], data[j]] = [data[j], data[i]];
        }

        setisUserSearching(true);
        setMovies(data);

        localStorage.setItem("searchRequest", searchFormValue || "");
        localStorage.setItem(
          "isFilterCheckboxChecked",
          JSON.stringify(isFilterCheckboxChecked)
        );
        localStorage.setItem(
          "movies",
          data.length ? JSON.stringify(data) : null
        );
      })
      .catch(() =>
        setErrorMessages({
          moviesResponse: `Во время запроса произошла ошибка.
            Возможно, проблема с соединением или сервер недоступен.
            Подождите немного и попробуйте ещё раз`,
        })
      )
      .finally(() => {
        setIsProcessLoading(false);
        setIsSearchRequestInProgress(false);
      });
  }, [isSearchRequestInProgress]);

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
        {/* <CurrentUserContext.Provider value={currentUser}> */}
        <Route index element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute isUserLoggedIn={currentUser.isLoggedIn}>
              <Movies
                movies={movies}
                onSearch={searchMovie}
                searchFormValue={searchFormValue}
                setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                isUserSearching={isUserSearching}
                onFilter={toggleFilterCheckbox}
                isFilterCheckboxChecked={isFilterCheckboxChecked}
                onLoad={isProcessLoading}
                error={errorMessages}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute isUserLoggedIn={currentUser.isLoggedIn}>
              <SavedMovies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isUserLoggedIn={currentUser.isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* </CurrentUserContext.Provider> */}
      </Route>

      <Route
        path="/signup"
        element={
          <Register
            onRegistration={handleUserRegistration}
            onLoad={isProcessLoading}
            error={errorMessages}
          />
        }
      />
      <Route path="/signin" element={<Login />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
