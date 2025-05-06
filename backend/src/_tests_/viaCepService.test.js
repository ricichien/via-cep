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
    favoritado: false
  };

  it("should save CEP data successfully", async () => {
    axios.put.mockResolvedValue({ data: {} });

    await expect(saveCepToFirestore(cepData)).resolves.toBeUndefined();

    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/ceps/90650-063"),
      expect.objectContaining({
        fields: expect.any(Object)
      })
    );
  });

  it("should throw an error when saving fails", async () => {
    axios.put.mockRejectedValue(new Error("Network error"));

    await expect(saveCepToFirestore(cepData)).rejects.toThrow("Failed to save data");
  });
});
