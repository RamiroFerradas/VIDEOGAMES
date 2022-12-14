import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, setCurrentPage } from "../../redux/actions";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Paginado from "../Paginado/Paginado";
import Filtrados from "../Filtrados y ordenamientos/Filtrados/Filtrados";
import Ordenamientos from "../Filtrados y ordenamientos/Ordenamientos/Ordenamientos";
import Loading from "../Loading/Loading";
import styles from "../Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch();

  let allVideogames = useSelector((state) => state.videogames);
  let allVideogames2 = useSelector((state) => state.allVideogames);
  let page = useSelector((state) => state.page);
  let loading = useSelector((state) => state.loading);

  let [gamesPerPage, setGamesPerPage] = useState(16);
  const indexOfLastGame = page * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstGame,
    indexOfLastGame
  );

  useEffect(() => {
    console.log(allVideogames.length);
    if (allVideogames !== allVideogames2) {
      dispatch(getVideogames());
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
      return allVideogames;
    }
  }, [allVideogames, allVideogames2, dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.bgHome}>
      <div className={`container ${styles.navBar}`}>
        <Navbar />
      </div>
      <div className={`container-fluid ${styles.searchBar}`}>
        <Filtrados />
        <SearchBar />
        <Ordenamientos />
      </div>

      <div className={styles.cardsHome}>
        {currentVideogames?.map((ele) => {
          return (
            <div key={ele.name}>
              <Link to={`/videogame/${ele.id}`}>
                <Card name={ele.name} image={ele.image} genres={ele.genres} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.paginado}>
        <Paginado allVideogames={allVideogames.length} />
      </div>
    </div>
  );
}
