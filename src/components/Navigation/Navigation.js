import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="layout-nav">
      <nav className="nav">
        <ul className="list nav__list">
          <li>
            <NavLink className="link nav__link">Фильмы</NavLink>
          </li>
          <li>
            <NavLink className="link nav__link">Сохранённые фильмы</NavLink>
          </li>
        </ul>
      </nav>
      <button
        className="btn btn-profile"
        type="button"
        aria-label="Личный кабинет с обновлением данных профиля"
      >
        Аккаунт
      </button>
    </div>
  );
}

export default Navigation;
