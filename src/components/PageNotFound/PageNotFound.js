import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ENDPOINT_ROOT, ENDPOINT_MOVIES } from "../../utils/constants";

function PageNotFound({ isCurrentUserLoggedIn }) {
  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__description">
          <h1 className="not-found__heading">404</h1>
          <p className="not-found__paragraph">Страница не найдена</p>
        </div>
        <Link
          className="link not-found__link"
          to={isCurrentUserLoggedIn ? ENDPOINT_MOVIES : ENDPOINT_ROOT}
        >
          Назад
        </Link>
      </div>
    </div>
  );
}

PageNotFound.propTypes = {
  isCurrentUserLoggedIn: PropTypes.bool,
};

export default PageNotFound;
