import React from "react";
import { useDispatch } from "react-redux";
import { orderByRating, setCurrentPage } from "../../../redux/actions";
import styles from "../Ordenamientos/OrderRating.module.css";

export default function OrderRating() {
  const dispatch = useDispatch();

  const handlerOrderRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    dispatch(setCurrentPage(1));
  };
  return (
    <div>
      <p>Order by Rating</p>
      <select
        onChange={(e) => handlerOrderRating(e)}
        className={`${styles.orderRating}`}
        aria-label=".form-select-sm example"
      >
        <option value="all">All</option>
        <option value="max">Max</option>
        <option value="min">Min</option>
      </select>
    </div>
  );
}
