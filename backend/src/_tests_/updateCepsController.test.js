const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

describe("PATCH /ceps/:cep", () => {
  it("should update CEP data", async () => {
    const mockData = {
      data: {
        fields: {
          logradouro: { stringValue: "Old Street" },
          bairro: { stringValue: "Old Bairro" },
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockData);
    axios.patch.mockResolvedValueOnce({ data: {} });

    const res = await request(app)
      .patch("/ceps/12345678")
      .send({ logradouro: "New Street", bairro: "New Bairro" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/updated successfully/i);
  });
});
