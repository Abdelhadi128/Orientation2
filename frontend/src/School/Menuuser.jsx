import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Menuuser() {
  const schoolId = localStorage.getItem("schoolId");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { to: `/school/${schoolId}`, icon: "bi-house-door", label: "Tableau de bord" },
    { to: "/Étudiants_connectés", icon: "bi-person-check", label: "Étudiants connectés" },
    { to: "/Étudiants_non_connectés", icon: "bi-person-x", label: "Étudiants non connectés" },
    { to: "/Domaines", icon: "bi-tags", label: "Domaines" },
    { to: "/ecoles", icon: "bi-building", label: "Écoles" },
    { to: "/Evenement", icon: "bi-calendar-event", label: "ÉVÉNEMENTS" },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <nav style={{ ...styles.sidebar, width: sidebarOpen ? 240 : 64 }}>
        {/* Header */}
        <div style={styles.header}>
          <img src={DALLEEL} alt="Logo" style={styles.logo} />
          {sidebarOpen && <span style={styles.title}>DALLEL</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
            style={styles.toggleBtn}
          >
            <i
              className={`bi ${sidebarOpen ? 'bi-chevron-bar-left' : 'bi-chevron-bar-right'}`}
              style={{ fontSize: 20, color: '#0B3954' }}
            />
          </button>
        </div>

        {/* Menu items */}
        <ul style={styles.navList}>
          {navItems.map(({ to, icon, label }) => (
            <li key={label} style={styles.navItem}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.activeLink : {}),
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                })}
                title={label}
              >
                <i className={`bi ${icon}`} style={styles.icon} />
                {sidebarOpen && <span>{label}</span>}
              </NavLink>
            </li>
          ))}

          <li style={{ marginTop: 'auto' }}>
            <NavLink
              to="/"
              onClick={() => localStorage.removeItem("schoolId")}
              style={{ ...styles.navLink, ...styles.logoutLink, justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
              title="Déconnexion"
            >
              <i className="bi bi-box-arrow-right" style={styles.icon} />
              {sidebarOpen && <span>Déconnexion</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main style={{ ...styles.mainContent, marginLeft: sidebarOpen ? 240 : 64 }}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f9fafb', // خلفية فاتحة جدا وناعمة
    color: '#0B3954', // كحلي داكن للنصوص لراحة العين
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#4A90E2', // أزرق فاتح مريح
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    zIndex: 1000,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 16px',
    borderBottom: '1px solid #357ABD',
    position: 'relative',
  },
  logo: {
    height: 32,
    width: 'auto',
  },
  title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '700',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  toggleBtn: {
    position: 'absolute',
    right: 12,
    background: 'none',
    border: 'none',
    color: '#0B3954',
    cursor: 'pointer',
    padding: 0,
  },
  navList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  navItem: {
    width: '100%',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    color: '#e0e7ff', // أزرق فاتح للنصوص على الخلفية الزرقاء
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: 15,
    transition: 'background-color 0.25s ease',
    borderRadius: 8,
  },
  activeLink: {
    backgroundColor: '#ffffff42', // أخضر فاتح للنشاط، يعطي حيوية وراحة
    color: '#0B3954',
    fontWeight: '700',
  },
  icon: {
    fontSize: 20,
    marginRight: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  logoutLink: {
    backgroundColor: '#EF6F6C', // أحمر فاتح دافئ للزر
    margin: 16,
    borderRadius: 8,
    justifyContent: 'flex-start',
    fontWeight: '700',
    transition: 'background-color 0.25s ease',
    color: '#fff',
  },
  mainContent: {
    flexGrow: 1,
    padding: 24,
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
    backgroundColor: '#fff',
    overflowY: 'auto',
  },
};

export default Menuuser;
