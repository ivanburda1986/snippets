import React from "react";
import { typeLabelData } from "../../config/config";
import styles from "./ReadonlyLabel.module.css";

export const ReadonlyLabel: React.FC<typeLabelData> = ({ name, bgColor, color }) => {
  return (
    <div className={styles.ReadonlyLabel} style={{ backgroundColor: bgColor, color: color }}>
      {name}
    </div>
  );
};
