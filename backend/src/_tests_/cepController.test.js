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
app.post("/ceps", createCep);
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
              favorited: { booleanValue: false }
            }
          }
        ]
      }
    });

    const res = await request(app).get("/ceps");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].cep).toBe("90650-063");
  });

  it("POST /ceps should create new CEP", async () => {
    axios.post.mockResolvedValue({ data: {} });

    const payload = {
      cep: "99999-999",
      logradouro: "Rua Teste",
      bairro: "Centro",
      localidade: "Cidade",
      uf: "RS"
    };

    const res = await request(app).post("/ceps").send(payload);
    expect(res.statusCode).toBe(201);
  });

  it("PATCH /ceps/:cep/favorite should mark as favorite", async () => {
    axios.get.mockResolvedValue({
      data: {
        fields: {
          cep: { stringValue: "99999-999" },
          favorited: { booleanValue: false }
        }
      }
    });
    axios.patch.mockResolvedValue({ data: {} });

    const res = await request(app).patch("/ceps/99999-999/favorite");
    expect(res.statusCode).toBe(200);
  });

  it("PATCH /ceps/:cep/unfavorite should unmark favorite", async () => {
    axios.get.mockResolvedValue({
      data: {
        fields: {
          cep: { stringValue: "99999-999" },
          favorited: { booleanValue: true }
        }
      }
    });
    axios.patch.mockResolvedValue({ data: {} });

    const res = await request(app).patch("/ceps/99999-999/unfavorite");
    expect(res.statusCode).toBe(200);
  });

  it("POST /ceps should handle Firestore error", async () => {
    axios.post.mockRejectedValue(new Error("Firestore error"));

    const payload = {
      cep: "12345-678",
      logradouro: "Rua Erro",
      bairro: "Erro Bairro",
      localidade: "Erro City",
      uf: "ER"
    };

    const res = await request(app).post("/ceps").send(payload);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Error saving CEP");
  });

  it("GET /ceps should handle error when fetching data", async () => {
    axios.get.mockRejectedValue(new Error("Firestore unavailable"));

    const res = await request(app).get("/ceps");
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Error listing CEPs");
  });

  it("PATCH /ceps/:cep/favorite should handle Firestore patch error", async () => {
    axios.get.mockResolvedValue({
      data: {
        fields: {
          cep: { stringValue: "12345-678" },
          favorited: { booleanValue: false }
        }
      }
    });

    axios.patch.mockRejectedValue(new Error("Firestore patch failed"));

    const res = await request(app).patch("/ceps/12345-678/favorite");
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Error favoriting CEP");
  });
});
