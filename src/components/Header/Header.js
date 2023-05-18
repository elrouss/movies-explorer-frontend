import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import Logo from "../Logo/Logo.js";
import Navigation from "../Navigation/Navigation.js";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu.js";

import {
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  TABLET_SCREEN_WIDTH,
} from "../../utils/constants.js";

function Header({ isCurrentUserLoggedIn }) {
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  function openModalWindow() {
    setIsModalWindowOpened(true);
  }

  function toggleHamburgerMenu() {
    if (!isModalWindowOpened) {
      openModalWindow();
    }

    setIsHamburgerMenuOpened(!isHamburgerMenuOpened);
  }

  const isMobileWidth = useWindowDimensions() <= TABLET_SCREEN_WIDTH;

  function renderHeaderMenu() {
    if (isMobileWidth && isCurrentUserLoggedIn) {
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

    if (!isCurrentUserLoggedIn) {
      return (
        <div className="header__auth">
          <Link className="link" to={ENDPOINT_SIGNUP}>
            Регистрация
          </Link>
          <Link
            className="link link_color_accent btn-auth"
            to={ENDPOINT_SIGNIN}
          >
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
          setIsModalWindowOpened={setIsModalWindowOpened}
          isHamburgerMenuOpened={isHamburgerMenuOpened}
          setIsHamburgerMenuOpened={setIsHamburgerMenuOpened}
        />
      )}
    </>
  );
}

Header.propTypes = {
  isCurrentUserLoggedIn: PropTypes.bool,
};

export default Header;
