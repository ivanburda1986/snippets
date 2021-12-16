import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../context/context";
import { typeSnippet, labels, SupportedLanguages, newSnippet } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

import { Button } from "../Button/Button";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { ReadonlyLabel } from "../ReadonlyLabel/ReadonlyLabel";
import { RadioLabel } from "../RadioLabel/RadioLabel";
import { deleteServerItem, updateServerItem } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export const Snippet = React.memo(({ id, title, description, content, language, favorited, creationTimestamp }: typeSnippet) => {
  let assignedLabel = labels.filter((label) => label.lang === language)[0];
  const mycontext = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [assignedLanguage, setAssignedLanguage] = useState<SupportedLanguages>(assignedLabel.lang);
  const [titleToUpdate, setTitleToUpdate] = useState(title);
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(description);
  const [contentToUpdate, setContentToUpdate] = useState(content);
  const userIsAuthenticated = useContext(AuthContext);

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    if (userIsAuthenticated) {
      const snippetToAdd: newSnippet = {
        id: id,
        title: titleToUpdate,
        description: descriptionToUpdate,
        content: contentToUpdate,
        language: assignedLanguage!,
        favorited: 0,
        creationTimestamp: creationTimestamp,
      };
      mycontext.deleteSnippetHandler(id);
      mycontext.updateSnippetHandler(snippetToAdd);
      setEditing(false);
      updateServerItem(snippetToAdd);
    } else {
      mycontext.addMessage({ type: "warning", text: "Please login if you wish to save the changes.", queuePosition: mycontext.messages.length, id: uuidv4() });
    }
  }

  function handleToggleFavorite(id: string) {
    if (userIsAuthenticated) {
      const snippetToAdd: newSnippet = {
        id: id,
        title: title,
        description: description,
        content: content,
        language: language,
        favorited: favorited === 1 ? 0 : 1,
        creationTimestamp: creationTimestamp,
      };
      mycontext.deleteSnippetHandler(id);
      mycontext.updateSnippetHandler(snippetToAdd);
      setEditing(false);
      updateServerItem(snippetToAdd);
    } else {
      mycontext.addMessage({ type: "warning", text: `Please login if you wish to do this action.`, queuePosition: mycontext.messages.length, id: uuidv4() });
    }
  }

  const assignLanguageHandler = (lang: SupportedLanguages) => {
    setAssignedLanguage(lang);
  };

  function handleCancel() {
    setEditing(false);
  }

  function handleDelete(id: string) {
    if (userIsAuthenticated) {
      mycontext.deleteSnippetHandler(id);
      deleteServerItem(id);
    } else {
      mycontext.addMessage({ type: "warning", text: `Please login if you wish to delete the snippet.`, queuePosition: mycontext.messages.length, id: uuidv4() });
    }
  }

  if (editing === false) {
    return (
      <div>
        {/* View-mode */}
        <div className={styles.snippet}>
          <div id="snippetHeader" className={styles.snippetHeader}>
            <div className={styles.titleLeft}>
              <p className={styles.title}>{title}</p>
              <FavoriteButton favorited={favorited} onClick={() => handleToggleFavorite(id)} />
            </div>
            <div className={styles.titleRight}>{assignedLabel && <ReadonlyLabel key={assignedLabel.name} name={assignedLabel.name} lang={assignedLabel.lang} bgColor={assignedLabel.bgColor} />}</div>
          </div>
          <div id="snippetBody" className={styles.body}>
            <p className={styles.description}>{description}</p>
            <pre className={`prettyprint ${styles.redborder}`}>
              <code className={`lang-${language}`}> {content}</code>
            </pre>
          </div>
          <div id="snippetFooter" className={styles.footer}>
            <button className={`${sharedStyles.button} ${styles.editButton}`} onClick={handleEdit}>
              Edit
            </button>
            <button className={`${sharedStyles.button} ${styles.deleteButton}`} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={sharedStyles.container}>
        {/* Edit-mode */}
        <div className={`${styles.snippet} ${editing && styles.snippetEditMode}`}>
          <div id="snippetHeader" className={`${styles.snippetHeader} ${editing && styles.snippetEditMode}`}>
            <input type="text" className={styles.snippetInputName} id="SnippetInputName" name="SnippetInputName" value={titleToUpdate} onChange={(event) => setTitleToUpdate(event.target.value)} />
            <div className={styles.titleRight}>
              {labels.map((item) => (
                <RadioLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, toggleAction: () => assignLanguageHandler(item.lang) }} labelGroupName={`snippet-${id}-EditingLabelGroup`} />
              ))}
            </div>
          </div>
          <div id="snippetBody" className={styles.body}>
            <input type="text" className={styles.snippetInputDescription} id="SnippetInputDescription" name="SnippetInputDescription" value={descriptionToUpdate} onChange={(event) => setDescriptionToUpdate(event.target.value)} />
            <textarea id={`Snippet-${id}-EditContent`} name={`Snippet-${id}-EditContent`} value={contentToUpdate} onChange={(event) => setContentToUpdate(event.target.value)} />
          </div>
          <div id="snippetFooter" className={styles.footer}>
            <button className={`${sharedStyles.button} ${styles.signInButton}`} onClick={handleCancel}>
              Cancel
            </button>
            <button className={`${sharedStyles.button} ${styles.signInButton}`} onClick={handleSave}>
              Save
            </button>
            <button className={`${sharedStyles.button} ${styles.signInButton}`} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
});
