import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import styles from "./FavoriteButton.module.css";
import { Favorited } from "../../config/config";

interface FavoriteButton {
  favorited: Favorited;
  onClick: any;
}

export const FavoriteButton: React.FC<FavoriteButton> = ({ favorited, onClick }) => {
  return (
    <div>
      <button className={`${styles.FavoriteButton} ${favorited && styles.favorited}`} onClick={onClick}>
        {favorited ? <AiFillStar /> : <AiOutlineStar />}
      </button>
    </div>
  );
};
