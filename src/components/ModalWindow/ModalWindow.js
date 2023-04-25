import React from "react";
import PropTypes from "prop-types";

function ModalWindow({ children, isModalWindowOpened, onCloseModalWindow }) {
  return (
    <div
      className={`modal-window ${isModalWindowOpened && "modal-window_opened"}`}
      onClick={onCloseModalWindow}
    >
      {children}
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.element,
  isModalWindowOpened: PropTypes.bool,
  onCloseModalWindow: PropTypes.func,
};

export default ModalWindow;
