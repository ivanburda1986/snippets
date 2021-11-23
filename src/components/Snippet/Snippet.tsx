import React, { useState } from "react";
import { typeSnippet } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { ReadonlyLabel } from "../ReadonlyLabel/ReadonlyLabel";

export function Snippet({ id, title, description, content, language, assignedLabels }: typeSnippet) {
  const [editing, setEditing] = useState(false);

  function handleEdit() {
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
  }

  return (
    <div className={sharedStyles.container}>
      <div className={styles.snippet}>
        <div id="snippetHeader" className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          {assignedLabels.map((item) => (
            <ReadonlyLabel key={item.name} name={item.name} language={item.language} bgColor={item.bgColor} />
          ))}
        </div>
        <div id="snippetBody" className={styles.body}>
          <pre className="prettyprint">
            <code className={`lang-${language}`}> {content}</code>
          </pre>
        </div>
        <div id="snippetFooter" className={styles.footer}>
          <Button title={"Edit"} onClick={handleEdit} disabled={editing} displayed={editing ? "none" : "flex"} />
          <Button title={"Cancel"} onClick={handleCancel} disabled={false} displayed={editing ? "flex" : "none"} />
          <Button title={"Save"} onClick={() => console.log("hello")} disabled={false} displayed={editing ? "flex" : "none"} />
          <Button title={"Delete"} onClick={() => console.log("hello")} disabled={false} displayed={"flex"} />
        </div>
      </div>
    </div>
  );
}
