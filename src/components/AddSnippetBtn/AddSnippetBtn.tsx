import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import styles from "./AddSnippetBtn.module.css";

export function AddSnippetBtn({ action }: { action: Function }) {
  return (
    <button className={styles.AddSnippetBtn} onClick={action()}>
      <MdAddCircleOutline />
    </button>
  );
}
