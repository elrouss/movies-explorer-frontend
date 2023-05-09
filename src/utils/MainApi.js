import { BASE_URL_LOCAL } from "./constants";

// User
export function registerUser(email, password, name) {
  return fetch(`${BASE_URL_LOCAL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });
}

export function authorizeUser(email, password) {
  return fetch(`${BASE_URL_LOCAL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getContent(token) {
  return fetch(`${BASE_URL_LOCAL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

export function setUserInfo(email, name) {
  return fetch(`${BASE_URL_LOCAL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ email, name }),
  });
}

// Movies
export function getSavedMovies(id) {
  return fetch(`${BASE_URL_LOCAL}/movies${id}`, {
    headers: {
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

export function handleMovie(movie) {
  const {
    id,
    country,
    director,
    duration,
    year,
    description,
    trailerLink,
    nameRU,
    nameEN,
  } = movie;

  const movieId = id;
  let { image } = movie;
  let thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;
  image = `https://api.nomoreparties.co${image.url}`;

  return fetch(`${BASE_URL_LOCAL}/movies`, {
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

  // if (isLiked) {
  //   return this._request(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   });
  // } else {
  //   return this._request(`${this._baseUrl}/cards/${id}/likes`, {
  //     method: "POST",
  //     headers: this._headers,
  //   });
  // }
}
