import React, { useState, useEffect } from "react";
import axios from "axios";

function EtudiantsConnecté() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchitem, setsearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/usersconnected");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur de chargement des utilisateurs", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name: nom, prenom, email };

    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5001/usersconnected/${editingUserId}`, user);
        setEditingUserId(null);
      } else {
        await axios.post("http://localhost:5001/usersconnected", user);
      }

      setNom("");
      setPrenom("");
      setEmail("");

      fetchUsers();
      setShowForm(false);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/usersconnected/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setNom(user.name);
    setPrenom(user.prenom);
    setEmail(user.email);
    setShowForm(true);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchitem.toLowerCase()) ||
      u.prenom.toLowerCase().includes(searchitem.toLowerCase()) ||
      u.email.toLowerCase().includes(searchitem.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Gestion des Utilisateurs</h1>

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={searchitem}
          onChange={(e) => setsearch(e.target.value)}
          style={styles.search}
        />
        <button onClick={() => setShowForm(!showForm)} style={styles.btnAdd}>
          {showForm ? "Fermer le formulaire" : "Ajouter un utilisateur"}
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
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
         <button
  type="submit"
  style={{
    ...styles.btnSubmit,
    backgroundColor: editingUserId ? "#e67e22" : "#1a449fff",
  }}
>
  {editingUserId ? "Modifier" : "Ajouter"}
</button>
        </form>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadTr}>
              <th style={styles.th}>Nom</th>
              <th style={styles.th}>Prénom</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u._id} style={styles.tr}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.prenom}</td>
                  <td style={styles.td}>{u.email}</td>
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
                <td colSpan="4" style={styles.noData}>
                  Aucun utilisateur trouvé
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
      "linear-gradient(135deg, #4fa0fdff 0%, #0e3595ff 50%, #09c4d5ff 100%)", // ألوان متناسقة مع الـ menu (أزرق فاتح + أخضر تركواز)
    borderRadius: 16,
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
    backgroundColor: "#e0f7fa", // خلفية فاتحة لمدخل البحث
  },
  btnAdd: {
    background:
      "linear-gradient(90deg, #16d616ff 0%, #1ABC9C 100%)", // أخضر تركواز متناسق مع menu
    border: "none",
    color: "#0B3954", // كحلي للنص
    padding: "0.75rem 1.5rem",
    fontWeight: "bold",
    fontSize: "1.1rem",
    borderRadius: 50,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(251, 255, 249, 0.24)",
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
    backgroundColor: "#e0f7fa", // نفس خلفية البحث
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
  backgroundColor: "#0eb09fff", // لون افتراضي (مثلا أخضر)
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
    background:
      "linear-gradient(45deg, #4A90E2, #1ABC9C)", // أزرق تركواز
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: 50,
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.3s ease",
  },
  btnDelete: {
    background:
      "linear-gradient(45deg, #e52e71, #ff416c)", // وردي مائل للأحمر، يعطي حيوية لكن متناغم
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


export default EtudiantsConnecté;
