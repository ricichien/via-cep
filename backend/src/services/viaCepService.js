const axios = require("axios");

const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/via-cep-234ca/databases/(default)/documents`;

async function saveCepToFirestore(cepData) {
  const cep = cepData.cep;

  const document = {
    fields: {
      cep: { stringValue: cep },
      logradouro: { stringValue: cepData.logradouro || '' },
      bairro: { stringValue: cepData.bairro || '' },
      localidade: { stringValue: cepData.localidade || '' },
      uf: { stringValue: cepData.uf || '' },
      ddd: { stringValue: cepData.ddd || '' },
      gia: { stringValue: cepData.gia || '' },
      ibge: { stringValue: cepData.ibge || '' },
      siafi: { stringValue: cepData.siafi || '' },
      favoritado: { booleanValue: cepData.favoritado || false }
    }
  };

  try {
    await axios.post(`${FIRESTORE_URL}/ceps`, document);
  } catch (error) {
    console.error("Error saving CEP:", error.response?.data || error.message);
    throw new Error("Failed to save data");
  }
}

module.exports = {
  saveCepToFirestore
};
