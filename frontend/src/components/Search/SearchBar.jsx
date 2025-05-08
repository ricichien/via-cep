// Barra de Pesquisa
import React from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="searchbar-container">
      <Search size={20} className="search-icon" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Digite o CEP"
        className="search-input"
      />
    </form>
  );
}
