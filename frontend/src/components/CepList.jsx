import React, { useEffect, useState } from 'react';
import { MapPin, Edit, CheckCircle } from 'lucide-react';

export default function CepList({ searchQuery }) {
  const [ceps, setCeps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({});  // Estado para controlar o modo de edição

  // Função para buscar os CEPs
  const fetchCeps = async () => {
    try {
      const res = await fetch('http://localhost:3000/list');
      const data = await res.json();

      if (Array.isArray(data) && data.length === 0) {
        console.log('Lista vazia, sincronizando...');
        await fetch('http://localhost:3000/sync');
        const resAfterSync = await fetch('http://localhost:3000/list');
        const syncedData = await resAfterSync.json();
        setCeps(syncedData);
      } else {
        setCeps(data);
      }
    } catch (error) {
      console.error('Erro ao buscar ou sincronizar CEPs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para editar o CEP
  const handleEdit = (cepId) => {
    setEditMode((prev) => ({ ...prev, [cepId]: true }));
  };

  // Função para salvar a edição
  const handleSave = async (cepId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/ceps/${cepId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedCeps = ceps.map((cep) =>
          cep.id === cepId ? { ...cep, ...updatedData } : cep
        );
        setCeps(updatedCeps);
        setEditMode((prev) => ({ ...prev, [cepId]: false }));  // Desabilitar o modo de edição
      }
    } catch (error) {
      console.error('Erro ao atualizar o CEP:', error);
    }
  };

  useEffect(() => {
    fetchCeps();
  }, []);

  const filteredCeps = ceps.filter(
    (cep) =>
      cep.cep.includes(searchQuery) ||
      cep.logradouro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cep.bairro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cep.localidade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-gray-500">Carregando CEPs...</div>;
  }

  return (
    <div className="space-y-4">
      {filteredCeps.map((cep) => (
        <div
          key={cep.id}
          className="flex justify-between items-center bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col text-sm space-y-0.5">
            <span className="text-base font-semibold text-gray-800">{cep.cep}</span>
            <div className="flex items-center space-x-2">
              {editMode[cep.id] ? (
                <>
                  <input
                    type="text"
                    defaultValue={cep.logradouro}
                    onChange={(e) =>
                      setCeps((prevCeps) =>
                        prevCeps.map((item) =>
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
                      setCeps((prevCeps) =>
                        prevCeps.map((item) =>
                          item.id === cep.id
                            ? { ...item, bairro: e.target.value }
                            : item
                        )
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <span className="text-gray-700">{cep.logradouro}</span>
                  <span className="text-gray-500">{cep.bairro}</span>
                </>
              )}
            </div>
            <span className="text-gray-500">{cep.localidade} - {cep.uf}</span>
          </div>

          <div className="flex flex-col items-center text-gray-400 ml-4">
            <MapPin size={20} />
            <span className="text-xs">{cep.ddd}</span>

            {editMode[cep.id] ? (
              <CheckCircle
                size={24}
                onClick={() => handleSave(cep.id, { logradouro: cep.logradouro, bairro: cep.bairro })}
                className="cursor-pointer text-green-500 mt-2"
              />
            ) : (
              <Edit
                size={24}
                onClick={() => handleEdit(cep.id)}
                className="cursor-pointer text-gray-500 mt-2"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}