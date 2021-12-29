import React, { useContext } from "react";
import { labels } from "../../config/config";
import classes from "./Header.module.css";
import sharedStyles from "../sharedStyles/sharedStyles.module.css";
import { CheckboxLabel } from "../CheckboxLabel/CheckboxLabel";
import { AddSnippetBtn } from "../AddSnippetBtn/AddSnippetBtn";

import { AppContext } from "../../context/context";
import { Authentication } from "../Authentication/Authentication";

export const Header: React.FC = () => {
  const mycontext = useContext(AppContext);

  return (
    <div className={classes.header}>
      <div className={classes.headerTitle}>Snippets</div>

      <div className={classes.headerAuthentication}>
        <Authentication />
      </div>
      <div className={sharedStyles.container}>
        <div className={classes.headerOptions}>
          {labels.map((item) => {
            return <CheckboxLabel key={item.name} labelInputData={{ name: item.name, lang: item.lang, bgColor: item.bgColor, color: item.color, toggleAction: () => mycontext.addFilter(item.lang) }} labelGroupName="headerLabels" />;
          })}
          <AddSnippetBtn action={() => mycontext.toggleDisplayAddSnippetForm} disabled={!mycontext.displayNewSnippetsForm} />
        </div>
      </div>
    </div>
  );
};
