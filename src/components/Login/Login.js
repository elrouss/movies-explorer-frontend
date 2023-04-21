import React from "react";
import { Link } from "react-router-dom";

import Entry from "../Entry/Entry.js";
import Input from "../Input/Input.js";

function Login() {
  return (
    <Entry
      heading={"Рады видеть!"}
      name={"login"}
      btn={"Войти"}
      btnAriaLabel={"Авторизация на сайте"}
    >
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
        Ещё не зарегистрированы?&nbsp;
        <Link className="link link_type_inner-nav" to="/signup">
          Регистрация
        </Link>
      </p>
    </Entry>
  );
}

export default Login;
