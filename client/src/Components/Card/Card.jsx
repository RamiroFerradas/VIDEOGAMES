import React from "react";
import styles from "../Card/Card.module.css";

export default function Card({ name, image, genres }) {
  return (
    <div className={styles.card}>
      <div className={styles.data}>
        <p className={styles.name}>{name}</p>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.genres}>
          <p>{genres.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
