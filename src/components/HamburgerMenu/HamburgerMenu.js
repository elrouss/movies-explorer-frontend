import React from "react";
import PropTypes from "prop-types";

import ModalWindow from "../ModalWindow/ModalWindow.js";
import Navigation from "../Navigation/Navigation.js";

function HamburgerMenu({
  isModalWindowOpened,
  isHamburgerMenuOpened,
  closeModalWindow,
  closeHamburgerMenuOnOutsideAndNavClick,
}) {
  return (
    <ModalWindow
      isModalWindowOpened={isModalWindowOpened}
      isHamburgerMenuOpened={isHamburgerMenuOpened}
      closeModalWindow={closeModalWindow}
      closeHamburgerMenuOnOutsideAndNavClick={
        closeHamburgerMenuOnOutsideAndNavClick
      }
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
  isModalWindowOpened: PropTypes.bool,
  isHamburgerMenuOpened: PropTypes.bool,
  closeModalWindow: PropTypes.func,
  closeHamburgerMenuOnOutsideAndNavClick: PropTypes.func,
};

export default HamburgerMenu;
