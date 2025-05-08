import React, { useState } from "react";
import useCeps from "../../hooks/useCeps";
import { API_ROUTES } from "../../utils/apiRoutes";
import CepDialog from "../Dialog/CepDialog";
import "./CepList.css";
import { Eye, Edit, CheckCircle, XCircle, Star, StarOff } from "lucide-react";

export default function CepList({ searchQuery }) {
  const {ceps, setCeps, loading} = useCeps();
  const [editMode, setEditMode] = useState({});
  const [originalData, setOriginalData] = useState({});
  const [selectedCep, setSelectedCep] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (cepId) => {
    setEditMode((prev) => ({ ...prev, [cepId]: true }));
    setOriginalData((prev) => ({
      ...prev,
      [cepId]: ceps.find((cep) => cep.id === cepId),
    }));
  };

  const handleCancel = (cepId) => {
    setEditMode((prev) => ({ ...prev, [cepId]: false }));
    setCeps((prevCeps) =>
      prevCeps.map((item) =>
        item.id === cepId ? { ...item, ...originalData[cepId] } : item
      )
    );
  };

  const handleSave = async (cepId, updatedData) => {
    try {
      const response = await fetch(API_ROUTES.CEP(cepId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setCeps((prev) =>
          prev.map((cep) => (cep.id === cepId ? { ...cep, ...updatedData } : cep))
        );
        setEditMode((prev) => ({ ...prev, [cepId]: false }));
      }
    } catch (error) {
      console.error("Erro ao atualizar o CEP:", error);
    }
  };

  const handleToggleFavorite = async (cepId, currentStatus) => {
    try {
      const response = await fetch(API_ROUTES.TOGGLE_FAVORITE(cepId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favoritado: !currentStatus }),
      });

      if (response.ok) {
        setCeps((prev) =>
          prev.map((cep) =>
            cep.id === cepId ? { ...cep, favoritado: !currentStatus } : cep
          )
        );
      }
    } catch (error) {
      console.error("Erro ao favoritar o CEP:", error);
    }
  };

  const openDialog = (cep) => {
    setSelectedCep(cep);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedCep(null);
  };

  const filteredCeps = ceps.filter(
    (cep) =>
      cep.cep.includes(searchQuery) ||
      cep.logradouro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cep.bairro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cep.localidade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="loading-text">Carregando CEPs...</div>;

  return (
    <>
      <div className="cep-list">
        {filteredCeps.map((cep) => (
          <div key={cep.id} className="cep-card">

            <div className="cep-info">
              <span className="cep-code">{cep.cep}</span>
              <div className="cep-details">
                {editMode[cep.id] ? (
                  <>
                    <input
                      type="text"
                      defaultValue={cep.logradouro}
                      onChange={(e) =>
                        setCeps((prev) =>
                          prev.map((item) =>
                            item.id === cep.id
                              ? { ...item, logradouro: e.target.value }
                              : item
                          )
                        )
                      }
                    />
                    <input
                      type="text"
                      defaultValue={cep.bairro}
                      onChange={(e) =>
                        setCeps((prev) =>
                          prev.map((item) =>
                            item.id === cep.id
                              ? { ...item, bairro: e.target.value }
                              : item
                          )
                        )
                      }
                    />
                  </>
                ) : (
                  <span className="cep-text">
                    {cep.logradouro + ", " + cep.bairro}
                  </span>
                )}
              </div>
              <span className="cep-location">
                {cep.localidade} - {cep.uf}
              </span>
            </div>

            <div className="cep-actions">
              {editMode[cep.id] ? (
                <>
                  <CheckCircle
                    size={18}
                    onClick={() =>
                      handleSave(cep.id, {
                        logradouro: cep.logradouro,
                        bairro: cep.bairro,
                      })
                    }
                    className="save-icon"
                  />
                  <XCircle
                    size={18}
                    onClick={() => handleCancel(cep.id)}
                    className="cancel-icon"
                  />
                </>
              ) : (
                <Edit
                  size={18}
                  onClick={() => handleEdit(cep.id)}
                  className="edit-icon"
                />
              )}

              {cep.favoritado ? (
                <Star
                  size={18}
                  onClick={() => handleToggleFavorite(cep.id, cep.favoritado)}
                  className="star-icon favorited"
                  title="Remover dos favoritos"
                />
              ) : (
                <StarOff
                  size={18}
                  onClick={() => handleToggleFavorite(cep.id, cep.favoritado)}
                  className="star-icon"
                  title="Adicionar aos favoritos"
                />
              )}

              <Eye
                size={18}
                onClick={() => openDialog(cep)}
                className="eye-icon"
                title="Ver detalhes"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Diálogo de detalhes do CEP */}
      {dialogOpen && selectedCep && (
        <CepDialog cep={selectedCep} isOpen={dialogOpen} onClose={closeDialog} />
      )}
    </>
  );
}