const express = require("express");
const rotas = require("./Questionario/Rotas/rotas");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = express();
const rateLimiterRedisMiddleware = require("./Middleware/rateLimiterRedis");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  console.log("Acessou o Middleware!");
  res.header("Access-Control-Allow-Origin", "https://horus-vocacional.com.br/");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Request-Headers", "content-type");
  res.header("Access-Control-Request-Headers", "Origin");
  res.header("Access-Control-Request-Headers", "Authorization");

  app.use(cors());
  next();
});

app.use(rateLimiterRedisMiddleware);

app.use(rotas);
//Certificate;
// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/royersolucoes.com.br/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/royersolucoes.com.br/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/royersolucoes.com.br/chain.pem",
//   "utf8"
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(2259, () => {
//   console.log("HTTPS Servidor Iniciado 2259");
// });

app.listen(2259, () => {
  console.log("HTTPS Server running on port 2259");
});
