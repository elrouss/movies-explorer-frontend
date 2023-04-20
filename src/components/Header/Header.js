import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

export default function Header() {
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Logo />
        <div className="header__auth">
          <Link className="link">Регистрация</Link>
          <Link className="link link_color_accent btn-auth">Войти</Link>
        </div>
      </div>
    </header>
  );
}
