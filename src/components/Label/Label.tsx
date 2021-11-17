import React from "react";
import styles from "./Label.module.css";

export function Label({ name, bgColor }: { name: string; bgColor: string }) {
  function labelStateColor(checkboxState: boolean) {
    console.log(checkboxState);
  }
  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor }}>
      <input type="checkbox" id={`label-${name}`} name={`label-${name}`} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => labelStateColor(e.currentTarget.checked)} />
      <label htmlFor={`label-${name}`}> {name}</label>
    </div>
  );
}
