import React, { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import { typeSnippet, labels } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

import { Button } from "../Button/Button";
import { ReadonlyLabel } from "../ReadonlyLabel/ReadonlyLabel";
import { deleteServerItem } from "../../api/api";

export function Snippet({ id, title, description, content, language }: typeSnippet) {
  const mycontext = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const assignedLabel = labels.filter((label) => label.lang === language)[0];

  function handleEdit() {
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
  }

  function handleDelete(id: string) {
    mycontext.deleteSnippetHandler(id);
    deleteServerItem(id);
  }

  return (
    <div className={sharedStyles.container}>
      <div className={styles.snippet}>
        <div id="snippetHeader" className={styles.header}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          {assignedLabel && <ReadonlyLabel key={assignedLabel.name} name={assignedLabel.name} lang={assignedLabel.lang} bgColor={assignedLabel.bgColor} />}
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
          <Button title={"Delete"} onClick={() => handleDelete(id)} disabled={false} displayed={"flex"} />
        </div>
      </div>
    </div>
  );
}
