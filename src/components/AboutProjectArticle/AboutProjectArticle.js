import React from "react";
import PropTypes from "prop-types";

function AboutProjectArticle({ heading, paragraph }) {
  return (
    <article className="diploma-work">
      <h3 className="diploma-work__heading">{heading}</h3>
      <p className="paragraph">{paragraph}</p>
    </article>
  );
}

AboutProjectArticle.propTypes = {
  heading: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};

export default AboutProjectArticle;
