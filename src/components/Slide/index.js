import React, { useState, useEffect } from "react";
import modulConfig from "../../../modul.config";

export default function Slide({ name }) {
  const [httpPath, setHttpPath] = useState(
    `/${modulConfig.repoName}/slides/${name}`,
  );
  const [pdfPath, setPdfPath] = useState(
    `/${modulConfig.repoName}/slides/${name}.pdf`,
  );

  useEffect(() => {
    // Override path for localhost
    if (window.location.hostname !== "localhost") return;
    setHttpPath(`http://localhost:4001/${name}.md`);
    setPdfPath(`http://localhost:4001/${name}.md?pdf`);
  }, [name]);

  return (
    <>
      <p>
        <a href={httpPath} target="_blank">
          💻 Im Browser öffnen
        </a>{" "}
        |{" "}
        <a href={pdfPath} target="_blank">
          💾 PDF Speichern
        </a>
      </p>
      <iframe src={httpPath} width="100%" height="400px"></iframe>
    </>
  );
}
