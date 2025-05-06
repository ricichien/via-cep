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

async function createCep(req, res) {
  const { cep, logradouro, bairro, localidade, uf } = req.body;

  try {
    const response = await axios.post(`${process.env.FIRESTORE_URL}/ceps`, {
      fields: {
        cep: { stringValue: cep },
        logradouro: { stringValue: logradouro },
        bairro: { stringValue: bairro },
        localidade: { stringValue: localidade },
        uf: { stringValue: uf },
        favoritado: { booleanValue: false }
      }
    });

    res.status(201).json({ message: "CEP created", data: response.data });
  } catch (error) {
    console.error("Error saving:", error.response?.data || error.message);
    res.status(500).json({ error: "Error saving CEP" });
  }
}


// async function createCep(req, res) {
//   const { cep, logradouro, bairro, localidade, uf } = req.body;

//   try {

//     console.log("Firestore URL:", process.env.FIRESTORE_URL);

//     // const response = await axios.put(`${process.env.FIRESTORE_URL}/ceps/${cep}`, {
//     //   fields: {
//     //     cep: { stringValue: cep },
//     //     logradouro: { stringValue: logradouro },
//     //     bairro: { stringValue: bairro },
//     //     localidade: { stringValue: localidade },
//     //     uf: { stringValue: uf },
//     //     favoritado: { booleanValue: false }
//     //   }
//     // });

//     const response = await axios.post(
//       `${process.env.FIRESTORE_URL}/ceps/${cep}`, 
//       {
//         fields: {
//           cep: { stringValue: cep },
//           logradouro: { stringValue: logradouro },
//           bairro: { stringValue: bairro },
//           localidade: { stringValue: localidade },
//           uf: { stringValue: uf },
//           favoritado: { booleanValue: false }
//         }
//       }
//     );
    

//     res.status(201).json({ message: "CEP created", data: response.data });
//   } catch (error) {
//     console.error("Error saving:", error.response?.data || error.message);
//     res.status(500).json({ error: "Error saving CEP" });
//   }
// }

async function favoriteCep(req, res) {
  const cepId = req.params.cep;

  try {
    const response = await axios.patch(`${process.env.FIRESTORE_URL}/ceps/${cepId}?updateMask.fieldPaths=favoritado`, {
      fields: {
        favoritado: { booleanValue: true }
      },
      headers: {
        "If-Match": "*"  // Ensures document exists before updating
      }
    });

    res.status(200).json({ message: `CEP ${cepId} marked as favorite` });
  } catch (error) {
    console.error("Error favoriting CEP:", error.response?.data || error.message);
    res.status(500).json({ error: "Error favoriting CEP" });
  }
}

async function unfavoriteCep(req, res) {
  const cepId = req.params.cep;

  try {
    const response = await axios.patch(`${process.env.FIRESTORE_URL}/ceps/${cepId}?updateMask.fieldPaths=favoritado`, {
      fields: {
        favoritado: { booleanValue: false }
      }
    });

    res.status(200).json({ message: `CEP ${cepId} removed from favorites` });
  } catch (error) {
    console.error("Error unfavoriting CEP:", error.response?.data || error.message);
    res.status(500).json({ error: "Error unfavoriting CEP" });
  }
}

module.exports = {
  createCep,
  listCeps,
  favoriteCep,
  unfavoriteCep,
  syncCeps
};
