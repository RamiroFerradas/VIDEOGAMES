import React from "react";
import { Link } from "react-router-dom";
import styles from "../Landing/Landing.module.css";

export default function Landing() {
  return (
    <div className={`.container-fluid ${styles.contenedorInicio}`}>
      <Link to={"/home"}>
        <button className={styles.button}>ENTER</button>
      </Link>
    </div>
  );
}
