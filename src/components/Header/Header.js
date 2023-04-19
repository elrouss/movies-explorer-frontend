import React from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/icons/logo.svg';

export default function Header() {
  return (
    <header>
      <div className="wrapper">
        <img className="logo" src={logo} alt="Логотип сайта с изображением белого щита на зеленом фоне" />
        <div className="auth">
          <Link>Регистрация</Link>
          <Link className="btn-auth">Войти</Link>
        </div>
      </div>
    </header>
  )
}
