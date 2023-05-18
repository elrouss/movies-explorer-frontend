import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/icons/logo.svg";

import { ENDPOINT_ROOT } from "../../utils/constants";

export default function Logo() {
  return (
    <Link to={ENDPOINT_ROOT}>
      <img
        className="logo"
        src={logo}
        alt="Логотип сайта с изображением белого щита на зеленом фоне"
      />
    </Link>
  );
}
