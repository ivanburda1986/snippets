import React from "react";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

export function Snippet({ id, title, description, content, language }: { id: string; title: string; description: string; content: string; language: string }) {
  const obj = content;
  return (
    <div className={sharedStyles.container}>
      <div className={styles.snippet}>
        <div id="snippetHeader" className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div id="snippetBody" className={styles.body}>
          <pre className="prettyprint">
            <code className={`lang-${language}`}> {obj}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
