// URLS
export const URL_BASE = "https://api.elrouss.movies.nomoredomains.monster";
export const URL_BASE_LOCAL = "http://localhost:3001";
export const URL_BEATFILM_MOVIES =
  "https://api.nomoreparties.co/beatfilm-movies";

// ENDPOINTS
export const ENDPOINT_ROOT = "/";
export const ENDPOINT_SIGNUP = "/signup"; // + backend
export const ENDPOINT_SIGNIN = "/signin"; // + backend
export const ENDPOINT_MOVIES = "/movies"; // + backend
export const ENDPOINT_SAVED_MOVIES = "/saved-movies";
export const ENDPOINT_PROFILE = "/profile";
export const ENDPOINT_USERS_CURRENT = "/users/me" // backend
export const ENDPOINT_ASTERISK = "*";

// PATTERNS
// These patterns are used for HTML5 built-in validation, which seems to have its own syntax specification.
// It doesn't accept slashes and should look like a string.
// E.x., to put a dot you should use character sets and ranges (\. - this won't work,
// and this - [.] or \\. - will be okay).
// It looks like that HTML5 validation doesn't have a high-security: user can delete pattern in DOM with DevTools,
// but for this project it will be okay
export const PATTERN_EMAIL =
  "[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}";
export const PATTERN_PASSWORD =
  "(?=.*[A-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,}).*";
export const PATTERN_USERNAME = "[A-я-\\s]{2,30}";

// MEDIA QUERIES IN PIXELS (SEE ALSO VARIABLES IN SCSS)
export const LAPTOP_SCREEN_WIDTH = 1024;
export const TABLET_SCREEN_WIDTH = 768;
export const MOBILE_SCREEN_WIDTH = 480;

// MOVIES
export const SHORT_FILM_DURATION = 40; // minutes

export const NUM_CARDS_DESKTOP_INIT = 12;
export const NUM_CARDS_TABLET_INIT = 8;
export const NUM_CARDS_MOBILE_INIT = 5;

export const NUM_CARDS_DESKTOP_ADD = 3;
export const NUM_CARDS_TABLET_ADD = 2;
export const NUM_CARDS_MOBILE_ADD = 2;
