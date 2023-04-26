import React from "react";
import { Outlet, Link, useMatch } from "react-router-dom";
import PropTypes from "prop-types";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";

function Header({
  toggleHamburgerMenu,
  isModalWindowOpened,
  isHamburgerMenuOpened,
  closeModalWindow,
  closeHamburgerMenuOnOutsideAndNavClick,
}) {
  // ВРЕМЕННОЕ РЕШЕНИЕ ДЛЯ СТАТИЧНОЙ ВЕРСТКИ (НА 3-М ЭТАПЕ ПЕРЕДЕЛАТЬ ПОД АВТОРИЗАЦИЮ)
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";

  const isMobileWidth = useWindowDimensions() <= 768;

  function renderHeaderMenu() {
    if (!isRootHref && isMobileWidth) {
      return (
        <button
          className={`btn hamburger${
            (isHamburgerMenuOpened && " hamburger_clicked") || ""
          }`}
          type="button"
          aria-label="Гамбургер-меню с навигацией по приложению"
          onClick={() => toggleHamburgerMenu()}
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
    <>
      <header className="header">
        <div className="wrapper header__wrapper">
          <Logo />
          {renderHeaderMenu()}
        </div>
      </header>
      <Outlet />
      {isMobileWidth && (
        <HamburgerMenu
          isModalWindowOpened={isModalWindowOpened}
          isHamburgerMenuOpened={isHamburgerMenuOpened}
          closeModalWindow={closeModalWindow}
          closeHamburgerMenuOnOutsideAndNavClick={
            closeHamburgerMenuOnOutsideAndNavClick
          }
        />
      )}
    </>
  );
}

Header.propTypes = {
  toggleHamburgerMenu: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerMenuOpened: PropTypes.bool,
  closeModalWindow: PropTypes.func,
  closeHamburgerMenuOnOutsideAndNavClick: PropTypes.func,
};

export default Header;
