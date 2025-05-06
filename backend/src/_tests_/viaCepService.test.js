const axios = require("axios");
const { saveCepToFirestore } = require("../services/viaCepService");

jest.mock("axios");

describe("saveCepToFirestore", () => {
  const cepData = {
    cep: "90650-063",
    logradouro: "Rua Domingos Crescêncio",
    bairro: "Azenha",
    localidade: "Porto Alegre",
    uf: "RS",
    ddd: "51",
    gia: "",
    ibge: "4314902",
    siafi: "8801",
    favorited: false
  };

  it("should save CEP data successfully", async () => {
    axios.post.mockResolvedValue({ data: {} });

    await expect(saveCepToFirestore(cepData)).resolves.toBeUndefined();

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/ceps"),
      expect.objectContaining({
        fields: expect.any(Object)
      })
    );
  });

  it("should throw an error when saving fails", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    await expect(saveCepToFirestore(cepData)).rejects.toThrow();
  });
});
