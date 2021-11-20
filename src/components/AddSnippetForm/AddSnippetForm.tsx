import React from "react";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";

export function AddSnippetForm() {
  return (
    <div className={sharedStyles.container}>
      <form>
        <label htmlFor="SnippetInputName">Title</label>
        <input type="text" id="SnippetInputName" name="SnippetInputName" />
        <label htmlFor="SnippetInputDescription">Description</label>
        <input type="text" id="SnippetInputDescription" name="SnippetInputDescription" />
        <label htmlFor="SnippetInputContent">Snippet</label>
        <textarea id="SnippetInputDescription" name="SnippetInputDescription" rows={4} cols={50} />
      </form>
    </div>
  );
}
