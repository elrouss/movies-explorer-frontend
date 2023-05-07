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
  pattern,
  errorCondition,
  errorMessage,
}) {
  return (
    <div className="wrapper-input">
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
        pattern={pattern}
      />
      <span className={`error${(errorCondition && " error_visible") || ""}`}>
        {errorMessage}
      </span>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  htmlFor: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  errorCondition: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default Input;
