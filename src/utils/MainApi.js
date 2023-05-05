import { BASE_URL_LOCAL } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
  }
}

export function registerUser(email, password, name) {
  return fetch(`${BASE_URL_LOCAL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));
}
