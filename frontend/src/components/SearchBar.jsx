import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Digite o CEP"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    );
  }
  

// export default function SearchBar() {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearchSubmit = async (e) => {
//     e.preventDefault();

//     if (!searchQuery) return;

//     try {
//       const response = await fetch(`http://localhost:3000/ceps/${searchQuery}`);
      
//       if (!response.ok) {
//         alert("CEP não encontrado");
//         return;
//       }

//       const data = await response.json();
//       console.log("CEP encontrado:", data);
//       // Aqui você pode setar no estado global ou levantar o resultado via props para CepList
//     } catch (error) {
//       console.error("Erro ao buscar o CEP:", error);
//       alert("Erro ao buscar o CEP");
//     }
//   };

//   return (
//     <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
//       <Search size={20} className="text-gray-500" />

//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearchChange}
//         placeholder="Digite o CEP"
//         className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </form>
//   );
// }
