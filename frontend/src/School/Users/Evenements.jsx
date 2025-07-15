import React, { useState, useEffect } from "react";
import axios from "axios";

function Evenements() {
  const [events, setevents] = useState([]);
  const [nom, setNom] = useState("");
  const [date, setdate] = useState("");
  const [description, setdescription] = useState("");
  const [lieu, setlieu] = useState("");
  const [editingeventsId, setEditingeventsId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchitem, setsearch] = useState("");

  useEffect(() => {
    fetchevents();
  }, []);

  const fetchevents = async () => {
    const response = await axios.get("http://localhost:5001/events");
    setevents(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = { nom: nom, description, lieu, date };

    try {
      if (editingeventsId) {
        await axios.put(`http://localhost:5001/events/${editingeventsId}`, event);
        setEditingeventsId(null);
      } else {
        await axios.post("http://localhost:5001/events", event);
      }

      setNom("");
      setdescription("");
      setlieu("");
      setdate("");
      fetchevents();
      setShowForm(false);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/events/${id}`);
      fetchevents();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (event) => {
    setEditingeventsId(event._id);
    setNom(event.nom);
    setdescription(event.description);
    setlieu(event.lieu);
    setdate(event.date.slice(0, 10));
    setShowForm(true);
  };

  const filteredEvents = events.filter(
    (u) =>
      u.nom.toLowerCase().includes(searchitem.toLowerCase()) ||
      u.description.toLowerCase().includes(searchitem.toLowerCase()) ||
      u.lieu.toLowerCase().includes(searchitem.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Gestion des Événements</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Rechercher un événement..."
          value={searchitem}
          onChange={(e) => setsearch(e.target.value)}
          style={styles.search}
        />
        <button onClick={() => setShowForm(!showForm)} style={styles.btnAdd}>
          {showForm ? "Fermer le formulaire" : "Ajouter un événement"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Lieu"
            value={lieu}
            onChange={(e) => setlieu(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={{
              ...styles.btnSubmit,
              backgroundColor: editingeventsId ? "#e67e22" : "#27ae60",
            }}
          >
            {editingeventsId ? "Modifier" : "Ajouter"}
          </button>
        </form>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadTr}>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Lieu</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((u) => (
                <tr key={u._id} style={styles.tr}>
                  <td style={styles.td}>{u.nom}</td>
                  <td style={styles.td}>{u.description}</td>
                  <td style={styles.td}>{u.date.slice(0, 10)}</td>
                  <td style={styles.td}>{u.lieu}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(u)} style={styles.btnEdit}>
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(u._id)} style={styles.btnDelete}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.noData}>
                  Aucun événement trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: 960,
    margin: "1rem auto",
    padding: "0 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
background:
      "linear-gradient(135deg, #4fa0fdff 0%, #0e3595ff 50%, #09c4d5ff 100%)", // ألوان متناسقة مع الـ menu (أزرق فاتح + أخضر تركواز)    borderRadius: 16,
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },
  header: {
    textAlign: "center",
    padding: "1.5rem 0",
    fontWeight: "900",
    fontSize: "2.5rem",
    letterSpacing: "2px",
    textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    marginBottom: 24,
  },
  search: {
    flex: "1 1 300px",
    padding: "0.75rem 1rem",
    borderRadius: 50,
    border: "none",
    fontSize: "1rem",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
    color: "#0B3954",
    backgroundColor: "#e0f7fa",
  },
  btnAdd: {
background:
      "linear-gradient(90deg, #16d616ff 0%, #1ABC9C 100%)", // أخضر تركواز متناسق مع menu    border: "none",
    color: "#0B3954",
    padding: "0.75rem 1.5rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    borderRadius: 50,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(126,217,87,0.6)",
    transition: "all 0.3s ease",
    flexShrink: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    margin: "0 auto 2rem",
    gap: 12,
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: 50,
    border: "none",
    outline: "none",
    boxShadow: "inset 0 4px 10px rgba(255 255 255 / 0.3)",
    color: "#0B3954",
    backgroundColor: "#e0f7fa",
  },
  btnSubmit: {
    padding: "0.75rem 1rem",
    borderRadius: 50,
    border: "none",
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: 12,
    boxShadow: "0 5px 30px rgba(0,0,0,0.25)",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 10px",
    minWidth: 650,
  },
  theadTr: {
    backgroundColor: "rgba(255 255 255 / 0.15)",
    borderRadius: 12,
  },
  th: {
    padding: "15px 20px",
    color: "#fff",
    fontWeight: "600",
    textAlign: "left",
  },
  tr: {
    backgroundColor: "rgba(255 255 255 / 0.12)",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
    transition: "background-color 0.3s ease",
  },
  td: {
    padding: "15px 20px",
    color: "#e0f7fa",
    fontWeight: "500",
  },
  btnEdit: {
    marginRight: 12,
    background: "linear-gradient(45deg, #4A90E2, #1ABC9C)",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 50,
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.3s ease",
  },
  btnDelete: {
    background: "linear-gradient(45deg, #e52e71, #ff416c)",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 50,
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.3s ease",
  },
  noData: {
    padding: "2rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#ffc0cb",
  },
};

export default Evenements;
