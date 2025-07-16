import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EcolesE() {
  const [searchItem, setSearch] = useState("");
  const [ecoles, setEcoles] = useState([]);
  const {state} = useLocation();
  console.log("State from UserPage:", state);
  const ecolesArray = location.state?.ecoles || [];

  useEffect(() => {
    fetchEcoles();
  }, []);

  const fetchEcoles = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/ecoles");
      setEcoles(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des écoles :", err);
    }
  };

  const filteredEcoles = (ecolesArray.length > 0 ? ecolesArray : ecoles).filter((ecole) =>
    ecole.nom.toLowerCase().includes(searchItem.toLowerCase()) ||
    ecole.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    ecole.lieu.toLowerCase().includes(searchItem.toLowerCase()) ||
    ecole.type.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Liste des Écoles</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Rechercher une école..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.grid}>
        {state.ecoles.length > 0 ? (
          state.ecoles.map((ecole, key) => (
            <div key={key} style={styles.card}>
              <img
                src={ecole.img}
                alt={ecole.nom}
                style={styles.image}
              />
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{ecole.nom}</h2>
                <p>{ecole.description}</p>
                <p><strong>Type :</strong> {ecole.type}</p>
                <p><strong>Lieu :</strong> {ecole.lieu}</p>
                <p><strong>Seuil :</strong> {ecole.niveauBac}</p>
              </div>
            </div>
          ))
        ) : (
          <h2 style={styles.noData}>Il n'y a pas d'écoles pour le moment.</h2>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 1200,
    margin: "1rem auto",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #4A90E2 0%, #efefefff 50%, #3e5e81ff 100%)",
    borderRadius: 16,
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  header: {
    textAlign: "center",
    padding: "1rem 0",
    fontWeight: "900",
    fontSize: "2.5rem",
    letterSpacing: "1.5px",
    textShadow: "1px 1px 5px rgba(0,0,0,0.3)",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  search: {
    flex: "1 1 400px",
    padding: "0.75rem 1rem",
    borderRadius: 50,
    border: "none",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
    color: "#0B3954",
    backgroundColor: "#e0f7fa",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1ABC9C",
    textAlign: "center",
  },
  noData: {
    gridColumn: "1 / -1",
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#ffc0cb",
    fontWeight: "bold",
  },
};

export default EcolesE;
