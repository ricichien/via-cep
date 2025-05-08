// Sincronizar Dados do Via-Cep com FireStore

const axios = require("axios");
const { saveCepToFirestore } = require("../services/viaCepService");

async function syncCeps() {
  const url = "https://viacep.com.br/ws/RS/Porto%20Alegre/Domingos/json/";
  try {
    console.log("Fetching data from ViaCEP...");
    const response = await axios.get(url);
    console.log("Received data from ViaCEP:", response.data);

    const ceps = response.data;

    if (!Array.isArray(ceps)) {
      console.error("Unexpected data format from ViaCEP:", ceps);
      throw new Error("Invalid response from ViaCEP");
    }

    for (const cepObj of ceps) {
      console.log("Saving:", cepObj);
      await saveCepToFirestore(cepObj); 
    }

    console.log("Sync completed successfully!");
  } catch (error) {
    console.error("Error syncing CEPs:", error.message);
    console.error("Detailed error:", error.response?.data || error.stack);
    throw new Error("Error syncing the CEPs");
  }
}

module.exports = syncCeps