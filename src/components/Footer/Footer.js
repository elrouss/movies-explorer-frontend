import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const pathSavedMovies = location.pathname === "/saved-movies";

  return (
    <footer className="footer">
      <div
        className={`wrapper footer__wrapper${
          (pathSavedMovies && " footer__wrapper_padding_xl") || ""
        }`}
      >
        <h2 className="footer__heading">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <span className="footer__copyright">
          &copy; {new Date().getFullYear()}
        </span>
        <div className="footer__links">
          <a
            className="link footer__link"
            href="https://practicum.yandex.ru/"
            rel="noreferrer"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
          <a
            className="link footer__link"
            href="https://github.com/elrouss"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
