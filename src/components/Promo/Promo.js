import React from "react";

import NavTab from "../NavTab/NavTab.js";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <h1 className="section-heading-main promo__heading">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </section>
  );
}
