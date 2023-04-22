import React from "react";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="list nav-tab__list">
        <li>
          <a className="link nav-tab__link" href="#diploma">
            О проекте
          </a>
        </li>
        <li>
          <a className="link nav-tab__link" href="#technologies">
            Технологии
          </a>
        </li>
        <li>
          <a className="link nav-tab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
