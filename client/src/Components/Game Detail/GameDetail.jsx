import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { cleanCache, gameDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";
import styles from "../Game Detail/GameDetail.module.css";
import { MdArrowBackIosNew } from "react-icons/md";

export default function GameDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(gameDetail(id));
    return function () {
      dispatch(cleanCache());
    };
  }, [dispatch, id]);
  let details = useSelector((state) => state.details);
  // console.log(details, "soy details");

  return !details.image ? (
    <Loading />
  ) : (
    <div>
      <NavLink to="/home">
        <div className="recarga">
          <button className="cssbuttons-io-button">
            <div className="icon">
              <MdArrowBackIosNew />
            </div>
          </button>
        </div>
      </NavLink>
      <div className={styles.contenedorName}>
        <div className={styles.divName}>{details.name}</div>
      </div>

      <div className={styles.divImage}>
        <img className={styles.image} src={details.image} alt={details.name} />
      </div>
      <div className={styles.divDescr}>
        <p className={styles.description}>
          Description: {details.description?.replace(/(<([^>]+)>)/gi, "")}
        </p>
      </div>
      <div className={styles.details}>
        <div className={styles.divGen}>
          <p>Genres: {details.genres?.join(", ")}</p>
        </div>
        <div className={styles.divRel}>
          <p>Released: {details.released} </p>
        </div>
        <div className={styles.divRat}>
          <p>
            Rating: {"⭐".repeat(Math.floor(details.rating))}
            {` ${details.rating}`}
          </p>
        </div>
        <div className={styles.divPlat}>
          <p>Platforms: {details.platforms?.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
