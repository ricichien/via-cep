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
      };
    });

    res.status(200).json(ceps);
  } catch (error) {
    console.error("Error listing CEPs:", error.response?.data || error.message);
    res.status(500).json({ error: "Error listing CEPs" });
  }
}

async function updateCep(req, res) {
  const { cep } = req.params;  
  const { logradouro, bairro } = req.body;  

  try {

    const docRef = `${process.env.FIRESTORE_URL}/ceps/${cep}`;
    const currentDoc = await axios.get(docRef); 
    
    const data = currentDoc.data.fields;
    
    const updatedData = {
      ...data,
      logradouro: { stringValue: logradouro || data.logradouro.stringValue }, 
      bairro: { stringValue: bairro || data.bairro.stringValue }, 
    };

    const response = await axios.patch(docRef, {
      fields: updatedData
    });

    res.status(200).json({ message: `CEP ${cep} updated successfully!`, data: response.data });
  } catch (error) {
    console.error("Error updating CEP:", error.response?.data || error.message);
    res.status(500).json({ error: "Error updating the CEP" });
  }
}

async function toggleFavoriteCep(req, res) {
  const cepId = req.params.cep;

  try {
    const currentDoc = await axios.get(`${process.env.FIRESTORE_URL}/ceps/${cepId}`);
    const currentFavoritado = currentDoc.data.fields.favoritado.booleanValue;

    const newFavoritado = !currentFavoritado;

    const response = await axios.patch(`${process.env.FIRESTORE_URL}/ceps/${cepId}?updateMask.fieldPaths=favoritado`, {
      fields: {
        favoritado: { booleanValue: newFavoritado }
      }
    });

    res.status(200).json({
      message: `CEP ${cepId} ${newFavoritado ? 'marked as favorite' : 'removed from favorites'}`,
    });
  } catch (error) {
    console.error("Error toggling favorite status for CEP:", error.response?.data || error.message);
    res.status(500).json({ error: "Error toggling favorite status for CEP" });
  }
}

module.exports = {
  listCeps,
  toggleFavoriteCep,
  syncCeps,
  updateCep,
};