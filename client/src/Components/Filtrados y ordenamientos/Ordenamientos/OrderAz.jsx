import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderAz, setCurrentPage } from "../../../redux/actions";
import styles from "../Ordenamientos/OrderAz.module.css";

export default function OrderAz() {
  const dispatch = useDispatch();

  const handlerOrderAz = (e) => {
    e.preventDefault();
    dispatch(orderAz(e.target.value));
    console.log(e.target.value);
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <p>Order by alphabetically</p>
      <select
        onChange={(e) => handlerOrderAz(e)}
        className={`${styles.orderAz}`}
        aria-label=".form-select-sm example"
      >
        <option value="All">Default</option>
        <option value="asc">A-Z</option>
        <option value="dsc">Z-A</option>
      </select>
    </div>
  );
}
