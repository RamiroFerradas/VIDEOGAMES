const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const modelsV = require("./videogames");
const models = require("./videogame");
const modelsG = require("./genres");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use("/auth", authRouter);

router.get("/videogames", async (req, res) => {
  let { name } = req.query;
  try {
    res.status(200).json(await modelsV.getConcatenados(name));
  } catch (error) {
    console.log(error);
  }
});

router.get("/videogame/:id", async (req, res) => {
  let { id } = req.params;
  try {
    res.status(200).json(await models.getDetail(id));
  } catch (error) {
    console.log(error);
  }
});

router.get("/genres", async (req, res) => {
  try {
    res.status(200).json(await modelsG.getGenres());
  } catch (error) {
    console.log(error);
  }
});

router.post("/videogames", async (req, res) => {
  let { name, description, released, rating, platforms, genres, image } =
    req.body;

  if (
    !image ||
    image === undefined ||
    image === "" ||
    !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(image)
  ) {
    image =
      " https://i0.wp.com/elfutbolito.mx/wp-content/uploads/2019/04/image-not-found.png?ssl=1";
  }

  try {
    let gameCreator = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
    });
    await gameCreator.addGenres(genres);

    let game = (
      await Videogame.findByPk(gameCreator.id, {
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [], // limpia de axios
          },
        },
      })
    ).dataValues;

    game.genres = game.genres.map((ele) => ele.dataValues.name);
    console.log(game, "HOLA SOY EL GAME");
    res.status(200).send(game);
    console.log("VideoGame creado");
  } catch (error) {
    console.log(error.message, "error en el post");
  }
});

module.exports = router;
