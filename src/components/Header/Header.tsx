import React, { useContext } from "react";
import { labels } from "../../config/config";
import classes from "./Header.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { CheckboxLabel } from "../CheckboxLabel/CheckboxLabel";
import { Button } from "../Button/Button";
import { AppContext } from "../../context/context";

export function Header() {
  const mycontext = useContext(AppContext);

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Snippets</div>
      <div className={sharedStyles.container}>
        <div className={classes.headerOptions}>
          {labels.map((item) => (
            <CheckboxLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, toggleAction: () => mycontext.addFilter(item.lang) }} labelGroupName="headerLabels" />
          ))}
          <Button title={"Add snippet"} onClick={mycontext.toggleNewSnippetFormDisplayState} disabled={mycontext.newSnippetFormDisplayState} displayed="flex" />
        </div>
      </div>
    </div>
  );
}
