import React from "react";
import { label } from "../../config/config";
import styles from "./Label.module.css";

export function Label(labelContent: label) {
  function onToggleHandler() {
    if (labelContent.toggleAction) {
      labelContent.toggleAction();
      console.log("hello");
    }
  }
  const randomNamePart = Math.floor(Math.random() * 10000);
  return (
    <div className={styles.Label} style={{ backgroundColor: labelContent.bgColor }}>
      <input type="checkbox" id={`label-${labelContent.name}-${randomNamePart}`} name={`label-${labelContent.name}-${randomNamePart}`} value={labelContent.name} onChange={(e: React.FormEvent<HTMLInputElement>) => onToggleHandler()} />
      <label htmlFor={`label-${labelContent.name}-${randomNamePart}`}> {labelContent.name}</label>
    </div>
  );
}
