import React from "react";

import TechsList from "../TechsList/TechsList";

export default function Techs() {
  return (
    <section className="techs">
      <div className="wrapper">
        <h2>Технологии</h2>
        <div className="techs__wrapper">
          <h3>7 технологий</h3>
          <p>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <TechsList />
        </div>
      </div>
    </section>
  )
}
