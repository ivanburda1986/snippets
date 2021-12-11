import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import styles from "./FavoriteButton.module.css";
import { Favorited } from "../../config/config";

export function FavoriteButton({ favorited, onClick }: { favorited: Favorited; onClick: any }) {
  return (
    <div>
      <button className={`${styles.FavoriteButton} ${favorited && styles.favorited}`} onClick={onClick}>
        {favorited ? <AiFillStar /> : <AiOutlineStar />}
      </button>
    </div>
  );
}
