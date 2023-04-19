import React from "react";

export default function AboutProject() {
  return (
    <section className="about-project">
      <div className="wrapper">
        <h2>О проекте</h2>
        <div className="about-project__wrapper">
          <div className="layout-2-column">
            <article className="about-project__article">
              <h3>Дипломный проект включал 5 этапов</h3>
              <p>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </article>
            <article className="about-project__article">
              <h3>На выполнение диплома ушло 5 недель</h3>
              <p>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </article>
          </div>
          <div className="progress-bar">
            <span className="progress-bar__stage-1">1 неделя</span>
            <span className="progress-bar__stage-2">4 недели</span>
          </div>
          <div className="web-dovelopment">
            <span>Back-end</span>
            <span>Front-end</span>
          </div>
        </div>
      </div>
    </section>
  )
}
