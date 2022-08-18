const { Router } = require("express");
const axios = require("axios");
const e = require("express");
const router = Router();
const { Videogame, Genres } = require("../db");
const { APIKEY } = process.env;

async function getGenres() {
  let genresDb = await Genres.findAll();
  if (genresDb.length) {
    console.log("Genres traidos de DB");
    return genresDb;
  } else {
    const { data } = await axios(
      `https://api.rawg.io/api/genres?key=${APIKEY}`
    );

    let limpioName = data.results.map((ele) => {
      return {
        name: ele.name,
      };
    });

    let guardoEnDb = await limpioName.map(async (ele) => Genres.create(ele));

    let promesa = await Promise.all(guardoEnDb);
    console.log("Genres traidos de api y guardados");
    return promesa;
  }
}

module.exports = {
  getGenres,
};
