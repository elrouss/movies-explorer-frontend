import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo.svg";
// TODO: ОТКЛЮЧИТЬ LINK ДЛЯ ГЛАВНОЙ СТРАНИЦЫ

export default function Logo() {
  return (
    <Link to={"/"}>
      <img
        className="logo"
        src={logo}
        alt="Логотип сайта с изображением белого щита на зеленом фоне"
      />
    </Link>
  );
}
