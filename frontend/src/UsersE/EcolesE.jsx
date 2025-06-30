import React, { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";

function EcolesE() {
  const [searchItem, setSearch] = useState("");
  const location = useLocation() ;
  const ecolesArray = location.state.ecoles
//   const ecoles = location.state.ecoles || [];

  useEffect(()=>{
    
  })
  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Liste des écoles</h1>

      {/* <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Rechercher une école..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div> */}

      <div className="overflow-x-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            ecolesArray.length > 0 ? ecolesArray.map((ecole, key) => (
              <div
                key={key}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden text-left"
              >
                <img
                  src={ecole.img}
                  alt={ecole.nom}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
                    {ecole.nom}
                  </h2>
                  <p>{ecole.description}</p>
                  <p><strong>Type : </strong>{ecole.type}</p>
                  <p><strong>Lieu : </strong> {ecole.lieu}</p>
                  <p><strong>seuil de la dérniére année : </strong>{ecole.niveauBac}</p>
                </div>
              </div>
            )) : <h2 className="text-2xl">Il n'y a pas d'écoles pour le moment. </h2>
           }
        </div>
      </div>
    </div>
  );
}

export default EcolesE;
