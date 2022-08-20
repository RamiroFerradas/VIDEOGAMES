const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { APIKEY } = process.env;

async function getVideoGamesApi() {
  const pedido1 = (
    await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}&page_size=40`)
  ).data.results;

  const pedido2 = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}&page_size=40&page=2`
    )
  ).data.results;

  const pedido3 = (
    await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}&page_size=40&page=3`
    )
  ).data.results;

  let concat = pedido1.concat(pedido2, pedido3);

  console.log("GAMES API");
  return concat;

  // let countData = 100000;
  // const requireDataApi = async (page = 1, dataRes = []) => {
  //   let data1 = await axios.get(
  //     `https://api.rawg.io/api/games?key=${APIKEY}&page=${page}`
  //   );
  //   dataRes = [...dataRes, ...data1.data.results];
  //   if (dataRes.length >= countData) {
  //     return dataRes;
  //   }
  //   page++;
  //   return requireDataApi(page, dataRes);
  // };
  // const DataApi = await requireDataApi();
  // console.log(DataApi);
  // const formatDataApi = DataApi.map((ele) => {
  //   return {
  //     name: ele.name[0].toUpperCase() + ele.name.slice(1),
  //     id: ele.id,
  //     image: ele.createdInDb ? ele.image : ele.background_image,
  //     rating: ele.rating,
  //     genres: ele.genres.map((g) => g.name),
  //     createdInDb: ele.createdInDb,
  //   };
  // });
  // console.log(formatDataApi.length);
  // return formatDataApi;
}

// function getVideoGamesApi() {
// let arr = [];
// return function () {
//   console.log(arr, "HOLAAA");
//   for (let i = 0; i <= 1; i++) {
//     let urls = axios
//       .get(
//         `https://api.rawg.io/api/games?key=${APIKEY}page_size=40&page=${
//           i + 1
//         }`
//       )
//       .then((data) => {
//         arr.push(data.data.results);
//       })
//       .catch((error) => console.log(error));
//   }
//   console.log(arr, "HOLAAA");
// };
// }

async function getVideoGamesDb() {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
    },
  });
  console.log("GAMES DATA BASE");
  return gamesDb;
}

async function getConcatenados(name) {
  if (name) {
    let pedido = await getVideoGamesQuery(name);

    if (pedido.length === 0) {
      return "No se encontro el juego";
    }
    console.log(
      `Se encontraron ${pedido.length} juegos con este nombre. Saludos desde back!!`
    );
    return pedido;
  } else {
    const api = await getVideoGamesApi();
    const db = await getVideoGamesDb();
    const concat = api.concat(db);

    let mapLimpieza = concat.map((ele) => {
      return {
        name: ele.name[0].toUpperCase() + ele.name.slice(1),
        id: ele.id,
        image: ele.createdInDb ? ele.image : ele.background_image,
        rating: ele.rating,
        genres: ele.genres.map((g) => g.name),
        createdInDb: ele.createdInDb,
      };
    });
    return mapLimpieza;
  }
}

async function getVideoGamesQuery(name) {
  const pedido = (
    await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`
    )
  ).data.results
    .slice(0, 15)
    .map((ele) => {
      return {
        name: ele.name[0].toUpperCase() + ele.name.slice(1),
        id: ele.id,
        image: ele.background_image,
        rating: ele.rating,
        genres: ele.genres.map((g) => g.name),
        createdInDb: ele.createdInDb,
      };
    });

  console.log("SEARCH GAME");
  return pedido;
}

async function deleteGame(id) {
  await Videogame.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = {
  getConcatenados,
  deleteGame,
};
