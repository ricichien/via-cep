import React, { useState } from "react";
import SearchBar from "../Search/SearchBar";
import CepList from "../List/CepList";
import Map from "../Map/Map";
import "./CepCard.css";

export default function CepCard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="cep-card-background">
      <div className="map-fullscreen">
        <Map />
      </div>

      <div className="cep-card-right-container">
        <div className="cep-card-floating">
          <div className="cep-card-content">

            <div className="search-bar-container">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="cep-list-container">
              <CepList searchQuery={searchQuery} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
