import React from "react";
import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

export default function Header() {
  return (
    <header>
      <div className="wrapper">
        <Logo />
        <div className="auth">
          <Link>Регистрация</Link>
          <Link className="btn-auth">Войти</Link>
        </div>
      </div>
    </header>
  )
}
