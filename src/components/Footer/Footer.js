import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">
        <h2>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__wrapper">
          <span>&copy; {new Date().getFullYear()}</span>
          <div className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              rel="noreferrer"
              target="_blank"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/elrouss"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
