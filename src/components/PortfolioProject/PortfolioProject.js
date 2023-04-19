import React from "react";
import PropTypes from 'prop-types';

import arrow from "../../assets/icons/arrow-tab.svg";

function PortfolioProject({ url, heading }) {
  return (
    <li className="portfolio__project">
      <a href={url} rel="noreferrer" target="_blank">
        <h3>{heading}</h3>
        <img src={arrow} alt="Иконка в виде белой стрелки, направленной в верхний правый угол" />
      </a>
    </li>
  )
}

PortfolioProject.propTypes = {
  url: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
}

export default PortfolioProject;
