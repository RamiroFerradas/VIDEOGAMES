const { Router } = require("express");
const axios = require("axios");
const e = require("express");
const router = Router();
const { Videogame, Genres } = require("../db");
const { APIKEY } = process.env;

async function getDetail(id) {
  if (id.includes("-")) {
    let genDb = (
      await Videogame.findByPk(id, {
        include: {
          model: Genres,
          attributes: ["name"],
        },
      })
    ).dataValues;

    genDb.genres = genDb.genres.map((ele) => ele.dataValues.name);

    return genDb;
  }

  const { data } = await axios(
    `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
  );

  let resultados = {
    id: data.id,
    image: data.background_image,
    name: data.name[0].toUpperCase() + data.name.slice(1),
    genres: data.genres.map((g) => g.name),
    description: data.description,
    released: data.released,
    rating: data.rating,
    platforms: data.platforms.map((ele) => ele.platform.name),
  };

  return resultados;
}

module.exports = {
  getDetail,
};
