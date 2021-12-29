import React from "react";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import styles from "./ToggleSwitch.module.css";

interface ToggleSwitchType {
  name: string;
  checked: boolean;
  callback: () => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchType> = ({ name, checked, callback }) => {
  return (
    <label htmlFor={`toggleSwitch-${name}`} className={styles.ToggleSwitch}>
      <input type="checkbox" name={`toggleSwitch-${name}`} onChange={callback} />
      <span className={styles.icon}>{checked ? <RiGitRepositoryPrivateFill /> : <RiGitRepositoryPrivateLine />}</span>
    </label>
  );
};
