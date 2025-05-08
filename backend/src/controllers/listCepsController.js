// Listagem de Ceps do Firestore

const axios = require("axios");

async function listCeps(req, res) {
  try {
    const response = await axios.get(`${process.env.FIRESTORE_URL}/ceps`);
    const documents = response.data.documents || [];

    const ceps = documents.map(doc => {
      const data = doc.fields;
      return {
        id: doc.name.split("/").pop(),
        cep: data.cep?.stringValue || "",
        logradouro: data.logradouro?.stringValue || "",
        bairro: data.bairro?.stringValue || "",
        localidade: data.localidade?.stringValue || "",
        uf: data.uf?.stringValue || "",
        favoritado: data.favoritado?.booleanValue || false,
        ibge: data.ibge?.stringValue || "",
        gia: data.gia?.stringValue || "",
        ddd: data.ddd?.stringValue || "",
        siafi: data.siafi?.stringValue || "",
      };
    });    

    res.status(200).json(ceps);
  } catch (error) {
    console.error("Error listing CEPs:", error.response?.data || error.message);
    res.status(500).json({ error: "Error listing CEPs" });
  }
}

module.exports = listCeps