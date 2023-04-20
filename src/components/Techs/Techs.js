import React from "react";

import TechsList from "../TechsList/TechsList";

export default function Techs() {
  return (
    <section className="techs" id="technologies">
      <div className="wrapper wrapper__section">
        <h2 className="section-heading">Технологии</h2>
        <div className="techs__wrapper">
          <h3>7 технологий</h3>
          <p>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <TechsList />
        </div>
      </div>
    </section>
  )
}
