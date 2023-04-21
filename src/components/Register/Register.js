import React from "react";
import { Link } from "react-router-dom";

import Entry from "../Entry/Entry.js";
import Input from "../Input/Input.js";

function Register() {
  return (
    <Entry
      heading={"Добро пожаловать!"}
      name={"register"}
      btn={"Зарегистрироваться"}
      btnAriaLabel={"Регистрация на сайте"}
    >
      <Input
        label={"Имя"}
        htmlFor={"username"}
        id={"username"}
        type={"text"}
        minLength={"2"}
        maxLength={"30"}
        autoComplete={"on"}
      />
      <Input
        label={"E-mail"}
        htmlFor={"email"}
        id={"email"}
        type={"email"}
        autoComplete={"on"}
      />
      <Input
        htmlFor={"password"}
        id={"password"}
        label={"Пароль"}
        type={"password"}
        minLength={"10"}
        autoComplete={"current-password"}
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

export default Register;
