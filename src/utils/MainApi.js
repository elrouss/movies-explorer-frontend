import { BASE_URL_LOCAL } from "./constants";

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
