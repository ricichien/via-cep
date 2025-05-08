import React from "react";
import "./CepDialog.css";

export default function CepDialog({ cep, isOpen, onClose }) {
  if (!isOpen || !cep) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose}>×</button>
        <h2>Detalhes do CEP</h2>
        <div className="dialog-content">
          <div className="info-row">
            <strong>CEP:</strong> {cep.cep}
          </div>
          <div className="info-row">
            <strong>Logradouro:</strong> {cep.logradouro}
          </div>
          <div className="info-row">
            <strong>Bairro:</strong> {cep.bairro}
          </div>
          <div className="info-row">
            <strong>Localidade:</strong> {cep.localidade}
          </div>
          <div className="info-row">
            <strong>UF:</strong> {cep.uf}
          </div>
          <div className="info-row">
            <strong>IBGE:</strong> {cep.ibge}
          </div>
          <div className="info-row">
            <strong>GIA:</strong> {cep.gia || "Não disponível"}
          </div>
          <div className="info-row">
            <strong>DDD:</strong> {cep.ddd}
          </div>
          <div className="info-row">
            <strong>SIAFI:</strong> {cep.siafi}
          </div>
        </div>
      </div>
    </div>
  );
}
