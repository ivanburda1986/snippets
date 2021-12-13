import React from "react";
import styles from "./Message.module.css";
import { message } from "../../config/config";

export function Message({ type, text }: message) {
  return (
    <div id="message" className={`${styles[`message-${type}`]} ${styles.message}`}>
      <p>{text}</p>
    </div>
  );
}
