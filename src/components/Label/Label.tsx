import React from "react";
import styles from "./Label.module.css";
import { labelData } from "../../config/config";

export function Label({ name, language, bgColor, toggleAction }: labelData) {
  function onToggleHandler() {
    if (toggleAction) {
      toggleAction();
      console.log("hello");
    }
  }
  const randomNamePart = Math.floor(Math.random() * 10000);
  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor }}>
      <input type="checkbox" id={`label-${name}-${randomNamePart}`} name={`label-${name}-${randomNamePart}`} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => onToggleHandler()} />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
}
