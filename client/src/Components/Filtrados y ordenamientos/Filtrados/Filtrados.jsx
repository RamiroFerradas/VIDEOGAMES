import React from "react";
import FilterCreated from "./FilterCreated";
import FilterGenres from "./FilterGenres";
import styles from "../Filtrados/Filtrados.module.css";

export default function Filtrados() {
  return (
    <div className={`float-md-start ${styles.Filtros}`}>
      <div className={styles.created}>
        <FilterCreated />
      </div>
      <div className={styles.genres}>
        <FilterGenres />
      </div>
    </div>
  );
}
