import React from "react";
import PropTypes from "prop-types";

import ModalWindow from "../ModalWindow/ModalWindow.js";
import Navigation from "../Navigation/Navigation.js";

function HamburgerMenu({ isModalWindowOpened, onCloseModalWindow }) {
  return (
    <ModalWindow
      isModalWindowOpened={isModalWindowOpened}
      onCloseModalWindow={onCloseModalWindow}
    >
      <div
        className={`hamburger-menu ${
          isModalWindowOpened && "hamburger-menu_opened"
        }`}
      >
        <div className="hamburger-menu__wrapper">
          <Navigation onCloseModalWindow={onCloseModalWindow} />
        </div>
      </div>
    </ModalWindow>
  );
}

HamburgerMenu.propTypes = {
  isModalWindowOpened: PropTypes.bool,
  onCloseModalWindow: PropTypes.func,
};

export default HamburgerMenu;
