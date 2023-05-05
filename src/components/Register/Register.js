import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Entry from "../Entry/Entry.js";
import Input from "../Input/Input.js";

import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function Register({ onRegistration, onLoad }) {
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
    >
      <Input
        label={"Имя"}
        htmlFor={"name"}
        id={"name"}
        name={"name"}
        type={"text"}
        minLength={"2"}
        maxLength={"30"}
        autoComplete={"on"}
        value={values?.name || ""}
        onChange={handleChange}
      />
      <Input
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        name={"email"}
        type={"email"}
        autoComplete={"on"}
        value={values?.email || ""}
        onChange={handleChange}
      />
      <Input
        htmlFor={"password"}
        id={"password"}
        label={"Пароль"}
        name={"password"}
        type={"password"}
        minLength={"10"}
        autoComplete={"current-password"}
        value={values?.password || ""}
        onChange={handleChange}
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
};

export default Register;
