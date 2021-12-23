import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./RadioLabel.module.css";
import { typeLabelData } from "../../config/config";

export const RadioLabel = React.memo((props: { labelInputData: typeLabelData; labelGroupName: string }) => {
  const { name, bgColor, color, toggleAction, isChecked }: typeLabelData = props.labelInputData;
  const labelGroupName = props.labelGroupName;

  function onToggleHandler() {
    if (toggleAction) {
      toggleAction();
    }
  }
  const randomNamePart = uuidv4();
  return (
    <div className={styles.RadioLabel} style={{ backgroundColor: bgColor, color: color }}>
      <input
        checked={isChecked && true}
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
