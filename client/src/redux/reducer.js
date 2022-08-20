const initialState = {
  videogames: [],
  allVideogames: [],
  page: 1,
  details: [],
  genres: [],
  loading: true,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
        page: 1,
        details: [],
        loading: false,
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
        page: 1,
      };

    case "CURRENT_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SEACH_GAME":
      return {
        ...state,
        videogames: action.payload,
        page: 1,
      };
    case "SEARCH_GLOBAL":
      let filter = state.videogames.filter((ele) =>
        ele.name.toLowerCase().includes(action.payload)
      );
      return {
        ...state,
        videogames: filter,
        page: 1,
      };
    case "GAME_DETAIL":
      console.log("entre al reducer de details");
      return {
        ...state,
        details: action.payload,
        page: 1,
      };

    case "FILTER_GENRES":
      let filtGen = state.allVideogames.filter((ele) => {
        if (action.payload === "all") {
          return state.allVideogames;
        } else {
          return ele.genres.includes(action.payload);
        }
      });
      return {
        ...state,
        videogames: filtGen,
        loading: false,
        page: 1,
      };

    case "FILTER_CREATED":
      let filtCreated = state.allVideogames.filter((ele) => {
        if (action.payload === "all") {
          return state.allVideogames;
        } else {
          return action.payload === "created"
            ? ele.createdInDb
            : !ele.createdInDb;
        }
      });
      return {
        ...state,
        videogames: filtCreated,
        loading: false,
        page: 1,
      };

    case "ORDER_AZ":
      let currentGames = [...state.allVideogames];
      if (action.payload === "default") return currentGames;

      const aux = [...state.videogames];
      if (action.payload === "asc") {
        aux.sort((a, b) => (a.name < b.name ? -1 : 1));
        currentGames = aux;
      }
      if (action.payload === "dsc") {
        aux.sort((a, b) => (a.name > b.name ? -1 : 1));
        currentGames = aux;
      }
      return {
        ...state,
        videogames: currentGames,
      };

    case "ORDER_RATING":
      let currentGames2 = [...state.allVideogames];
      if (action.payload === "default") {
        return {
          ...state,
          videogames: currentGames2,
          page: 1,
        };
      }
      const aux2 = [...state.videogames];
      if (action.payload === "min") {
        aux2.sort((a, b) => (a.rating < b.rating ? -1 : 1));
        currentGames2 = aux2;
      }
      if (action.payload === "max") {
        aux2.sort((a, b) => (a.rating > b.rating ? -1 : 1));
        currentGames2 = aux2;
      }
      return {
        ...state,
        videogames: currentGames2,
      };

    case "POST_GAME":
      return {
        ...state,
        videogames: [...state.videogames, action.payload],
      };

    case "DELETE_GAME":
      let filt = state.videogames.filter((ele) => ele !== action.payload);
      return {
        ...state,
        videogames: filt,
      };

    case "CLEAN_CACHE":
      return {
        ...state,
        details: [],
        page: 1,
      };
    case "CLEAN_CACHE_ALL":
      return {
        ...state,
        details: [],
        videogames: [],
        page: 1,
      };
    case "RECARGAR_GAMES":
      return {
        ...state,
        videogames: state.allVideogames,
        // videogames: state.allVideogames,
        page: 1,
      };

    default:
      return state;
  }
}
