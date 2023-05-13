import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import Header from "../Header/Header.js";

import Main from "../Main/Main.js";

import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

import { registerUser } from "../../utils/MainApi.js";
import { authorizeUser } from "../../utils/MainApi.js";
import { getContent } from "../../utils/MainApi.js";
import { setUserInfo } from "../../utils/MainApi.js";

import { getMovies } from "../../utils/MoviesApi.js";
import { getSavedMovies } from "../../utils/MainApi.js";
import { handleMovieServer } from "../../utils/MainApi.js";

import {
  VALIDATION_MESSAGES,
  showDefaultError,
} from "../../utils/validation.js";

export default function App() {
  // При первом запросе в поисковике сохранять все карточки с сервера в стейт movies, добавлять в localStorage и работать с ним +
  // Оставить стейт filteredMovies, который будет находиться в localStorage и отображать текущие отфильтрованные карточки на странице (ключевое слово и длина)
  // При лайке/дизлайке добавлять/удалять дополнительное свойство в массиве "isSelected" и отправлять POST и DEL запросы на сервер +
  // Для DEL нужнен id карточки из БД (отдавать в ответе сервера при POST-запросе и добавлять property вида db: _id) +
  // При переходе на защищенный роут при авторизации (нужно будет, чтобы сверять с получаемым массивом с чужого API) и "Сохраненные" делать GET запрос (useEffect) и сохранять в стейте SavedMovies
  // Если удаляю из savedMovies, то всегда сверяются с массивом movies для корректного отображения лайков и post/del запросов

  // TODO: исправить баг, когда пользователь выходит из ЛК и входит снова (нет перерисовки -> useEffect?)
  const [isAppLoading, setIsAppLoading] = useState(false);

  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    registrationResponse: "",
    authorizationResponse: "",
    updatingUserInfoResponse: "",
    moviesResponse: "",
  });

  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
  });
  const [isCurrentUserLoggedIn, setIsCurrentUserLoggedIn] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // const [savedMoviesLocal, setSavedMoviesLocal] = useState([]);
  const [savedMoviesServer, setSavedMoviesServer] = useState([]);

  const [searchFormValue, setSearchFormValue] = useState("");
  const [isFilterCheckboxChecked, setIsFilterCheckboxChecked] = useState(false);
  const [isSearchRequestInProgress, setIsSearchRequestInProgress] =
    useState(false);
  const [hasUserSearched, setHasUserSearched] = useState(false);

  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathMovies = location.pathname === "/movies";
  const pathSavedMovies = location.pathname === "/saved-movies";

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

  // If user has an error, while signing up/in, and then goes to another page,
  // this effect guarantees that an error above submit button will be cleared out
  useEffect(() => {
    if (!isCurrentUserLoggedIn) {
      setErrorMessages({
        registrationResponse: "",
        authorizationResponse: "",
        moviesResponse: "",
      });
    }
  }, [navigate]);

  useEffect(() => {
    const getLocalStorageData = (key) => localStorage.getItem(key);

    setAllMovies(
      getLocalStorageData("all-movies")
        ? JSON.parse(getLocalStorageData("all-movies"))
        : []
    );

    setFilteredMovies(
      getLocalStorageData("filteredMovies")
        ? JSON.parse(getLocalStorageData("filteredMovies"))
        : []
    );

    setSearchFormValue("" || getLocalStorageData("searchRequest"));

    setIsFilterCheckboxChecked(
      false || JSON.parse(getLocalStorageData("isFilterCheckboxChecked"))
    );
  }, []);

  // useEffect(() => {
  //   if (movies.length) {
  //     for (let movie of movies) {
  //       if (movie.like) {
  //         setSavedMoviesLocal((prevMovies) => [...prevMovies, movie]);
  //       }
  //     }
  //   } else {
  //     return;
  //   }
  // }, [movies]);

  // useEffect(() => {
  //   localStorage.setItem("savedMovies", JSON.stringify(savedMoviesLocal));
  // }, [savedMoviesLocal]);

  // API
  // Users' registration
  function handleUserRegistration({ email, password, name }) {
    setIsProcessLoading(true);

    registerUser(email, password, name)
      .then((res) => {
        if (res.ok) {
          handleUserAuthorization({ email, password });
          setErrorMessages({ registrationResponse: "" });
        } else {
          setErrorMessages({
            registrationResponse:
              res.status === 500
                ? VALIDATION_MESSAGES.backend[500]
                : res.status === 409
                ? VALIDATION_MESSAGES.backend[409]
                : showDefaultError("регистрации пользователя"),
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

  // Users' authorization
  const handleLoginOn = () => setIsCurrentUserLoggedIn(true);

  function handleUserAuthorization({ email, password }) {
    setIsProcessLoading(true);

    authorizeUser(email, password)
      .then((res) => {
        if (res.ok) {
          setErrorMessages({ authorizationResponse: "" });
          return res.json();
        } else {
          setErrorMessages({
            authorizationResponse:
              res.status === 500
                ? VALIDATION_MESSAGES.backend[500]
                : res.status === 401
                ? VALIDATION_MESSAGES.backend[401]
                : showDefaultError("авторизации"),
          });
        }
      })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("jwt", token);
          return token;
        }
      })
      .then((jwt) => {
        if (jwt) {
          handleLoginOn();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        console.log(
          `Ошибка в процессе авторизации пользователя на сайте: ${err}`
        );
      })
      .finally(() => {
        setIsProcessLoading(false);
      });
  }

  // Checking token
  const checkToken = useCallback(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      setIsAppLoading(true);
      getContent(jwt)
        .then(({ _id, email, name }) => {
          setCurrentUser({ _id, email, name });
          handleLoginOn();
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(
            `Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`
          );
        })
        .finally(() => setIsAppLoading(false));
    }
  }, []);

  useEffect(() => checkToken(), []);

  function updateUserInfo({ email, name }) {
    if (email === currentUser.email && name === currentUser.name) {
      return;
    } else {
      setIsProcessLoading(true);

      setUserInfo(email, name)
        .then((res) => {
          if (res.ok) {
            setErrorMessages({ updatingUserInfoResponse: "" });
            return res.json();
          } else {
            setErrorMessages({
              updatingUserInfoResponse:
                res.status === 500
                  ? VALIDATION_MESSAGES.backend[500]
                  : res.status === 409
                  ? VALIDATION_MESSAGES.backend[409]
                  : showDefaultError("обновлении профиля"),
            });
          }
        })
        .then((data) => {
          if (data) setCurrentUser(data);
        })
        .catch((err) => {
          console.log(
            `Ошибка в процессе редактирования данных пользователя: ${err}`
          );
        })
        .finally(() => {
          setIsProcessLoading(false);
        });
    }
  }

  // Sending search request to get cards with movies
  useEffect(() => {
    if (!isSearchRequestInProgress || allMovies.length) return;

    setIsProcessLoading(true);

    getMovies()
      .then((movies) => {
        setAllMovies(movies);
        filterMovies(movies);
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

  function saveDataInLocalStorage(data, serverData) {
    localStorage.setItem("searchRequest", searchFormValue || "");

    localStorage.setItem(
      "isFilterCheckboxChecked",
      JSON.stringify(isFilterCheckboxChecked || false)
    );

    localStorage.setItem(
      "all-movies",
      serverData || allMovies.length
        ? JSON.stringify(serverData) || JSON.stringify(allMovies)
        : []
    );

    localStorage.setItem(
      "filteredMovies",
      data.length ? JSON.stringify(data) : []
    );
  }

  function filterMovies(serverData) {
    const movies = allMovies.length ? allMovies : serverData;

    const data = movies.filter(({ nameRU }) => {
      const isCompliedWithSearchRequest = (data) =>
        data
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(searchFormValue.toLowerCase().trim().replace(/\s/g, ""));

      return isCompliedWithSearchRequest(nameRU);
    });

    // Fisher–Yates shuffle
    for (let i = 0; i < data.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));

      [data[i], data[j]] = [data[j], data[i]];
    }

    setHasUserSearched(true);
    setFilteredMovies(data);
    setIsSearchRequestInProgress(false);

    return saveDataInLocalStorage(data, serverData);
  }

  useEffect(() => {
    if (!isSearchRequestInProgress || !allMovies.length) return;

    filterMovies();
  }, [isSearchRequestInProgress]);

  // Showing saved movies
  // useEffect(() => {
  //   getSavedMovies()
  //     .then((movies) => setSavedMoviesServer(movies))
  //     .catch((err) => {
  //       console.log(
  //         `Ошибка в процессе загрузки фильмов, сохраненных пользователем: ${err}`
  //       );
  //     });
  // }, []);

  // useEffect(() => {

  // }, [isSearchRequestInProgress])

  function handleMovieSelected({ target }, movie) {
    const btn = target.closest(".movies-card__btn-favourite");

    if (!btn) return;

    if (pathMovies) {
      let source;

      for (let item of allMovies) {
        if (item.id === movie.id) {
          source = item.id;

          if (item.selected) {
            // const index = savedMoviesLocal.indexOf(item);

            btn.classList.remove("movies-card__btn-favourite_active");
            item.selected = false;

            for (let filteredMovie of filteredMovies) {
              if (filteredMovie.id === source) {
                filteredMovie.selected = false;
                break;
              }
            }

            // setSavedMoviesLocal((movies) => movies.filter((_, i) => i !== index));
          } else {
            btn.classList.add("movies-card__btn-favourite_active");
            item.selected = true;

            // setSavedMoviesLocal((prevMovies) => [...prevMovies, item]);

            for (let filteredMovie of filteredMovies) {
              if (filteredMovie.id === source) {
                filteredMovie.selected = true;
                break;
              }
            }
          }

          break;
        }
      }
    }

    handleMovieServer(movie)
      .then((res) => res.json())
      .then(({ message }) => {
        if (pathMovies) {
          movie.dbId = message;
        } else {
          let source;

          for (let item of allMovies) {
            if (item.id === movie.movieId) {
              source = item.id;

              // btn.classList.remove("movies-card__btn-favourite_active");
              item.dbId = null;
              item.selected = false;

              for (let filteredMovie of filteredMovies) {
                if (filteredMovie.id === source) {
                  filteredMovie.dbId = null;
                  filteredMovie.selected = false;
                  break;
                }
              }

              for (let i = 0; i < savedMoviesServer.length; i++) {
                if (savedMoviesServer[i].movieId === source) {
                  setSavedMoviesServer((movies) => [
                    ...movies.slice(0, i),
                    ...movies.slice(i + 1),
                  ]);

                  break;
                }
              }

              break;
            }
          }
        }

        localStorage.setItem("all-movies", JSON.stringify(allMovies));
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      })
      .catch((err) =>
        console.log(
          `Ошибка в процессе добавления карточки в список избранных либо удаления${err}`
        )
      );
  }

  useEffect(() => {
    if (!pathSavedMovies) return;

    setIsProcessLoading(true);

    getSavedMovies()
      .then((data) => setSavedMoviesServer(data))
      .catch((err) => {
        console.log(
          `Ошибка в процессе сохранения карточек в личном кабинет пользователя: ${err}`
        );
      })
      .finally(() => setIsProcessLoading(false));
  }, [pathSavedMovies]);

  if (isAppLoading) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Header
              isCurrentUserLoggedIn={isCurrentUserLoggedIn}
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
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <Movies
                  movies={filteredMovies}
                  onSearch={searchMovie}
                  searchFormValue={searchFormValue}
                  setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                  hasUserSearched={hasUserSearched}
                  onFilter={toggleFilterCheckbox}
                  isFilterCheckboxChecked={isFilterCheckboxChecked}
                  onMovieSelect={handleMovieSelected}
                  onLoad={isProcessLoading}
                  error={errorMessages}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <SavedMovies
                  movies={savedMoviesServer}
                  onMovieSelect={handleMovieSelected}
                  onLoad={isProcessLoading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <Profile
                  setIsCurrentUserLoggedIn={setIsCurrentUserLoggedIn}
                  onUpdate={updateUserInfo}
                  onLoad={isProcessLoading}
                  error={errorMessages}
                />
              </ProtectedRoute>
            }
          />
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
        <Route
          path="/signin"
          element={
            <Login
              onAuthorization={handleUserAuthorization}
              onLoad={isProcessLoading}
              error={errorMessages}
            />
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
