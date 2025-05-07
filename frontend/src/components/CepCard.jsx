import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CepList from './CepList';

export default function CepCard() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed bottom-4 right-4 w-[375px] max-h-[90vh] bg-white shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
      <div className="flex-1 p-4 flex flex-col space-y-4">
        {/* Passa o estado e a função para atualizar o campo de busca */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        {/* Lista os CEPs com base na busca */}
        <div className="flex-1 overflow-y-auto p-4">
          <CepList searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}
