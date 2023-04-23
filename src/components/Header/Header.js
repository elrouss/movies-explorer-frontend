import React from "react";
import { Link, useMatch } from "react-router-dom";

import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isRootHref = href.pathnameBase === "/";

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Logo />
        {isRootHref ? (
          <div className="header__auth">
            <Link className="link" to={"/signup"}>
              Регистрация
            </Link>
            <Link className="link link_color_accent btn-auth" to={"/signin"}>
              Войти
            </Link>
          </div>
        ) : (
          <Navigation />
        )}
      </div>
    </header>
  );
}

export default Header;
