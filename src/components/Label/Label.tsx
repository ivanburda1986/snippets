import React from "react";
import styles from "./Label.module.css";

export function Label({ name, bgColor }: { name: string; bgColor: string }) {
  function labelStateColor(checkboxState: boolean) {
    console.log(checkboxState);
  }
  const randomNamePart = Math.floor(Math.random() * 10000);
  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor }}>
      <input type="checkbox" id={`label-${name}-${randomNamePart}`} name={`label-${name}-${randomNamePart}`} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => labelStateColor(e.currentTarget.checked)} />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
}
