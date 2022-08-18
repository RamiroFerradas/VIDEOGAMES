import React from "react";
import { useDispatch } from "react-redux";
import { filterCreated, setCurrentPage } from "../../../redux/actions";
import styles from "../Filtrados/FilterCreated.module.css";

export default function FilterCreated() {
  const dispatch = useDispatch();

  const handlerChangeCreated = (e) => {
    e.preventDefault(e);
    dispatch(filterCreated(e.target.value));
    dispatch(setCurrentPage(1));
  };
  return (
    <div>
      <p>Fitler by created</p>
      <select
        onChange={(e) => handlerChangeCreated(e)}
        className={` ${styles.selectCreated}`}
        aria-label=".form-select-sm example"
      >
        <option value="all">All</option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>
    </div>
  );
}
