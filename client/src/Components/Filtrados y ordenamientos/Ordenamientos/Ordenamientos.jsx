import React from "react";
import OrderAz from "./OrderAz";
import OrderRating from "./OrderRating";
import styles from "../Ordenamientos/Ordenamientos.module.css";

export default function Ordenamientos() {
  return (
    <div className={`float-md-end ${styles.Ordenamientos}`}>
      <div className={styles.az}>
        <OrderAz />
      </div>
      <div className={styles.rating}>
        <OrderRating />
      </div>
    </div>
  );
}
