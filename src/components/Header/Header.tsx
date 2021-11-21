import React, { useContext } from "react";
import { labels } from "../../config/config";
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
          {labels.map((label) => (
            <Label name={label.name} bgColor={label.bgColor} />
          ))}
          <Button title={"Add snippet"} onClick={mycontext.toggleAddSnippetFormDisplay} disabled={mycontext.showAddSnippetForm} displayed="flex" />
        </div>
      </div>
    </div>
  );
}
