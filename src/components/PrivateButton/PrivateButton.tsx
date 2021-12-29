import React from "react";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import styles from "./PrivateButton.module.css";
import { Privated } from "../../config/config";

interface PrivateButton {
  privated: Privated;
  action: any;
}

export const PrivateButton: React.FC<PrivateButton> = ({ privated, action }) => {
  return (
    <div>
      <button className={`${styles.PrivateButton} ${privated && styles.privated}`} onClick={action}>
        {privated ? <RiGitRepositoryPrivateFill /> : <RiGitRepositoryPrivateLine />}
      </button>
    </div>
  );
};
