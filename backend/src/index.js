// require("dotenv").config();

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');

// const { createCep, listCeps, favoriteCep, unfavoriteCep, syncCeps } = require("./controllers/cepController");

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/create", createCep);
// app.get("/sync", async (req, res) => {
//   try {
//     await syncCeps();
//     res.status(200).send({ message: "CEPs synchronized successfully!" });
//   } catch (error) {
//     console.error("Error syncing:", error);
//     res.status(500).send({ error: "Error syncing the CEPs" });
//   }
// });
// app.get("/list", listCeps);
// app.patch("/ceps/:cep/favorite", favoriteCep);
// app.patch("/ceps/:cep/unfavorite", unfavoriteCep);

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const { createCep, listCeps, favoriteCep, unfavoriteCep, syncCeps, updateCep } = require("./controllers/cepController");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/create", createCep);
app.get("/sync", async (req, res) => {
  try {
    await syncCeps();
    res.status(200).send({ message: "CEPs synchronized successfully!" });
  } catch (error) {
    console.error("Error syncing:", error);
    res.status(500).send({ error: "Error syncing the CEPs" });
  }
});
app.get("/list", listCeps);

// Rota para favoritar/desfavoritar um CEP
app.patch("/ceps/:cep/favorite", favoriteCep);
app.patch("/ceps/:cep/unfavorite", unfavoriteCep);

// Rota para atualizar o logradouro e bairro de um CEP
app.patch("/ceps/:cep", updateCep);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

