import React from "react";
import { Link, NavLink } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions.js";

function Navigation() {
  const isMobileWidth = useWindowDimensions() <= 768;

  const links = [
    {
      path: "/movies",
      label: "Фильмы",
    },
    {
      path: "/saved-movies",
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
          {isMobileWidth && createNavLink("/", "Главная")}
          {links.map(({ path, label }) => createNavLink(path, label))}
        </ul>
      </nav>
      <Link className="link link-profile" to={"/profile"}>
        Аккаунт
      </Link>
    </div>
  );
}

export default Navigation;
