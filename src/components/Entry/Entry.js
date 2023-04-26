import React from "react";
import { useMatch } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../Logo/Logo.js";

function Entry({ children, heading, name, btn, btnAriaLabel }) {
  const href = useMatch({ path: `${window.location.pathname}`, end: false });
  const isLoginHref = href.pathname.endsWith("/signin");

  const inputs = children.slice(0, -1);
  const link = children.slice(-1);

  return (
    <div className="entry">
      <div className="entry__wrapper">
        <Logo />
        <h1 className="entry__heading">{heading}</h1>
        <form className="entry__form" name={name}>
          <fieldset
            className={`entry__fieldset${
              (isLoginHref && " entry__fieldset_margin_big") || ""
            }`}
          >
            {inputs}
          </fieldset>
          <button
            className="btn btn-entry"
            type="submit"
            aria-label={btnAriaLabel}
          >
            {btn}
          </button>
        </form>
        {link}
      </div>
    </div>
  );
}

Entry.propTypes = {
  children: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  btn: PropTypes.string.isRequired,
  btnAriaLabel: PropTypes.string.isRequired,
};

export default Entry;
