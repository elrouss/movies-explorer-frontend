import React from "react";
import { Link, NavLink } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

import {
  ENDPOINT_ROOT,
  ENDPOINT_MOVIES,
  ENDPOINT_SAVED_MOVIES,
  ENDPOINT_PROFILE,
} from "../../utils/constants.js";

function Navigation() {
  const isMobileWidth = useWindowDimensions() <= 768;

  const links = [
    {
      path: ENDPOINT_MOVIES,
      label: "Фильмы",
    },
    {
      path: ENDPOINT_SAVED_MOVIES,
      label: "Сохранённые фильмы",
    },
  ];

  function createNavLink(path, label) {
    return (
      <li key={label}>
        <NavLink
          className={({ isActive }) =>
            `link nav__link${(isActive && " nav__link-active") || ""}`
          }
          to={path}
        >
          {label}
        </NavLink>
      </li>
    );
  }

  return (
    <div className="layout-nav">
      <nav className="nav">
        <ul className="list nav__list">
          {isMobileWidth && createNavLink(ENDPOINT_ROOT, "Главная")}
          {links.map(({ path, label }) => createNavLink(path, label))}
        </ul>
      </nav>
      <Link className="link link-profile" to={ENDPOINT_PROFILE}>
        Аккаунт
      </Link>
    </div>
  );
}

export default Navigation;
