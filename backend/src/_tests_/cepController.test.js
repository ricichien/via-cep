const request = require("supertest");
const express = require("express");
const axios = require("axios");
const {
  createCep,
  listCeps,
  favoriteCep,
  unfavoriteCep
} = require("../controllers/cepController");

jest.mock("axios");

const app = express();
app.use(express.json());

app.get("/ceps", listCeps);
app.put("/ceps", createCep);
app.patch("/ceps/:cep/favorite", favoriteCep);
app.patch("/ceps/:cep/unfavorite", unfavoriteCep);

describe("CEP Controller", () => {
  it("GET /ceps should return list of CEPs", async () => {
    axios.get.mockResolvedValue({
      data: {
        documents: [
          {
            name: "projects/via-cep/databases/(default)/documents/ceps/90650-063",
            fields: {
              cep: { stringValue: "90650-063" },
              logradouro: { stringValue: "Rua Domingos Crescêncio" },
              bairro: { stringValue: "Azenha" },
              localidade: { stringValue: "Porto Alegre" },
              uf: { stringValue: "RS" },
              favoritado: { booleanValue: false }
            }
          }
        ]
      }
    });

    const res = await request(app).get("/ceps");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].cep).toBe("90650-063");
  });

  it("PUT /ceps should create new CEP", async () => {
    axios.put.mockResolvedValue({ data: {} });

    const payload = {
      cep: "99999-999",
      logradouro: "Rua Teste",
      bairro: "Centro",
      localidade: "Cidade",
      uf: "RS"
    };

    const res = await request(app).put("/ceps").send(payload);
    expect(res.statusCode).toBe(201);
  });

  it("PATCH /ceps/:cep/favorite should mark as favorite", async () => {
    axios.patch.mockResolvedValue({ data: {} });

    const res = await request(app).patch("/ceps/99999-999/favorite");
    expect(res.statusCode).toBe(200);
  });

  it("PATCH /ceps/:cep/unfavorite should unmark favorite", async () => {
    axios.patch.mockResolvedValue({ data: {} });

    const res = await request(app).patch("/ceps/99999-999/unfavorite");
    expect(res.statusCode).toBe(200);
  });
});
