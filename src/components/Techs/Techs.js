import React from "react";

import TechsList from "../TechsList/TechsList";

export default function Techs() {
  return (
    <section className="techs" id="technologies">
      <div className="wrapper section-wrapper techs__wrapper">
        <h2 className="section-heading techs__heading">Технологии</h2>
        <div className="techs__list">
          <h3 className="section-heading-main">7 технологий</h3>
          <p className="paragraph techs__paragraph">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <TechsList />
        </div>
      </div>
    </section>
  );
}
