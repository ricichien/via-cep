// Atualizar logradouro e bairro de um Cep do Firestore

const axios = require("axios");

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

module.exports = updateCep