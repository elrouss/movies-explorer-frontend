import React from "react";

export default function TechsList() {
  const techs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];

  return (
    <ul className="list techs-list">
      {techs.map((tech) => (
        <li className="techs-list__item" key={tech}>
          {tech}
        </li>
      ))}
    </ul>
  );
}
