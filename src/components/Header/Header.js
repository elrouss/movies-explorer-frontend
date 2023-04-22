import React from "react";
// import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation.js";

export default function Header() {

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Logo />
        <Navigation />
        {/* <div className="header__auth">
          <Link className="link" to={"/signup"}>
            Регистрация
          </Link>
          <Link className="link link_color_accent btn-auth" to={"/movies"}>
            Войти
          </Link>
        </div> */}
      </div>
    </header>
  );
}
