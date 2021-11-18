import React from "react";
import classes from "./Header.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { Label } from "../Label/Label";

export function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Snippets</div>
      <div className={sharedStyles.container}>
        <div className={classes.headerOptions}>
          <Label name={"JavaScript"} bgColor={"gold"} />
          <Label name={"HTML"} bgColor={"orange"} />
          <Label name={"CSS"} bgColor={"mediumpurple"} />
        </div>
      </div>
    </div>
  );
}
