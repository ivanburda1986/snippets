import React from "react";
import { MdAddCircleOutline } from "react-icons/md";
import styles from "./AddSnippetBtn.module.css";

interface AddSnippetBtn {
  action: Function;
  disabled: boolean;
}

export const AddSnippetBtn: React.FC<AddSnippetBtn> = ({ action, disabled }) => {
  return (
    <button className={`${styles.AddSnippetBtn} ${!disabled && styles.disabled}`} onClick={action()}>
      <MdAddCircleOutline />
    </button>
  );
};
