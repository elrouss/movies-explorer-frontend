import { URL_BEATFILM_MOVIES } from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export function getMovies() {
  return fetch(URL_BEATFILM_MOVIES)
    .then((res) => checkResponse(res))
}
