import React from "react";
import { useMatch } from "react-router-dom";

import Promo from "../Promo/Promo.js";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";

import Movies from "../Movies/Movies.js";

export default function Main() {
  // TODO: ОТРИСОВЫВАТЬ В ЗАВИСИМОСТИ ОТ СТЕЙТА АВТОРИЗАЦИИ. ПОКА КОСТЫЛЬНОЕ РЕШЕНИЕ
  //  Не отрисовывается main на странице с поиском
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isMoviesHref = href.pathname.endsWith("/movies");

  return (
    <main>
      {!isMoviesHref ? (
        <>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
        </>
      ) : (
        <Movies />
      )}
    </main>
  );
}
