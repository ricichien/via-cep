// Favoritar ou Desfavoritar um Cep do Firestore

const axios = require("axios");

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

module.exports = toggleFavoriteCep