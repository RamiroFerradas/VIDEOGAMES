import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/videogames`)).data;

      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json,
      });
    } catch (error) {
      console.log(error.message, "error en el pedido de videogames a la api");
    }
  };
}
export function getGenres() {
  return async function (dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/genres`)).data;

      return dispatch({
        type: "GET_GENRES",
        payload: json,
      });
    } catch (error) {
      console.log(error.message, "error en el pedido de generos a la api");
    }
  };
}

export function searchGame(name) {
  return async function (dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/videogames?name=${name}`))
        .data;
      return dispatch({
        type: "SEACH_GAME",
        payload: json,
      });
    } catch (error) {
      console.log(error.message, "error en el seach");
    }
  };
}
export function searchGameGlobal(name) {
  return {
    type: "SEARCH_GLOBAL",
    payload: name,
  };
}
export function gameDetail(id) {
  return async function (dispatch) {
    try {
      let json = (await axios(`http://localhost:3001/videogame/${id}`)).data;

      return dispatch({
        type: "GAME_DETAIL",
        payload: json,
      });
    } catch (error) {
      console.log(error.message, "error los detalles");
      alert("No se encontro el id flaco!!");
    }
  };
}
export function postGame(payload) {
  return async function (dispatch) {
    try {
      let json = (await axios.post(`http://localhost:3001/videogames`, payload))
        .data;
      return dispatch({
        type: "POST_GAME",
        paylaod: json,
      });
    } catch (error) {
      console.log(error.message, "error en el post");
    }
  };
}

export function filterByGenres(payload) {
  return {
    type: "FILTER_GENRES",
    payload: payload,
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload: payload,
  };
}
export function orderByRating(payload) {
  return {
    type: "ORDER_RATING",
    payload: payload,
  };
}

export function orderAz(payload) {
  return {
    type: "ORDER_AZ",
    payload: payload,
  };
}
export function setCurrentPage(payload) {
  return {
    type: "CURRENT_PAGE",
    payload: payload,
  };
}

export function cleanCache() {
  return {
    type: "CLEAN_CACHE",
  };
}

export function recargarGames() {
  return {
    type: "RECARGAR_GAMES",
  };
}
