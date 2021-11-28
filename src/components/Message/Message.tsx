import React from "react";
import styles from "./Message.module.css";
import { message } from "../../config/config";

export function Message({ type, text }: message) {
  return (
    <div className={styles[`message-${type}`]}>
      <p>{text}</p>
    </div>
  );
}
