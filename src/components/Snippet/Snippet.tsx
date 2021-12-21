import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsLink45Deg } from "react-icons/bs";
import { AppContext } from "../../context/context";
import { typeSnippet, labels, supportedSnippetTypes, typeNewSnippet } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./Snippet.module.css";

import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { ReadonlyLabel } from "../ReadonlyLabel/ReadonlyLabel";
import { RadioLabel } from "../RadioLabel/RadioLabel";
import { deleteServerItem, updateServerItem } from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

export const Snippet = React.memo(({ id, title, description, content, link, language, favorited, creationTimestamp }: typeSnippet) => {
  let assignedLabel = labels.filter((label) => label.lang === language)[0];
  const mycontext = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [assignedLanguage, setAssignedLanguage] = useState<supportedSnippetTypes>(assignedLabel.lang);
  const [titleToUpdate, setTitleToUpdate] = useState(title);
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(description);
  const [contentToUpdate, setContentToUpdate] = useState(content);
  const [linkToUpdate, setLinkToUpdate] = useState(link);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const userIsAuthenticated = useContext(AuthContext);

  const cbDeleteSuccess = () => {
    mycontext.addSnackbarMessage({ type: "success", text: `The item'${title}' has been successfully deleted.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
  };

  const cbSuccess = () => {
    mycontext.addSnackbarMessage({ type: "success", text: `The item '${title}' has been successfully updated on the server`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
  };
  const cbError = () => {
    mycontext.addSnackbarMessage({ type: "error", text: `Updating the item '${title}' at the server has failed.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    deleteServerItem({ itemId: id, cbDeleteSuccess: cbDeleteSuccess });
  };

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    if (userIsAuthenticated) {
      const snippetToAdd: typeNewSnippet = {
        id: id,
        title: titleToUpdate,
        description: descriptionToUpdate,
        content: contentToUpdate,
        language: assignedLanguage!,
        link: linkToUpdate,
        favorited: 0,
        creationTimestamp: creationTimestamp,
      };
      mycontext.deleteSnippetHandler(id);
      mycontext.updateSnippetHandler(snippetToAdd);
      setEditing(false);
      updateServerItem(snippetToAdd, cbSuccess, cbError);
    } else {
      mycontext.addSnackbarMessage({ type: "warning", text: "Please login if you wish to save the changes.", queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    }
  }

  function handleToggleFavorite(id: string) {
    if (userIsAuthenticated) {
      const snippetToAdd: typeNewSnippet = {
        id: id,
        title: title,
        description: description,
        content: content,
        link: link,
        language: language,
        favorited: favorited === 1 ? 0 : 1,
        creationTimestamp: creationTimestamp,
      };
      mycontext.deleteSnippetHandler(id);
      mycontext.updateSnippetHandler(snippetToAdd);
      setEditing(false);
      updateServerItem(snippetToAdd, cbSuccess, cbError);
    } else {
      mycontext.addSnackbarMessage({ type: "warning", text: `Please login if you wish to do this action.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    }
  }

  const assignLanguageHandler = (lang: supportedSnippetTypes) => {
    setAssignedLanguage(lang);
  };

  function handleCancel() {
    setEditing(false);
  }

  function handleDelete(id: string) {
    if (userIsAuthenticated) {
      if (deleteConfirmation) {
        mycontext.deleteSnippetHandler(id);
        deleteServerItem({ itemId: id, cbDeleteSuccess: cbDeleteSuccess });
      } else {
        setDeleteConfirmation(true);
        setTimeout(() => setDeleteConfirmation(false), 3000);
      }
    } else {
      mycontext.addSnackbarMessage({ type: "warning", text: `Please login if you wish to delete the snippet.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
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
            <div className={styles.titleRight}>{assignedLabel && <ReadonlyLabel key={assignedLabel.name} name={assignedLabel.name} lang={assignedLabel.lang} bgColor={assignedLabel.bgColor} color={assignedLabel.color} />}</div>
          </div>
          <div id="snippetBody" className={styles.body}>
            <p className={styles.description}>{description}</p>
            <pre className={`prettyprint ${styles.codeContent}`}>
              <code className={`lang-${language}`}> {content}</code>
            </pre>
            {
              <div className={styles.link}>
                <BsLink45Deg />
                Link:
                <a href={link} target="_blank">
                  {link}
                </a>
              </div>
            }
          </div>
          <div id="snippetFooter" className={styles.footer}>
            <button className={`${sharedStyles.button} ${styles.editButton}`} onClick={handleEdit}>
              Edit
            </button>
            <button className={`${sharedStyles.button} ${styles.deleteButton} ${deleteConfirmation && styles.confirmDelete}`} onClick={() => handleDelete(id)}>
              {deleteConfirmation ? "Really?" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* Edit-mode */}
        <div className={`${styles.snippet} ${editing && styles.snippetEditMode}`}>
          <div id="snippetHeader" className={`${styles.snippetHeader} ${editing && styles.snippetEditMode}`}>
            <input type="text" className={styles.snippetInputName} id="SnippetInputName" name="SnippetInputName" value={titleToUpdate} onChange={(event) => setTitleToUpdate(event.target.value)} />
            <div className={styles.titleRight}>
              {labels.map((item) => (
                <RadioLabel key={item.name} labelInputData={{ name: item.name, isChecked: item.lang === language, lang: item.lang, bgColor: item.bgColor, color: item.color, toggleAction: () => assignLanguageHandler(item.lang) }} labelGroupName={`snippet-${id}-EditingLabelGroup`} />
              ))}
            </div>
          </div>
          <div id="snippetBody" className={styles.body}>
            <input type="text" className={styles.snippetInputDescription} id="SnippetInputDescription" name="SnippetInputDescription" value={descriptionToUpdate} onChange={(event) => setDescriptionToUpdate(event.target.value)} />
            <textarea id={`Snippet-${id}-EditContent`} name={`Snippet-${id}-EditContent`} value={contentToUpdate} onChange={(event) => setContentToUpdate(event.target.value)} />
            <input type="text" className={styles.snippetInputLink} id="SnippetInputLink" name="SnippetInputLink" value={linkToUpdate} placeholder="Link (optional)" onChange={(event) => setLinkToUpdate(event.target.value)} />
          </div>
          <div id="snippetFooter" className={styles.footer}>
            <button className={`${sharedStyles.button} `} onClick={handleCancel}>
              Cancel
            </button>
            <button className={`${sharedStyles.button} `} onClick={handleSave}>
              Save
            </button>
            <button className={`${sharedStyles.button} ${deleteConfirmation && styles.confirmDelete} `} onClick={() => handleDelete(id)}>
              {deleteConfirmation ? "Really?" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }
});
