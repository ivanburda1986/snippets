import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import styles from "./AddSnippetBtn.module.css";

export function AddSnippetBtn({ action, disabled }: { action: Function; disabled: boolean }) {
  return (
    <button className={`${styles.AddSnippetBtn} ${!disabled && styles.disabled}`} onClick={action()}>
      <MdAddCircleOutline />
    </button>
  );
}
