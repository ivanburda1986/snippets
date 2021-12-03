import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { labels, labelData, SupportedLanguages, newSnippet } from "../../config/config";
import { addServerItem, deleteServerItem } from "../../api/api";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./AddSnippetForm.module.css";
import { AppContext } from "../../context/context";
import { RadioLabel } from "../RadioLabel/RadioLabel";

export const AddSnippetForm = React.memo(() => {
  const mycontext = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [assignedLanguage, setAssignedLanguage] = useState<SupportedLanguages>();

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setContent("");
  };

  const assignLanguageHandler = (lang: SupportedLanguages) => {
    setAssignedLanguage(lang);
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const snippetToAdd: newSnippet = {
      id: uuidv4(),
      title: title,
      description: description,
      content: `${content}`,
      language: assignedLanguage!,
      favorited: 0,
      creationTimestamp: Date.now(),
    };

    const cbSuccess = () => {
      console.log(`Item '${snippetToAdd.title}' successfully saved to the server`);
    };
    const cbError = () => {
      console.log(`Saving the item '${snippetToAdd.title}' to the server has failed.`);
      deleteServerItem(snippetToAdd.id);
    };

    addServerItem(snippetToAdd, cbSuccess, cbError);
    mycontext.submitNewSnippetHandler(snippetToAdd);
    clearInputs();
    mycontext.toggleNewSnippetFormDisplayState();
  };

  return (
    <div className={sharedStyles.container}>
      <form onSubmit={submitHandler} className={styles.AddSnippetForm}>
        <label htmlFor="SnippetInputName">Title</label>
        <input type="text" id="SnippetInputName" name="SnippetInputName" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="SnippetInputDescription">Description</label>
        <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" value={description} onChange={(event) => setDescription(event.target.value)} />
        <label htmlFor="SnippetInputContent">Snippet</label>
        <textarea id="SnippetInputContent" name="SnippetInputContent" rows={4} cols={50} value={content} onChange={(event) => setContent(event.target.value)} />
        <div className={styles.labelSelection}>
          {labels.map((item) => (
            <RadioLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, toggleAction: () => assignLanguageHandler(item.lang) }} labelGroupName="newSnippetLabels" />
          ))}
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={mycontext.toggleNewSnippetFormDisplayState}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});
