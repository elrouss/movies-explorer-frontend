import React from "react";
import PropTypes from 'prop-types';

function AboutProjectArticle({ heading, paragraph }) {
  return (
    <article className="about-project__article">
      <h3>{heading}</h3>
      <p>{paragraph}</p>
    </article>
  )
}

AboutProjectArticle.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
}

export default AboutProjectArticle;
