const axios = require("axios");
const { FIRESTORE_URL } = require("../config/firestore");

// Criar novo CEP
async function criarCep(req, res) {
  const { cep, logradouro, bairro, localidade, uf } = req.body;

  try {
    const response = await axios.post(`${FIRESTORE_URL}/ceps`, {
      fields: {
        cep: { stringValue: cep },
        logradouro: { stringValue: logradouro },
        bairro: { stringValue: bairro },
        localidade: { stringValue: localidade },
        uf: { stringValue: uf },
        favorited: { booleanValue: false }
      }
    });

    res.status(201).json({ message: "CEP criado", data: response.data });
  } catch (error) {
    console.error("Erro ao salvar:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro ao salvar CEP" });
  }
}

module.exports = { criarCep };
