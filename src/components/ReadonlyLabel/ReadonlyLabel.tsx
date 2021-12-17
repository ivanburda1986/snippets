import React from "react";
import { labelData } from "../../config/config";
import styles from "./ReadonlyLabel.module.css";

export function ReadonlyLabel({ name, bgColor, color }: labelData) {
  return (
    <div className={styles.ReadonlyLabel} style={{ backgroundColor: bgColor, color: color }}>
      {name}
    </div>
  );
}
