import { BEATFILM_MOVIES_URL } from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export function getMovies() {
  return fetch(BEATFILM_MOVIES_URL)
  .then((res) => checkResponse(res))
}
