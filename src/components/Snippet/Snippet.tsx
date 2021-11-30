import React, { useContext, useState } from "react";
import { AppContext } from "../../context/context";
import { typeSnippet, labels, SupportedLanguages, newSnippet } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

import { Button } from "../Button/Button";
import { ReadonlyLabel } from "../ReadonlyLabel/ReadonlyLabel";
import { RadioLabel } from "../RadioLabel/RadioLabel";
import { deleteServerItem, updateServerItem } from "../../api/api";

export const Snippet = React.memo(({ id, title, description, content, language }: typeSnippet) => {
  const mycontext = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  let assignedLabel = labels.filter((label) => label.lang === language)[0];
  const [assignedLanguage, setAssignedLanguage] = useState<SupportedLanguages>(assignedLabel.lang);

  const [titleToUpdate, setTitleToUpdate] = useState(title);
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(description);
  const [contentToUpdate, setContentToUpdate] = useState(content);

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    console.log("ivan");
    const snippetToAdd: newSnippet = {
      id: id,
      title: titleToUpdate,
      description: descriptionToUpdate,
      content: contentToUpdate,
      language: assignedLanguage!,
    };
    mycontext.deleteSnippetHandler(id);
    mycontext.updateSnippetHandler(snippetToAdd);
    setEditing(false);
    updateServerItem(snippetToAdd);
  }

  const assignLanguageHandler = (lang: SupportedLanguages) => {
    setAssignedLanguage(lang);
  };

  function handleCancel() {
    setEditing(false);
  }

  function handleDelete(id: string) {
    mycontext.deleteSnippetHandler(id);
    deleteServerItem(id);
  }

  if (editing === false) {
    return (
      <div className={sharedStyles.container}>
        {/* View-mode */}
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
            <Button title={"Edit"} onClick={handleEdit} disabled={editing} />
            <Button title={"Delete"} onClick={() => handleDelete(id)} disabled={false} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={sharedStyles.container}>
        {/* Edit-mode */}
        <div className={styles.snippet}>
          <div id="snippetHeader" className={styles.header}>
            <input type="text" id="SnippetInputName" name="SnippetInputName" value={titleToUpdate} onChange={(event) => setTitleToUpdate(event.target.value)} />
            <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" value={descriptionToUpdate} onChange={(event) => setDescriptionToUpdate(event.target.value)} />
            {labels.map((item) => (
              <RadioLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, toggleAction: () => assignLanguageHandler(item.lang) }} labelGroupName={`snippet-${id}-EditingLabelGroup`} />
            ))}
          </div>
          <div id="snippetBody" className={styles.body}>
            <pre className="prettyprint">
              <textarea id={`Snippet-${id}-EditContent`} name={`Snippet-${id}-EditContent`} rows={4} cols={50} value={content} onChange={(event) => setContentToUpdate(event.target.value)} />
            </pre>
          </div>
          <div id="snippetFooter" className={styles.footer}>
            <Button title={"Cancel"} onClick={handleCancel} disabled={false} />
            <Button title={"Save"} onClick={handleSave} disabled={false} />
            <Button title={"Delete"} onClick={() => handleDelete(id)} disabled={false} />
          </div>
        </div>
      </div>
    );
  }
});
