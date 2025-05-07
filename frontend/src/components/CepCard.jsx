import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CepList from './CepList';

export default function CepCard() {
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <div className="fixed bottom-4 right-4 w-[375px] max-h-[90vh] bg-white shadow-2xl z-50 flex flex-col border border-gray-200">
        <div className="p-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        
        {/* Scroll visível aqui */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <CepList searchQuery={searchQuery} />
        </div>
      </div>
    );
  }
  
