import React from "react";
import PropTypes from "prop-types";

import arrow from "../../assets/icons/arrow-tab.svg";

function PortfolioProject({ url, heading }) {
  return (
    <li className="portfolio__project">
      <a className="link portfolio__link" href={url} rel="noreferrer" target="_blank">
        <h3 className="portfolio__project-heading">{heading}</h3>
        <img
          className="portfolio__project-arrow"
          src={arrow}
          alt="Иконка в виде белой стрелки, направленной в верхний правый угол"
        />
      </a>
    </li>
  );
}

PortfolioProject.propTypes = {
  url: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default PortfolioProject;
