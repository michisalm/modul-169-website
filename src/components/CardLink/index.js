import React from "react";

export default function CardLink({ title, href, desc }) {
  return (
    <article>
      <a className="card padding--lg cardContainer_fWXF" href={href}>
        <h2 className="text--truncate cardTitle_rnsV" title={title}>
          {title}
        </h2>
        {desc && (
          <p className="text--truncate cardDescription_PWke" title={desc}>
            {desc}
          </p>
        )}
      </a>
    </article>
  );
}
