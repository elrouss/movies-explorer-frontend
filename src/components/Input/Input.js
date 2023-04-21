import React from "react";
import PropTypes from "prop-types";

function Input({ label, htmlFor, id, type, minLength, maxLength, autoComplete }) {
  return (
    <>
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className="input"
        id={id}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required
      />
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;
