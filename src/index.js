const express = require("express");
const bodyParser = require("body-parser");
const { criarCep } = require("./controllers/cepController");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/ceps", criarCep);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
