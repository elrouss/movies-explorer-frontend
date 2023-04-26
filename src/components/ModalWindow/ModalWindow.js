import React from "react";
import PropTypes from "prop-types";

function ModalWindow({
  children,
  isModalWindowOpened,
  isHamburgerMenuOpened,
  closeModalWindow,
  closeHamburgerMenuOnOutsideAndNavClick,
}) {
  return (
    <div
      className={`modal-window${
        (isModalWindowOpened && " modal-window_opened") || ""
      }${(isHamburgerMenuOpened && " modal-window_bg-color_dark") || ""}`}
      onClick={closeHamburgerMenuOnOutsideAndNavClick}
      onTransitionEnd={({ propertyName, target }) => {
        if (
          propertyName === "transform" &&
          !target.classList.contains("hamburger-menu_opened")
        ) {
          closeModalWindow();
        }
      }}
    >
      {children}
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.element,
  isModalWindowOpened: PropTypes.bool,
  isHamburgerMenuOpened: PropTypes.bool,
  closeModalWindow: PropTypes.func,
  closeHamburgerMenuOnOutsideAndNavClick: PropTypes.func,
};

export default ModalWindow;
