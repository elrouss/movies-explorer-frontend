import React from "react";

import AboutProjectArticle from "../AboutProjectArticle/AboutProjectArticle";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function AboutProject() {
  return (
    <section className="about-project">
      <div className="wrapper">
        <h2>О проекте</h2>
        <div className="about-project__wrapper">
          <div className="layout-2-column">
            <AboutProjectArticle
              heading={'Дипломный проект включал 5 этапов'}
              paragraph={'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.'}
            />
            <AboutProjectArticle
              heading={'На выполнение диплома ушло 5 недель'}
              paragraph={'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'}
            />
          </div>
          <ProgressBar />
          <div className="about-project__web-development">
            <span>Back-end</span>
            <span>Front-end</span>
          </div>
        </div>
      </div>
    </section>
  )
}
