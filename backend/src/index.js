const express = require("express");
const bodyParser = require("body-parser");
const { createCep, listCeps, favoriteCep, unfavoriteCep, syncCeps } = require("./controllers/cepController");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.put("/ceps", createCep);
app.get("/sync", async (req, res) => {
  try {
    await syncCeps();
    res.status(200).send({ message: "CEPs synchronized successfully!" });
  } catch (error) {
    console.error("Error syncing:", error);
    res.status(500).send({ error: "Error syncing the CEPs" });
  }
});
app.get("/ceps", listCeps);
app.patch("/ceps/:cep/favorite", favoriteCep);
app.patch("/ceps/:cep/unfavorite", unfavoriteCep);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
