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
import { getUserInfo } from "../../utils/MainApi.js";
import { setUserInfo } from "../../utils/MainApi.js";

import { getMovies } from "../../utils/MoviesApi.js";
import { getSavedMovies } from "../../utils/MainApi.js";
import { handleMovieServer } from "../../utils/MainApi.js";

import {
  VALIDATION_MESSAGES,
  showDefaultError,
} from "../../utils/validation.js";

import {
  ENDPOINT_ROOT,
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_MOVIES,
  ENDPOINT_SAVED_MOVIES,
  ENDPOINT_PROFILE,
  ENDPOINT_ASTERISK,
  SHORT_FILM_DURATION,
} from "../../utils/constants.js";

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(false);

  const [isProcessLoading, setIsProcessLoading] = useState(false);
  const [successMessages, setSuccessMessages] = useState("");
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
  const [isBtnSaveVisible, setIsBtnSaveVisible] = useState(false);

  const [allMovies, setAllMovies] = useState([]);
  const [filteredAllMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [searchFormValue, setSearchFormValue] = useState("");
  const [searchFormValueSavedMovies, setSearchFormValueSavedMovies] =
    useState("");
  const [isFilterCheckboxMoviesChecked, setIsFilterCheckboxMoviesChecked] =
    useState(false);
  const [
    isFilterCheckboxSavedMoviesChecked,
    setIsFilterCheckboxSavedMoviesChecked,
  ] = useState(false);
  const [isSearchRequestInProgress, setIsSearchRequestInProgress] =
    useState(false);
  const [hasUserSearched, setHasUserSearched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const pathMovies = location.pathname === ENDPOINT_MOVIES;
  const pathSavedMovies = location.pathname === ENDPOINT_SAVED_MOVIES;

  function searchMovie(data) {
    if (pathMovies) setSearchFormValue(data);
    if (pathSavedMovies) setSearchFormValueSavedMovies(data);
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
    if (!isCurrentUserLoggedIn) return;

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

    setIsFilterCheckboxMoviesChecked(
      false || JSON.parse(getLocalStorageData("isFilterCheckboxChecked"))
    );

    loadSavedMoviesFromServer();
  }, [isCurrentUserLoggedIn]);

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
      .finally(() => setIsProcessLoading(false));
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
          handleLoginOn();
          navigate(ENDPOINT_MOVIES, { replace: true });

          getUserInfo(token)
            .then(({ _id, email, name }) =>
              setCurrentUser({ _id, email, name })
            )
            .catch((err) => {
              console.log(
                `Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`
              );
            });
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
      getUserInfo(jwt)
        .then(({ _id, email, name }) => {
          setCurrentUser({ _id, email, name });
          handleLoginOn();
          navigate(
            localStorage.getItem("current-endpoint")
              ? localStorage.getItem("current-endpoint")
              : ENDPOINT_MOVIES,
            {
              replace: true,
            }
          );
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

  useEffect(() => {
    if (!isCurrentUserLoggedIn) return;

    localStorage.setItem("current-endpoint", location.pathname);
  }, [navigate]);

  function updateUserInfo({ email, name }) {
    if (email === currentUser.email && name === currentUser.name) {
      return;
    } else {
      setIsProcessLoading(true);

      setUserInfo(email, name)
        .then((res) => {
          if (res.ok) {
            setErrorMessages({ updatingUserInfoResponse: "" });
            setIsBtnSaveVisible(false);
            setSuccessMessages({
              updatingUserInfoResponse: "Данные профиля успешно обновлены",
            });
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
        .finally(() => setIsProcessLoading(false));
    }
  }

  // Sending search request to get cards with movies
  useEffect(() => {
    if (!isSearchRequestInProgress || allMovies.length) return;

    setIsProcessLoading(true);

    getMovies()
      .then((movies) => {
        const synchronizeDataWithServer = (data) => {
          const ids = [];

          for (let savedMovie of savedMovies) {
            ids.push(savedMovie.movieId);
          }

          for (let movie of data) {
            if (ids.includes(movie.id)) {
              movie.dbId = data._id;
              movie.selected = true;
            }
          }

          return data;
        };

        setAllMovies(synchronizeDataWithServer(movies));
        filterMovies(synchronizeDataWithServer(movies));
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
      JSON.stringify(isFilterCheckboxMoviesChecked || false)
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
    const movies =
      pathMovies && allMovies.length
        ? allMovies
        : pathSavedMovies && savedMovies.length
        ? savedMovies
        : serverData;

    if (!movies?.length) return;

    const isNameCompliedWithSearchRequest = (name) => {
      const value = pathMovies ? searchFormValue : searchFormValueSavedMovies;

      return name
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(value.toLowerCase().trim().replace(/\s/g, ""));
    };

    const isDurationCompliedWithSearchRequest = (time) =>
      time <= SHORT_FILM_DURATION;

    const data = movies.filter(({ nameRU, duration }) => {
      if (pathMovies) {
        if (isFilterCheckboxMoviesChecked) {
          return (
            isNameCompliedWithSearchRequest(nameRU) &&
            isDurationCompliedWithSearchRequest(duration)
          );
        }

        return isNameCompliedWithSearchRequest(nameRU);
      }

      if (pathSavedMovies) {
        if (isFilterCheckboxSavedMoviesChecked) {
          return (
            isNameCompliedWithSearchRequest(nameRU) &&
            isDurationCompliedWithSearchRequest(duration)
          );
        }
      }

      return isNameCompliedWithSearchRequest(nameRU);
    });

    // Fisher–Yates shuffle
    if (pathMovies) {
      for (let i = 0; i < data.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));

        [data[i], data[j]] = [data[j], data[i]];
      }
    }

    if (pathMovies) {
      setFilteredMovies(data);
      saveDataInLocalStorage(data, serverData);
    }

    if (pathSavedMovies) {
      setFilteredSavedMovies(data);
    }

    setIsSearchRequestInProgress(false);
    setHasUserSearched(true);
  }

  useEffect(() => {
    if (!allMovies.length) return;

    filterMovies();
  }, [
    isSearchRequestInProgress,
    isFilterCheckboxMoviesChecked,
    isFilterCheckboxSavedMoviesChecked,
  ]);

  function handleMovieSelected({ target }, movie) {
    const btn = target.closest(".movies-card__btn-favourite");

    if (!btn) return;

    if (pathMovies) {
      let source;

      for (let item of allMovies) {
        if (item.id === movie.id) {
          source = item.id;

          if (item.selected) {
            btn.classList.remove("movies-card__btn-favourite_active");
            item.selected = false;

            for (let filteredMovie of filteredAllMovies) {
              if (filteredMovie.id === source) {
                filteredMovie.selected = false;
                break;
              }
            }
          } else {
            btn.classList.add("movies-card__btn-favourite_active");
            item.selected = true;

            for (let filteredMovie of filteredAllMovies) {
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

          const clone = { ...movie };
          clone.selected = false;

          if (message) {
            setSavedMovies((prevMovies) => [...prevMovies, clone]);

            if (movie.duration <= SHORT_FILM_DURATION) {
              setFilteredSavedMovies((prevMovies) => [...prevMovies, clone]);
            }
          } else {
            let key = movie.id;
            for (let i = 0; i < savedMovies.length; i++) {
              if (savedMovies[i].id === key || savedMovies[i].movieId === key) {
                setSavedMovies((movies) => [
                  ...movies.slice(0, i),
                  ...movies.slice(i + 1),
                ]);

                break;
              }
            }

            for (let i = 0; i < filteredSavedMovies.length; i++) {
              if (
                filteredSavedMovies[i].id === key ||
                filteredSavedMovies[i].movieId === key
              ) {
                console.log(filteredSavedMovies[i]);
                setFilteredSavedMovies((movies) => [
                  ...movies.slice(0, i),
                  ...movies.slice(i + 1),
                ]);

                break;
              }
            }
          }
        } else {
          let source;

          for (let item of allMovies) {
            if (item.id === movie.movieId || item.id === movie.id) {
              source = item.id;

              item.dbId = null;
              item.selected = false;

              for (let filteredMovie of filteredAllMovies) {
                if (filteredMovie.id === source) {
                  filteredMovie.dbId = null;
                  filteredMovie.selected = false;
                  break;
                }
              }

              for (let i = 0; i < savedMovies.length; i++) {
                if (
                  savedMovies[i].movieId === source ||
                  savedMovies[i].id === source
                ) {
                  setSavedMovies((movies) => [
                    ...movies.slice(0, i),
                    ...movies.slice(i + 1),
                  ]);

                  break;
                }
              }

              for (let i = 0; i < filteredSavedMovies.length; i++) {
                if (
                  filteredSavedMovies[i].movieId === source ||
                  filteredSavedMovies[i].id === source
                ) {
                  setFilteredSavedMovies((movies) => [
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
        localStorage.setItem(
          "filteredMovies",
          JSON.stringify(filteredAllMovies)
        );
      })
      .catch((err) =>
        console.log(
          `Ошибка в процессе добавления карточки в список избранных либо удаления${err}`
        )
      );
  }

  function loadSavedMoviesFromServer() {
    getSavedMovies()
      .then((data) => setSavedMovies(data))
      .catch((err) => {
        console.log(
          `Ошибка в процессе сохранения карточек в личном кабинет пользователя: ${err}`
        );
      });
  }

  if (isAppLoading) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path={ENDPOINT_ROOT}
          element={<Header isCurrentUserLoggedIn={isCurrentUserLoggedIn} />}
        >
          <Route index element={<Main />} />
          <Route
            path={ENDPOINT_MOVIES}
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <Movies
                  movies={filteredAllMovies}
                  onSearch={searchMovie}
                  searchFormValue={searchFormValue}
                  setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                  hasUserSearched={hasUserSearched}
                  onFilter={setIsFilterCheckboxMoviesChecked}
                  isFilterCheckboxChecked={isFilterCheckboxMoviesChecked}
                  onMovieSelect={handleMovieSelected}
                  onLoad={isProcessLoading}
                  error={errorMessages}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={ENDPOINT_SAVED_MOVIES}
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <SavedMovies
                  movies={
                    isFilterCheckboxSavedMoviesChecked ||
                    searchFormValueSavedMovies
                      ? filteredSavedMovies
                      : savedMovies
                  }
                  onSearch={searchMovie}
                  searchFormValue={searchFormValueSavedMovies}
                  setIsSearchRequestInProgress={setIsSearchRequestInProgress}
                  onMovieSelect={handleMovieSelected}
                  onFilter={setIsFilterCheckboxSavedMoviesChecked}
                  isFilterCheckboxChecked={isFilterCheckboxSavedMoviesChecked}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={ENDPOINT_PROFILE}
            element={
              <ProtectedRoute isUserLoggedIn={isCurrentUserLoggedIn}>
                <Profile
                  setIsCurrentUserLoggedIn={setIsCurrentUserLoggedIn}
                  setCurrentUser={setCurrentUser}
                  onUpdate={updateUserInfo}
                  isBtnSaveVisible={isBtnSaveVisible}
                  setIsBtnSaveVisible={setIsBtnSaveVisible}
                  onLoad={isProcessLoading}
                  onSuccessMessages={successMessages}
                  setSuccessMessages={setSuccessMessages}
                  error={errorMessages}
                  setErrorMessages={setErrorMessages}
                />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path={ENDPOINT_SIGNUP}
          element={
            <Register
              onRegistration={handleUserRegistration}
              onLoad={isProcessLoading}
              error={errorMessages}
            />
          }
        />
        <Route
          path={ENDPOINT_SIGNIN}
          element={
            <Login
              onAuthorization={handleUserAuthorization}
              onLoad={isProcessLoading}
              error={errorMessages}
            />
          }
        />

        <Route path={ENDPOINT_ASTERISK} element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
