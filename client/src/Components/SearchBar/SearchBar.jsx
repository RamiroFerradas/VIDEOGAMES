import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchGame,
  searchGameGlobal,
  setCurrentPage,
} from "../../redux/actions";
import styles from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  let [name, setName] = useState("");
  // const allGames = useSelector((state) => state.allVideogames);
  // const flag = useSelector((state) => state.flag);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchGame(name));
    dispatch(setCurrentPage(1));
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setName(e.target.value.toLowerCase());

    // dispatch(searchGameGlobal(name.toLowerCase()));

    // dispatch(searchGame(name));

    dispatch(setCurrentPage(1));
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {" "}
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search videogame..."
        onChange={(e) => handleInputChange(e)}
      />
    </form>
  );
}
