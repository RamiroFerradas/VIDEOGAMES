//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
console.log(process.env.APIKEY, "API");
conn.sync({ force: false }).then(() => {
  const PORT = 3001;
  server.listen(process.env.PORT || process.env.PGPORT || PORT, () => {
    const port = process.env.DB_PORT
      ? process.env.DB_PORT
      : process.env.PGPORT
      ? process.env.PGPORT
      : PORT;
    console.log(` TODO OK !! ESCUCHANDO PUERTO ${port}!!`);
  });
});
