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
