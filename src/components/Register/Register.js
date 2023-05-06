import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Entry from "../Entry/Entry.js";
import Input from "../Input/Input.js";

import useFormWithValidation from "../../hooks/useFormWithValidation.js";

import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  USERNAME_PATTERN,
} from "../../utils/constants.js";

function Register({ onRegistration, onLoad, error }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password, name } = values;

    onRegistration({
      email: email.trim().replace(/\s/g, ""),
      password,
      name: name.trim().replace(/\s+/g, " "),
    });
  }

  return (
    <Entry
      heading={"Добро пожаловать!"}
      name={"register"}
      btn={"Зарегистрироваться"}
      btnAriaLabel={"Регистрация на сайте"}
      onSubmit={handleSubmit}
      onLoad={onLoad}
      isValid={isValid}
      error={error}
    >
      <Input
        label={"Имя"}
        htmlFor={"name"}
        id={"name"}
        name={"name"}
        type={"text"}
        autoComplete={"on"}
        value={values?.name || ""}
        onChange={handleChange}
        pattern={USERNAME_PATTERN}
        errorCondition={errors?.name}
        errorMessage={
          "Имя должно быть от 2 до 30 симв., содержать только буквы, дефис или пробел"
        }
      />
      <Input
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        name={"email"}
        type={"text"}
        autoComplete={"on"}
        value={values?.email || ""}
        onChange={handleChange}
        pattern={EMAIL_PATTERN}
        errorCondition={errors?.email}
        errorMessage={"Требуется ввести электронный адрес"}
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
        errorMessage={
          "Пароль должен быть мин. из 8 симв., включать латиницу, цифру и спецсимв."
        }
      />
      <p className="entry__paragraph">
        Уже зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signin">
          Войти
        </Link>
      </p>
    </Entry>
  );
}

Register.propTypes = {
  onRegistration: PropTypes.func,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
};

export default Register;
