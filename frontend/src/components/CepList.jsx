import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

export default function CepList({ searchQuery }) {
  const [ceps, setCeps] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchCeps();
  }, []);

  const filteredCeps = ceps.filter((cep) =>
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
      {filteredCeps.map((cep, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col text-sm space-y-0.5">
            <span className="text-base font-semibold text-gray-800">{cep.cep}</span>
            <span className="text-gray-700">{cep.logradouro}</span>
            <span className="text-gray-500">{cep.bairro}</span>
            <span className="text-gray-500">{cep.localidade} - {cep.uf}</span>
          </div>

          <div className="flex flex-col items-center text-gray-400 ml-4">
            <MapPin size={20} />
            <span className="text-xs">{cep.ddd}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
