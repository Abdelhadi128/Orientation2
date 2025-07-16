import React, { useState, useEffect } from "react";

const questions = [
  { id: 1, question: "Aimes-tu les sciences et les mathématiques ?", domaines: { oui: "Sciences", non: "Lettres" } },
  { id: 2, question: "Préfères-tu lire des livres et écrire ?", domaines: { oui: "Lettres", non: "Sciences" } },
  { id: 3, question: "Es-tu intéressé par l'informatique ?", domaines: { oui: "Informatique", non: "" } },
  { id: 4, question: "Aimes-tu les activités artistiques ?", domaines: { oui: "Arts", non: "" } },
  { id: 5, question: "Aimes-tu travailler en groupe ?", domaines: { oui: "Management", non: "" } },
  { id: 6, question: "Es-tu créatif/créative ?", domaines: { oui: "Design", non: "" } },
  { id: 7, question: "Aimes-tu les expériences pratiques ?", domaines: { oui: "Technique", non: "" } },
  { id: 8, question: "Es-tu intéressé par l'économie ?", domaines: { oui: "Économie", non: "" } },
  { id: 9, question: "Aimes-tu enseigner ou partager tes connaissances ?", domaines: { oui: "Pédagogie", non: "" } },
  { id: 10, question: "As-tu le sens de l'organisation ?", domaines: { oui: "Administration", non: "" } },
];

const descriptions = {
  Sciences: "Tu es logique, curieux, tu aimes résoudre des problèmes concrets.",
  Lettres: "Tu as une sensibilité aux mots, à la littérature, tu t’exprimes avec facilité.",
  Informatique: "Tu aimes la technologie, la logique et la création de solutions numériques.",
  Arts: "Tu es créatif, tu ressens le besoin d’exprimer des idées par l’image ou la musique.",
  Management: "Tu aimes organiser, coordonner, travailler en équipe.",
  Design: "Tu es inventif, visuel, tu veux rendre le monde plus beau et pratique.",
  Technique: "Tu aimes construire, réparer, comprendre comment les choses fonctionnent.",
  Économie: "Tu t’intéresses aux chiffres, à l’organisation financière du monde.",
  Pédagogie: "Tu aimes transmettre, aider les autres à apprendre.",
  Administration: "Tu es rigoureux, structuré, tu sais gérer et organiser efficacement.",
};

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full transition-transform duration-300">
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default function TestOrientation({ role, userId }) {
  const [reponses, setReponses] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [domainesChoisis, setDomainesChoisis] = useState(null);

  // Chargement des réponses sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem("orientation_reponses");
    if (saved) setReponses(JSON.parse(saved));
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("orientation_reponses", JSON.stringify(reponses));
  }, [reponses]);

  function handleChange(id, value) {
    setReponses((prev) => ({ ...prev, [id]: value }));
  }

  function handleSubmit() {
    const scoreDomaines = {};

    for (const q of questions) {
      const rep = reponses[q.id];
      if (!rep) continue;
      const domaine = q.domaines[rep];
      if (domaine && domaine.trim() !== "") {
        scoreDomaines[domaine] = (scoreDomaines[domaine] || 0) + 1;
      }
    }

    if (Object.keys(scoreDomaines).length === 0) {
      alert("Merci de répondre à au moins une question.");
      return;
    }

    const domainesTries = Object.entries(scoreDomaines)
      .sort((a, b) => b[1] - a[1])
      .map(([d]) => d);

    setDomainesChoisis({ scoreDomaines, domainesTries });
    setModalOpen(true);
  }

  function handleReset() {
    setReponses({});
    setDomainesChoisis(null);
    setModalOpen(false);
    localStorage.removeItem("orientation_reponses");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Test d'orientation</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-4 p-4 border rounded">
          <p className="mb-2">{q.question}</p>
          <label htmlFor={`q${q.id}_oui`} className="mr-4">
            <input
              id={`q${q.id}_oui`}
              type="radio"
              name={`q${q.id}`}
              value="oui"
              checked={reponses[q.id] === "oui"}
              onChange={() => handleChange(q.id, "oui")}
              className="mr-1"
            />
            Oui
          </label>
          <label htmlFor={`q${q.id}_non`}>
            <input
              id={`q${q.id}_non`}
              type="radio"
              name={`q${q.id}`}
              value="non"
              checked={reponses[q.id] === "non"}
              onChange={() => handleChange(q.id, "non")}
              className="mr-1"
            />
            Non
          </label>
        </div>
      ))}

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 disabled:bg-gray-300"
          disabled={Object.keys(reponses).length === 0}
        >
          Voir mes domaines
        </button>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
        >
          Réinitialiser
        </button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Résultat du test d'orientation</h2>

        {domainesChoisis && (
          <>
            {(() => {
              const maxScore = Math.max(...Object.values(domainesChoisis.scoreDomaines));
              return domainesChoisis.domainesTries.map((domaine, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">
                    {domaine} ({domainesChoisis.scoreDomaines[domaine]} points)
                  </p>
                  <div className="w-full bg-gray-200 rounded h-4 mb-1">
                    <div
                      className="bg-green-500 h-4 rounded transition-all duration-500"
                      style={{
                        width: `${(domainesChoisis.scoreDomaines[domaine] / maxScore) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm italic text-gray-600">{descriptions[domaine]}</p>
                </div>
              ));
            })()}
          </>
        )}

        {role === "simpleuser" && userId && (
          <a
            href={`/user/${userId}`}
            className="mt-4 inline-block text-blue-600 underline"
          >
            Voir les écoles proposées
          </a>
        )}
      </Modal>
    </div>
  );
}
