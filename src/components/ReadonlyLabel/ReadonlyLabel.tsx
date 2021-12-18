import React from "react";
import { typeLabelData } from "../../config/config";
import styles from "./ReadonlyLabel.module.css";

export function ReadonlyLabel({ name, bgColor, color }: typeLabelData) {
  return (
    <div className={styles.ReadonlyLabel} style={{ backgroundColor: bgColor, color: color }}>
      {name}
    </div>
  );
}
