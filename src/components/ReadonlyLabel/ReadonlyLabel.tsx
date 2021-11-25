import React from "react";
import { labelData } from "../../config/config";
import styles from "./ReadonlyLabel.module.css";

export function ReadonlyLabel({ name, bgColor }: labelData) {
  return (
    <div className={styles.ReadonlyLabel} style={{ backgroundColor: bgColor }}>
      {name}
    </div>
  );
}
