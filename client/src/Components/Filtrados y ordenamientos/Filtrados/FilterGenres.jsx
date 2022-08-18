import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenres,
  getGenres,
  setCurrentPage,
} from "../../../redux/actions";
import styles from "../Filtrados/FilterGenres.module.css";

export default function FilterGenres() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handlerGenres = (e) => {
    e.preventDefault(e);
    dispatch(filterByGenres(e.target.value));
    console.log(e.target.value);
    dispatch(setCurrentPage(1));
  };
  return (
    <div>
      <p>Filter by genres</p>
      <select
        onChange={(e) => handlerGenres(e)}
        className={`${styles.selectGenres}`}
        aria-label=".form-select-sm example"
      >
        <option className={styles.option} value="all">
          All
        </option>
        {allGenres?.map((ele) => {
          return (
            <option className={styles.option} value={ele.name} key={ele.id}>
              {ele.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
