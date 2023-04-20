import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__description">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__paragraph">Страница не найдена</p>
        </div>
        <Link className="link not-found__link" to={"/"}>
          Назад
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
