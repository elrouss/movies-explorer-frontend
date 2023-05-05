import React from "react";
import PropTypes from "prop-types";

function Input({
  label,
  htmlFor,
  id,
  name,
  type,
  minLength,
  maxLength,
  autoComplete,
  onChange,
}) {
  return (
    <>
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className="input"
        id={id}
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required
        onChange={onChange}
      />
    </>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;
