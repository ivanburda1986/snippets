import React, { useContext } from "react";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import styles from "./AddSnippetForm.module.css";
import { AppContext } from "../../context/context";

export function AddSnippetForm() {
  const mycontext = useContext(AppContext);
  return (
    <div className={sharedStyles.container}>
      <form onSubmit={mycontext.submitHandler} className={styles.AddSnippetForm}>
        <label htmlFor="SnippetInputName">Title</label>
        <input type="text" id="SnippetInputName" name="SnippetInputName" />
        <label htmlFor="SnippetInputDescription">Description</label>
        <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" />
        <label htmlFor="SnippetInputContent">Snippet</label>
        <textarea id="SnippetInputDescription" name="SnippetInputDescription" rows={4} cols={50} />
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={mycontext.toggleAddSnippetFormDisplay}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
