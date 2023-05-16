import {
  BASE_URL_LOCAL,
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_USERS_CURRENT,
  ENDPOINT_MOVIES,
} from "./constants";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
};

// User
export function registerUser(email, password, name) {
  return fetch(`${BASE_URL_LOCAL}${ENDPOINT_SIGNUP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function authorizeUser(email, password) {
  return fetch(`${BASE_URL_LOCAL}${ENDPOINT_SIGNIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL_LOCAL}${ENDPOINT_USERS_CURRENT}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

export function setUserInfo(email, name) {
  return fetch(`${BASE_URL_LOCAL}${ENDPOINT_USERS_CURRENT}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({ email, name }),
  });
}

// Movies
export function getSavedMovies() {
  return fetch(`${BASE_URL_LOCAL}${ENDPOINT_MOVIES}`, {
    headers: headers,
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

    return fetch(`${BASE_URL_LOCAL}${ENDPOINT_MOVIES}`, {
      method: "POST",
      headers: headers,
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
      `${BASE_URL_LOCAL}${ENDPOINT_MOVIES}/${movie.dbId || movie._id}`,
      {
        method: "DELETE",
        headers: headers,
      }
    );
  }
}
