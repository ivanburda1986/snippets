import React from "react";
import { RiGitRepositoryPrivateLine } from "react-icons/ri";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import styles from "./PrivateButton.module.css";
import { Privated } from "../../config/config";

export function PrivateButton({ privated, onClick }: { privated: Privated; onClick: any }) {
  return (
    <div>
      <button className={`${styles.PrivateButton} ${privated && styles.privated}`} onClick={onClick}>
        {privated ? <RiGitRepositoryPrivateFill /> : <RiGitRepositoryPrivateLine />}
      </button>
    </div>
  );
}
