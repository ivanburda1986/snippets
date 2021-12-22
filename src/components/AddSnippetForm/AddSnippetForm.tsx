import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../context/context";
import { AuthContext } from "../../context/AuthContext";
import { labels, supportedSnippetTypes, typeNewSnippet } from "../../config/config";
import { addServerItem, deleteServerItem } from "../../api/api";
import { RadioLabel } from "../RadioLabel/RadioLabel";
import { validateInputs } from "./AddSnippetFormService";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./AddSnippetForm.module.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export const AddSnippetForm = React.memo(() => {
  const mycontext = useContext(AppContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [assignedLanguage, setAssignedLanguage] = useState<supportedSnippetTypes>();
  const [privated, setPrivated] = useState<boolean>(false);
  const userIsAuthenticated = useContext(AuthContext);

  const assignLanguageHandler = (lang: supportedSnippetTypes) => {
    setAssignedLanguage(lang);
  };

  const togglePrivated = () => {
    setPrivated(!privated);
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snippetToAdd: typeNewSnippet = {
      id: uuidv4(),
      title: title,
      description: description,
      content: `${content}`,
      language: assignedLanguage!,
      link: link,
      privated: privated === true ? 1 : 0,
      favorited: 0,
      creationTimestamp: Date.now(),
    };

    const cbDeleteSuccess = () => {
      mycontext.addSnackbarMessage({ type: "success", text: `The item'${snippetToAdd.title}' has been successfully deleted.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    };

    const cbSuccess = () => {
      mycontext.addSnackbarMessage({ type: "success", text: `Item '${snippetToAdd.title}' successfully saved to the server`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    };
    const cbError = () => {
      mycontext.addSnackbarMessage({ type: "error", text: `Saving the item '${snippetToAdd.title}' to the server has failed.`, queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
      deleteServerItem({ itemId: snippetToAdd.id, cbDeleteSuccess: cbDeleteSuccess });
    };

    if (userIsAuthenticated) {
      if (validateInputs({ title, description, content, assignedLanguage })) {
        addServerItem(snippetToAdd, cbSuccess, cbError);
        mycontext.submitNewSnippetHandler(snippetToAdd);
        setTitle("");
        setPrivated(false);
        setDescription("");
        setContent("");
        setLink("");
        mycontext.toggleDisplayAddSnippetForm();
      } else {
        mycontext.addSnackbarMessage({ type: "error", text: "Please provide all details for a new snippet.", queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
      }
    } else {
      mycontext.addSnackbarMessage({ type: "error", text: "Please login to save this new snippet.", queuePosition: mycontext.snackbarMessages.length, id: uuidv4() });
    }
  };

  return (
    <div className={sharedStyles.container}>
      <form onSubmit={submitHandler} className={styles.AddSnippetForm}>
        <div className={styles.AddSnippetFormHeader}>
          <h1>New snippet</h1>
          <ToggleSwitch name="createPrivate" checked={privated} callback={togglePrivated} />
        </div>
        <label htmlFor="SnippetInputName">Title</label>
        <input type="text" id="SnippetInputName" name="SnippetInputName" value={title} placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="SnippetInputDescription">Description</label>
        <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" value={description} placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
        <label htmlFor="SnippetInputContent">Snippet</label>
        <textarea id="SnippetInputContent" name="SnippetInputContent" value={content} placeholder="The snippet goes here ..." onChange={(event) => setContent(event.target.value)} />
        <label htmlFor="SnippetInputLink">Link</label>
        <input type="text" id="SnippetInputLink" name="SnippetInputLink" value={link} placeholder="Link (optional)" onChange={(event) => setLink(event.target.value)} />
        <div className={styles.labelSelection}>
          {labels.map((item) => (
            <RadioLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, color: item.color, toggleAction: () => assignLanguageHandler(item.lang) }} labelGroupName="newSnippetLabels" />
          ))}
        </div>
        <div>
          <button type="submit" className={`${sharedStyles.button} ${styles.submitNewSnippetButton}`}>
            Submit
          </button>
          <button type="button" className={`${sharedStyles.button} ${styles.cancelNewSnippetButton}`} onClick={mycontext.toggleDisplayAddSnippetForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});
