import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGame,
  getGenres,
  getVideogames,
  postGame,
} from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Game Create/GameCreate.module.css";
import { MdArrowBackIosNew } from "react-icons/md";

export default function GameCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: null,
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    return function () {
      dispatch(getVideogames());
    };
  }, [dispatch]);

  const allGenres = useSelector((state) => state.genres);
  const allgames = useSelector((state) => state.videogames);

  const handleChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheckGenres = (e) => {
    if (e.target.checked) {
      setInput((prevState) => ({
        ...prevState,
        genres: input.genres.concat(e.target.value),
      }));
      setErrors(
        validate({
          ...input,
          genres: [...input.genres, e.target.value],
        })
      );
    } else {
      setInput((prevState) => ({
        ...prevState,
        genres: input.genres.filter((x) => e.target.value !== x),
      }));

      setErrors((prevState) =>
        validate({
          ...prevState,
          genres: input.genres.filter((x) => e.target.value !== x),
        })
      );
    }
  };

  const handleCheckPlatforms = (e) => {
    if (e.target.checked) {
      setInput((prevState) => ({
        ...prevState,
        platforms: input.platforms.concat(e.target.value),
      }));
      setErrors(
        validate({
          ...input,
          platforms: [...input.platforms, e.target.value],
        })
      );
    } else {
      setInput((prevState) => ({
        ...prevState,
        platforms: input.platforms.filter((x) => e.target.value !== x),
      }));
      setErrors((prevState) =>
        validate({
          ...prevState,
          platforms: input.platforms.filter((x) => e.target.value !== x),
        })
      );
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(postGame({ ...input, name: input.name.toLowerCase() }));
    alert("Your game has been successfully created!");
    setInput({
      name: "",
      description: "",
      released: "",
      rating: null,
      platforms: [],
      genres: [],
    });
    setTimeout(() => {
      navigate("/home");
    }, 900);
  };

  //validations
  let [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    //name
    if (
      allgames.find(
        (ele) => ele.name?.toLowerCase() === input.name?.toLowerCase()
      )
    )
      errors.name = "Ya existe un juego con este nombre, escoge otro!";
    if (input.name === "") errors.name = "Tu juego necesita un nombre!";

    if (/[^\w\s]/.test(input.name))
      errors.name =
        "El nombre de tu juego no puede contener caracteres especiales";
    //description
    if (input.description === "")
      errors.description = "Tu juego necesita una description!";
    if (input.description.length < 50)
      errors.description = "Tu juego necesita una description mas larga!";
    //released
    if (!input.released)
      errors.released = "Tu juego necesita fecha de lanzamiento!";
    //rating
    if (input.rating > 5) errors.rating = "El rating no puede ser mayor a 5!";
    if (!input.rating) errors.rating = "Tu juego necesita rating!";

    //platforms
    if (!input.platforms?.length)
      errors.platforms = "Tu juego necesita una plataforma al menos!";
    //genres
    if (!input.genres?.length)
      errors.genres = "Tu juego necesita una genero al menos!";

    return errors;
  }

  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    if (
      input.name === "" ||
      /[1-9]/.test(input.name) ||
      // /[\s]/.test(input.name) ||
      /[^\w\s]/.test(input.name) ||
      input.description.length < 50 ||
      input.released.length < 1 ||
      input.rating.length < 1 ||
      input.rating.length > 5 ||
      input.platforms.length < 1 ||
      input.genres.length < 1
    ) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [errors, input, setDisabledButton]);

  return (
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
        <div className={styles.divTitulo}>Game Creator</div>
      </div>
      <div>
        <div>
          <form>
            <div className={styles.divDescription}>
              <label className={styles.description}>Description: </label>
              <br />
              <textarea
                name="description"
                // placeholder="Description..."
                cols="50"
                rows="22"
                onChange={(e) => handleChangeInput(e)}
                value={input.description}
                className={styles.textarea}
              />
              <div className={styles.errores}>
                {errors.description && <p>⚠ {errors.description}</p>}
              </div>
            </div>
          </form>
          <div className={styles.primerColumna}>
            <form>
              <div className={styles.divName}>
                <label>Name: </label>
                <input
                  type="text"
                  placeholder="Name..."
                  autoComplete="on"
                  onChange={(e) => handleChangeInput(e)}
                  value={input.name}
                  name="name"
                />
                <div className={styles.errores}>
                  {errors.name && <p>⚠ {errors.name}</p>}
                </div>
              </div>
              <div className={styles.divReleased}>
                <label>Released: </label>
                <input
                  name="released"
                  type="date"
                  onChange={(e) => handleChangeInput(e)}
                  value={input.released}
                  id={input.name}
                />
                <div className={styles.errores}>
                  {errors.released && <p>⚠ {errors.released}</p>}
                </div>
              </div>
              <div className={styles.divRating}>
                <label>Rating: </label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  onChange={(e) => handleChangeInput(e)}
                  value={input.rating}
                  id={input.name}
                />
                <div className={styles.errores}>
                  {errors.rating && <p>⚠ {errors.rating}</p>}
                </div>
              </div>
            </form>
            <div id="platforms" className={styles.divPlat}>
              <label className={styles.platTitulo}> Select Platforms:</label>
              <form onChange={(e) => handleCheckPlatforms(e)}>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    name="PC"
                    id="PC"
                    value="PC"
                  />
                  <label htmlFor="PC">PC.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="iOS"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="iOS"
                    value="iOS"
                  />
                  <label htmlFor="iOS">iOS.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="Android"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="Android"
                    value="Android"
                  />
                  <label htmlFor="Android">Android.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="macOS"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="macOS"
                    value="macOS"
                  />
                  <label htmlFor="macOS">macOS.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="PlayStation 4"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="PlayStation 4"
                    value="PlayStation 4"
                  />
                  <label htmlFor="PlayStation 4">PlayStation 4.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="PlayStation 5"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="PlayStation 5"
                    value="PlayStation 5"
                  />
                  <label htmlFor="PlayStation 5">PlayStation 5.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="XBOX"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="XBOX"
                    value="XBOX"
                  />
                  <label htmlFor="XBOX">XBOX.</label>
                </div>
                <div className="form-check form-switch">
                  <input
                    name="PS Vita"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="PS Vita"
                    value="PS Vita"
                  />
                  <label htmlFor="PS Vita">PS Vita.</label>
                </div>
              </form>
              <div className={styles.errores}>
                {errors.platforms && <p>⚠ {errors.platforms}</p>}
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className={styles.segundaColumna}>
          <label className={styles.labelGenres}>Select Genres:</label>
          <div className={styles.divGenres}>
            <form onChange={(e) => handleCheckGenres(e)}>
              <div className={styles.mapGeneros}>
                {allGenres?.map((ele) => {
                  return (
                    <div className="form-check form-switch" key={ele.id}>
                      <input
                        value={ele.id}
                        name={ele.name}
                        className={`form-check-input ${styles.inputGenres}`}
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <p htmlFor={ele.name}>{ele.name}.</p>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
          <div className={styles.errores}>
            {errors.genres && <p>⚠ {errors.genres}</p>}
          </div>
        </div>
        <div className={styles.buttonCreate}>
          <button
            className={styles.buttonCreated1}
            disabled={disabledButton}
            onClick={(e) => handleChange(e)}
          >
            CREATE
            <div className={styles.iconCreated}>
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
