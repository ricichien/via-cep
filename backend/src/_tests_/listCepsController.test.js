const request = require("supertest");
const app = require("../app");

const axios = require("axios");

jest.mock("axios");

describe("GET /ceps", () => {
  it("should return list of CEPs", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        documents: [
          {
            name: "ceps/12345678",
            fields: {
              cep: { stringValue: "12345678" },
              logradouro: { stringValue: "Rua A" },
              bairro: { stringValue: "Centro" },
              localidade: { stringValue: "Cidade" },
              uf: { stringValue: "RS" },
              favoritado: { booleanValue: true },
            },
          },
        ],
      },
    });

    const res = await request(app).get("/list");

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toMatchObject({
      cep: "12345678",
      logradouro: "Rua A",
      bairro: "Centro",
      localidade: "Cidade",
      uf: "RS",
      favoritado: true,
    });
  });
});
