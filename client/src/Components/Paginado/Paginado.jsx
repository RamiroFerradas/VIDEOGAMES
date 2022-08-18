import React from "react";
import styles from "../Paginado/Paginado.module.css";
import { useDispatch, useSelector } from "react-redux";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { setCurrentPage } from "../../redux/actions";

export default function Paginado({ allVideogames }) {
  const dispatch = useDispatch();
  let currentPage = useSelector((state) => state.page);
  let pageNumbers = [];
  let gamePerPage = 16;
  let totalPages = Math.ceil(allVideogames / gamePerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {/* <button
        className={currentPage !== 1 ? styles.buttonPaged : styles.buttonPaged2}
        disabled={currentPage - 1 === 0}
        onClick={() => dispatch(setCurrentPage(1))}
      >
        <GiPreviousButton />
        <GiPreviousButton />
      </button> */}
      <button
        className={
          currentPage - 1 === 0 ? styles.buttonPaged2 : styles.buttonPaged
        }
        disabled={currentPage - 1 === 0}
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
      >
        <GiPreviousButton />
      </button>
      {pageNumbers?.map((num) => {
        return (
          <button
            key={num}
            className={
              num !== currentPage ? styles.buttonPaged : styles.buttonPaged2
            }
            disabled={num === currentPage}
            onClick={() => dispatch(setCurrentPage(num))}
          >
            {num}
          </button>
        );
      })}
      <button
        className={
          currentPage === totalPages ? styles.buttonPaged2 : styles.buttonPaged
        }
        disabled={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
      >
        <GiNextButton />
      </button>
      {/* <button
        className={
          currentPage !== totalPages ? styles.buttonPaged : styles.buttonPaged2
        }
        disabled={currentPage === totalPages}
        onClick={() => dispatch(setCurrentPage(totalPages))}
      >
        <GiNextButton />
        <GiNextButton />
      </button> */}
    </nav>
  );
}
