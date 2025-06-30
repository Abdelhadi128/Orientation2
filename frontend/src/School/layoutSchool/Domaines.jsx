import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Domaines() {
    const[domains, setDomains] = useState([])
    useEffect(()=>{
        fetchDomains()
    , []})

    const fetchDomains = async ()=>{
        await axios.get("http://localhost:5001/api/domaines")
            .then((response) => setDomains(response.data))
    }
  return (
    <div>
        <h1 className="text-2xl font-bold text-center mb-6">Liste des Domaines</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {domains.map((domain, key) => (
            <Link
            key={key}
            to="/ecoles"
            state={{ ecoles: domain.ecoles }}
            className="group block bg-gradient-to-br from-white to-gray-50 hover:from-red-50 hover:to-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
            >
            <div className="flex flex-col items-center justify-center text-center space-y-4">

                <div className="bg-red-100 text-red-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-transform duration-300 group-hover:scale-110">
                    {domain.nom.charAt(0)}
                </div>

                <h1 className="text-xl font-semibold text-gray-800 group-hover:text-red-800 transition">
                    {domain.nom}
                </h1>
            </div>
            </Link>
        ))}
        </div>        

    </div>
  )
}
