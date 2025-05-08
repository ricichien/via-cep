require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const listCeps = require("./controllers/listCepsController");
const syncCeps = require("./controllers/syncCepsController");
const updateCep = require("./controllers/updateCepsController");
const toggleFavoriteCep = require("./controllers/toggleFavoriteCepController");

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
app.patch("/ceps/:cep/toggle-favorite", toggleFavoriteCep);
app.patch("/ceps/:cep", updateCep);

module.exports = app;
