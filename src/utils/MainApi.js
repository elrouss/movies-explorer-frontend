import {
  URL_BASE,
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_USERS_CURRENT,
  ENDPOINT_MOVIES,
} from "./constants";

// User
export function registerUser(email, password, name) {
  return fetch(`${URL_BASE}${ENDPOINT_SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function authorizeUser(email, password) {
  return fetch(`${URL_BASE}${ENDPOINT_SIGNIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getUserInfo(token) {
  return fetch(`${URL_BASE}${ENDPOINT_USERS_CURRENT}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

export function setUserInfo(email, name) {
  return fetch(`${URL_BASE}${ENDPOINT_USERS_CURRENT}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ email, name }),
  });
}

// Movies
export function getSavedMovies() {
  return fetch(`${URL_BASE}${ENDPOINT_MOVIES}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }
  });
}

export function handleMovieServer(movie) {
  const selected = movie?.selected;

  if (selected) {
    const {
      id: movieId,
      country,
      director,
      duration,
      year,
      description,
      trailerLink,
      nameRU,
      nameEN,
    } = movie;

    let { image } = movie;
    let thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
    image = `https://api.nomoreparties.co${image.url}`;

    return fetch(`${URL_BASE}${ENDPOINT_MOVIES}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    });
  } else {
    return fetch(
      `${URL_BASE}${ENDPOINT_MOVIES}/${movie.dbId || movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
  }
}
