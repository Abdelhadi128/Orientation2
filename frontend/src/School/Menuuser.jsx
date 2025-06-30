import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menuuser() {
  const schoolId = localStorage.getItem("schoolId");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-40`}
      >
        {/* Header (logo + titre) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-2 overflow-hidden">
            <img src={DALLEEL} className="h-8 w-auto" alt="Logo" />
            {sidebarOpen && (
              <span className="text-lg font-semibold whitespace-nowrap">
                Tawjih 360
              </span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white ml-auto"
            aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <i
              className={`bi ${
                sidebarOpen ? 'bi-chevron-bar-left' : 'bi-chevron-bar-right'
              } text-xl`}
            ></i>
          </button>
        </div>

        {/* Menu items */}
        <ul className="mt-6 flex flex-col space-y-3 px-2">
          <NavLink
            to={`/school/${schoolId}`}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-house-door"></i>
            {sidebarOpen && <span>Tableau de bord</span>}
          </NavLink>

          <NavLink
            to="/Étudiants_connectés"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-person-check"></i>
            {sidebarOpen && <span>Étudiants connectés</span>}
          </NavLink>

          <NavLink
            to="/Étudiants_non_connectés"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-person-x"></i>
            {sidebarOpen && <span>Étudiants non connectés</span>}
          </NavLink>

          <NavLink
            to="/Domaines"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-tags"></i>
            {sidebarOpen && <span>Domaines</span>}
          </NavLink>

          <NavLink
            to="/ecoles"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-building"></i>
            {sidebarOpen && <span>Écoles</span>}
          </NavLink>

          <NavLink
            to="/Evenement"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-2 py-2 rounded ${
                isActive ? 'bg-gray-700 text-blue-600 font-bold' : 'text-white'
              } hover:bg-gray-800`
            }
          >
            <i className="bi bi-calendar-event"></i>
            {sidebarOpen && <span>ÉVÉNEMENTS</span>}
          </NavLink>

          <NavLink
            to="/"
            onClick={() => localStorage.removeItem("schoolId")}
            className="flex items-center space-x-2 px-2 py-2 hover:bg-red-300 font-bold rounded text-white"
          >
            <i className="bi bi-box-arrow-right"></i>
            {sidebarOpen && <span>Déconnexion</span>}
          </NavLink>
        </ul>
      </nav>

      {/* Main content */}
      <div
        className={`transition-all duration-300 h-full p-4
          ${sidebarOpen ? 'ml-64' : 'ml-16'} w-full`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Menuuser;
