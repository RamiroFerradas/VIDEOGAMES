import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
// import styles from "../Navbar/Navbar.module.css";
import { BsPlusCircleFill } from "react-icons/bs";
import "../Navbar/Navbar.css";
import { AiOutlineSync } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { recargarGames, setCurrentPage } from "../../redux/actions";

export default function Navbar() {
  const dispatch = useDispatch();

  const handlerClick = () => {
    dispatch(recargarGames());
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <Link to="/home">
        <div className="tituloApp">Videogames</div>
        <link
          async
          href="https://fonts.googleapis.com/css?family=Warnes"
          data-generated="http://enjoycss.com"
          rel="stylesheet"
          type="text/css"
        />
      </Link>

      <div className="recarga">
        <button
          className="cssbuttons-io-button"
          onClick={(e) => handlerClick(e)}
        >
          <div className="icon">
            <AiOutlineSync />
          </div>
        </button>
      </div>

      <Link to={"/create"}>
        {/* <BsPlusCircleFill className={styles.BsPlusCircleFill} /> */}
        <button className="icon-btn add-btn">
          <div className="add-icon"></div>
          <div className="btn-txt">Add Game</div>
        </button>
      </Link>
    </div>
  );
}
