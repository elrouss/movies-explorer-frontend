import React from "react";
import { Link, useMatch } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";

  const windowWidth = useWindowDimensions();

  function renderHeaderMenu() {
    if (!isRootHref && windowWidth <= 768) {
      return (
        <button
          className="btn hamburger"
          type="button"
          aria-label="Гамбургер-меню с навигацией по приложению"
        >
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
          <span className="hamburger__line"></span>
        </button>
      );
    }

    if (isRootHref) {
      return (
        <div className="header__auth">
          <Link className="link" to={"/signup"}>
            Регистрация
          </Link>
          <Link className="link link_color_accent btn-auth" to={"/signin"}>
            Войти
          </Link>
        </div>
      );
    }

    return <Navigation />;
  }

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Logo />
        {renderHeaderMenu()}
      </div>
    </header>
  );
}

export default Header;
