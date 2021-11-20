import React, { useContext } from "react";
import classes from "./Header.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { Label } from "../Label/Label";
import { Button } from "../Button/Button";
import { AppContext } from "../../context/context";

export function Header() {
  const mycontext = useContext(AppContext);

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Snippets</div>
      <div className={sharedStyles.container}>
        <div className={classes.headerOptions}>
          <Label name={"JavaScript"} bgColor={"gold"} />
          <Label name={"HTML"} bgColor={"orange"} />
          <Label name={"CSS"} bgColor={"mediumpurple"} />
          <Button title={"Add snippet"} onClick={mycontext.toggleAddSnippetFormDisplay} />
        </div>
      </div>
    </div>
  );
}
