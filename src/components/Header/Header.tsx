import React from "react";
import classes from "./Header.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";

export function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Snippets</div>
      <div className={sharedStyles.container}>
        <div className={classes.headerOptions}>Label label</div>
      </div>
    </div>
  );
}
