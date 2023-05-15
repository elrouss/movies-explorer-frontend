import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__description">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__paragraph">Страница не найдена</p>
        </div>
        <button className="btn not-found__link" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
