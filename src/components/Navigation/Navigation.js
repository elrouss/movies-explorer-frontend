import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navigation() {
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

  return (
    <div className="layout-nav">
      <nav className="nav">
        <ul className="list nav__list">
          {links.map(({ path, label }) => (
            <li key={label}>
              <NavLink
                className={({ isActive }) =>
                  `link nav__link ${isActive && "nav__link-active"}`
                }
                to={path}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link className="link link-profile" to={"/profile"}>
        Аккаунт
      </Link>
    </div>
  );
}

export default Navigation;
