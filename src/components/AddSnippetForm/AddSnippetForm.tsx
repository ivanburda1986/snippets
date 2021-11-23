import React, { useContext, useState } from "react";
import { labels, labelData } from "../../config/config";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./AddSnippetForm.module.css";
import { AppContext } from "../../context/context";
import { Label } from "../Label/Label";

export const AddSnippetForm = React.memo(() => {
  const mycontext = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [assignedLabels, setAssignedLabels] = useState<labelData[]>([]);

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setContent("");
  };

  const toggleAssignedLabel = (labelName: labelData) => {
    setAssignedLabels((prevAssignedLabels) => [...prevAssignedLabels].concat(labelName));
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    mycontext.submitHandler({
      title: title,
      description: description,
      content: `${content}`,
      language: "js",
      assignedLabels: assignedLabels,
    });
    clearInputs();
    mycontext.toggleAddSnippetFormDisplay();
  };

  return (
    <div className={sharedStyles.container}>
      <form onSubmit={submitHandler} className={styles.AddSnippetForm}>
        <label htmlFor="SnippetInputName">Title</label>
        <input type="text" id="SnippetInputName" name="SnippetInputName" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label htmlFor="SnippetInputDescription">Description</label>
        <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" value={description} onChange={(event) => setDescription(event.target.value)} />
        <label htmlFor="SnippetInputContent">Snippet</label>
        <textarea id="SnippetInputDescription" name="SnippetInputDescription" rows={4} cols={50} value={content} onChange={(event) => setContent(event.target.value)} />
        <div className={styles.labelSelection}></div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={mycontext.toggleAddSnippetFormDisplay}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});
