import React from "react";

export default function NavTab() {
  return (
    <nav className="nav">
      <ul className="list nav__list">
        <li>
          <a className="link nav__link" href="#diploma">О проекте</a>
        </li>
        <li>
          <a className="link nav__link" href="#technologies">Технологии</a>
        </li>
        <li>
          <a className="link nav__link" href="#student">Студент</a>
        </li>
      </ul>
    </nav>
  )
}
