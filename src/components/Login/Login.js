import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Entry from "../Entry/Entry.js";
import Input from "../Input/Input.js";

import useFormWithValidation from "../../hooks/useFormWithValidation.js";

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../utils/constants.js";
import { VALIDATION_MESSAGES } from "../../utils/validation.js";

function Login({ onAuthorization, onLoad, error }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = values;

    onAuthorization({
      email: email.trim().replace(/\s/g, ""),
      password,
    });
  }

  return (
    <Entry
      heading={"Рады видеть!"}
      name={"login"}
      btn={"Войти"}
      btnAriaLabel={"Авторизация на сайте"}
      onSubmit={handleSubmit}
      onLoad={onLoad}
      isValid={isValid}
      error={error}
    >
      <Input
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        name={"email"}
        type={"email"}
        autoComplete={"on"}
        value={values?.email || ""}
        onChange={handleChange}
        pattern={EMAIL_PATTERN}
        errorCondition={errors?.email}
        errorMessage={VALIDATION_MESSAGES.frontend.email}
      />
      <Input
        htmlFor={"password"}
        id={"password"}
        label={"Пароль"}
        name={"password"}
        type={"password"}
        autoComplete={"current-password"}
        value={values?.password || ""}
        onChange={handleChange}
        pattern={PASSWORD_PATTERN}
        errorCondition={errors?.password}
        errorMessage={VALIDATION_MESSAGES.frontend.password}
      />
      <p className="entry__paragraph">
        Ещё не зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signup">
          Регистрация
        </Link>
      </p>
    </Entry>
  );
}

Login.propTypes = {
  onAuthorization: PropTypes.func,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
};

export default Login;
