// URLS
export const BASE_URL = "https://api.elrouss.movies.nomoredomains.monster";
export const BASE_URL_LOCAL = "http://localhost:3001";
export const BEATFILM_MOVIES_URL =
  "https://api.nomoreparties.co/beatfilm-movies";

// PATTERNS
// These patterns are used for HTML5 built-in validation, which seems to have its own syntax specification.
// It doesn't accept slashes and should look like a string.
// E.x., to put a dot you should use character sets and ranges (\. - this won't work,
// and this - [.] or \\. - will be okay).
// It looks like that HTML5 validation doesn't have a high-security: user can delete pattern in DOM with DevTools,
// but for this project it will be okay
export const EMAIL_PATTERN =
  "[A-z0-9!#$%&'*+-/=?^_`{|]{1,64}@[A-z0-9-.]{2,253}\\.[A-z]{2,63}";
export const PASSWORD_PATTERN =
  "(?=.*[A-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,}).*";
export const USERNAME_PATTERN = "[A-я-\\s]{2,30}";

// MEDIA QUERIES (SEE ALSO VARIABLES IN SCSS)
export const LAPTOP_SCREEN_WIDTH = 1024;
export const MOBILE_SCREEN_WIDTH = 480;
