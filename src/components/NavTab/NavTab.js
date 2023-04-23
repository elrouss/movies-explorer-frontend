import React from "react";

export default function NavTab() {
  const links = [
    { label: "О проекте", anchor: "#diploma" },
    { label: "Технологии", anchor: "#technologies" },
    { label: "Студент", anchor: "#student" },
  ];

  return (
    <nav className="nav-tab">
      <ul className="list nav-tab__list">
        {links.map(({ label, anchor }) => (
          <li key={label}>
            <a className="link nav-tab__link" href={anchor}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
