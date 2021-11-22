import React from "react";
import styles from "./Label.module.css";

export function Label({ name, bgColor, onToggle }: { name: string; bgColor: string; onToggle?: Function }) {
  function labelStateColor() {
    if (onToggle) {
      onToggle(name);
    }
  }
  const randomNamePart = Math.floor(Math.random() * 10000);
  return (
    <div className={styles.Label} style={{ backgroundColor: bgColor }}>
      <input type="checkbox" id={`label-${name}-${randomNamePart}`} name={`label-${name}-${randomNamePart}`} value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => labelStateColor()} />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
}
