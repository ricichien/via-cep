const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

describe("PATCH /ceps/:cep/favorite", () => {
  it("should toggle favorite status", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        fields: {
          favoritado: { booleanValue: false },
        },
      },
    });

    axios.patch.mockResolvedValueOnce({});

    const res = await request(app).patch("/ceps/12345678/toggle-favorite");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/marked as favorite/i);
  });
});
