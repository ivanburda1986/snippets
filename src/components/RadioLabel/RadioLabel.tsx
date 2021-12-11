import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./RadioLabel.module.css";
import { labelData } from "../../config/config";

export const RadioLabel = React.memo((props: { labelInputData: labelData; labelGroupName: string }) => {
  const { name, bgColor, toggleAction }: labelData = props.labelInputData;
  const labelGroupName = props.labelGroupName;

  function onToggleHandler() {
    if (toggleAction) {
      toggleAction();
    }
  }
  const randomNamePart = uuidv4();
  return (
    <div className={styles.RadioLabel} style={{ backgroundColor: bgColor }}>
      <input
        type="radio"
        id={`label-${name}-${randomNamePart}`}
        name={labelGroupName}
        value={name}
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          onToggleHandler();
        }}
      />
      <label htmlFor={`label-${name}-${randomNamePart}`}> {name}</label>
    </div>
  );
});
