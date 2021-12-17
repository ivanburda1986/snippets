import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./CheckboxLabel.module.css";
import { labelData } from "../../config/config";
import { AppContext } from "../../context/context";

export function CheckboxLabel(props: { labelInputData: labelData; labelGroupName: string }) {
  const mycontext = useContext(AppContext);
  const { name, bgColor, color, toggleAction, lang }: labelData = props.labelInputData;
  const labelGroupName = props.labelGroupName;

  function onToggleHandler() {
    if (toggleAction) {
      toggleAction();
    }
  }
  const randomNamePart = uuidv4();

  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor, color: color }}>
      <input type="checkbox" checked={mycontext.languagesToFilterSnippetsBy.includes(lang)} id={`label-${name}-${randomNamePart}`} name={labelGroupName} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => onToggleHandler()} />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
}
