import React from "react";

export default function NavTab() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <a className="nav__link" href="#diploma">О проекте</a>
        </li>
        <li>
          <a className="nav__link" href="#technologies">Технологии</a>
        </li>
        <li>
          <a className="nav__link" href="#student">Студент</a>
        </li>
      </ul>
    </nav>
  )
}
