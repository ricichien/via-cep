const request = require("supertest");
const app = require("../app");
const axios = require("axios");

jest.mock("axios");

describe("POST /ceps", () => {
  it("should sync CEPs from ViaCEP", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { cep: "12345678", logradouro: "Rua A" },
        { cep: "87654321", logradouro: "Rua B" },
      ],
    });

    axios.post.mockResolvedValue({});

    const res = await request(app).get("/sync");

    expect(res.statusCode).toBe(200); 
  });
});
