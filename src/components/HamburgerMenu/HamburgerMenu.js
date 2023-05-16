import React from "react";
import PropTypes from "prop-types";

import ModalWindow from "../ModalWindow/ModalWindow.js";
import Navigation from "../Navigation/Navigation.js";

function HamburgerMenu({
  setIsModalWindowOpened,
  isModalWindowOpened,
  isHamburgerMenuOpened,
  setIsHamburgerMenuOpened,
}) {
  return (
    <ModalWindow
      setIsModalWindowOpened={setIsModalWindowOpened}
      isModalWindowOpened={isModalWindowOpened}
      setIsHamburgerMenuOpened={setIsHamburgerMenuOpened}
    >
      <div
        className={`hamburger-menu${
          (isHamburgerMenuOpened && " hamburger-menu_opened") || ""
        }`}
      >
        <div className="hamburger-menu__wrapper">
          <Navigation />
        </div>
      </div>
    </ModalWindow>
  );
}

HamburgerMenu.propTypes = {
  setIsModalWindowOpened: PropTypes.func,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerMenuOpened: PropTypes.bool,
  setIsHamburgerMenuOpened: PropTypes.func,
};

export default HamburgerMenu;
