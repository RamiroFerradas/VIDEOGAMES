import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { cleanCache, deleteGame, gameDetail } from "../../redux/actions";
import Loading from "../Loading/Loading";
import styles from "../Game Detail/GameDetail.module.css";
import { MdArrowBackIosNew } from "react-icons/md";

export default function GameDetail() {
  const navigate = useNavigate();
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

  const handleDelete = () => {
    dispatch(deleteGame(id));
    alert("Videogame delete!");
    navigate("/home");
    dispatch(cleanCache());
  };

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
      {details.createdInDb && (
        <button
          className={styles.buttonDelete}
          onClick={(e) => handleDelete(e)}
        >
          <span className={styles.text}>Delete</span>
          <span className={styles.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
