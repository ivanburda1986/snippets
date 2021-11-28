import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./CheckboxLabel.module.css";
import { labelData } from "../../config/config";

export function CheckboxLabel(props: { labelInputData: labelData; labelGroupName: string }) {
  const { name, bgColor, toggleAction }: labelData = props.labelInputData;
  const labelGroupName = props.labelGroupName;

  function onToggleHandler() {
    if (toggleAction) {
      toggleAction();
    }
  }
  const randomNamePart = uuidv4();
  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor }}>
      <input type="checkbox" id={`label-${name}-${randomNamePart}`} name={labelGroupName} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => onToggleHandler()} />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
}