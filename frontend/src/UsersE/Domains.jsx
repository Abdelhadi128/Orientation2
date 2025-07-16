import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Domains() {
  const [domains, setDomains] = useState([]);
  const [filters, setFilters] = useState({
    lieu: '',
    type: '',
    seuil: '',
    search: ''
  });

  const navigate = useNavigate();

  const fetchEcoles = async () => {
    try {
      const queryParams = {};
      if (filters.lieu) queryParams.lieu = filters.lieu;
      if (filters.type) queryParams.type = filters.type;
      if (filters.seuil) queryParams.seuil = filters.seuil;
      if (filters.search) queryParams.search = filters.search;

      const query = new URLSearchParams(queryParams).toString();
      const url = query
        ? `http://localhost:5001/api/domaines?${query}`
        : `http://localhost:5001/api/domaines`;

      const res = await axios.get(url);
      setDomains(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erreur chargement domaines :", error);
      setDomains([]);
    }
  };

  useEffect(() => {
    fetchEcoles(); // Initial load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  function getEcoles(e, domaine) {
    e.preventDefault();
    alert(`Voir les écoles pour le domaine : ${domaine.nom}`);
    // navigate(`/domaines/${domaine._id}`); si tu utilises React Router
  }

  return (
    <div className="bg-gray-50 min-h-screen px-8 py-6">
      {/* Filtres */}
      {/* <div className="flex items-center justify-start space-x-4 mb-8 flex-wrap gap-4">
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Type</option>
          <option value="public">Public</option>
          <option value="privé">Privé</option>
        </select>

        <input
          type="number"
          name="seuil"
          placeholder="Seuil max"
          value={filters.seuil}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          onClick={fetchEcoles}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
        >
          Filtrer
        </button>
      </div> */}

      {/* Résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {domains.length > 0 ? (
          domains.map((domaine) => (
            <div
              key={domaine._id}
              className="flex flex-col justify-between bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="text-center">
                <h3 className="text-2xl font-extrabold text-indigo-800 mb-3 leading-tight">
                  {domaine.nom}
                </h3>
                <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-5">
                  {domaine.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('ecoles', { state: { ecoles: domaine.ecoles } })}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              >
                Détails
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full italic text-lg mt-20">
            Aucun domaine trouvé.
          </p>
        )}
      </div>
    </div>
  );
}
