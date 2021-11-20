import React from "react";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";

export function Snippet({ snippetContent, language }: { snippetContent: string; language: string }) {
  const obj = snippetContent;
  return (
    <div className={sharedStyles.container}>
      <div id="snippetBody">
        <pre className="prettyprint">
          <code className={`lang-${language}`}> {obj}</code>
        </pre>
      </div>
    </div>
  );
}
