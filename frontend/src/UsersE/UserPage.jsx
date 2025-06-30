import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './Chatbot';
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';


export default function UserPage() {
  const { id } = useParams();
  const location = useLocation()
  const userData = location.state
  // const [ecoles, setEcoles] = useState([]);
  const [domains, setDomains] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    lieu: '',
    type: '',
    seuil: '',
    search: ''
  });
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchEcoles();
  }, [id]);

  const handleSubmitQuestion = async () => {
    if (!questionEmail.trim() || !questionText.trim()) {
      alert('Merci de remplir email et question.');
      return;
    }
    setSubmitLoading(true);
    try {
      await axios.post('http://localhost:5001/questions', {
        email: questionEmail,
        question: questionText,
      });
      toast.success('Merci pour nous contacter. Le conseiller va te répondre par email.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setQuestionEmail('');
      setQuestionText('');
      setModalOpen(false);
    } catch (error) {
      alert('Erreur lors de l\'envoi de la question.');
      console.error(error);
    }
    setSubmitLoading(false);
  };

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
      console.error("Erreur chargement écoles :", error);
      setDomains([]);
    }
  };
        // console.log(domains)


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const toggleDropdown = ()=>{
    setIsOpen(!isOpen)
  }

  const getEcoles = (e, domaine)=>{
    e.preventDefault()
    console.log(domaine.ecoles)
    navigate(`ecoles`, {state:{ecoles : domaine.ecoles}})
  }
  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-gray-100 shadow">
        <div className="flex items-center space-x-4">
          {/* <img src={DALLEEL} className="h-8" alt="Logo" /> */}
          <span className="font-bold text-xl">DALLEL</span>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="search"
              placeholder="Rechercher...🔎 "
              value={filters.search}
              onChange={handleChange}
              onClick={fetchEcoles}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchEcoles(); }}
              className="border rounded px-3 py-1 w-64"
            />
          </div>
        
          <div>
              <button type="button" onClick={toggleDropdown}  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button"  aria-expanded={isOpen ? 'true' : 'false'} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                    {userData?.photoProfile ? (
                        <img className="w-8 h-8 rounded-full" src={userData.photoProfile} alt="user photo" />
                    ) : (
                        <FaUserCircle size={30} color='white'/>
                )}
              </button>
              <div className={`z-50 ${isOpen ? '' : 'hidden'} absolute right-0 top-8 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                  <div className="px-4 py-3">
                      {userData ? <>
                        <span className="block text-sm text-gray-900 dark:text-white">{userData.name} {userData.prenom}</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userData.email}</span>
                        </> : <p>Chargement du profil...</p>
                    }
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link to={'/test'} state={userData} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Test Orientation</Link>
                    </li>
                    <li>
                        <button onClick={() => setModalOpen(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Questions </button>
                    </li>
                    <li>
                      {/* <Link to={'/g/profile'} state={userData} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link> */}
                    </li>
                    <li>
                      <button onClick={()=>handleLogout()} className="block w-full hover:bg-red-500  text-left  px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Déconnecter </button>
                    </li>
                  </ul>
              </div>
          </div>
          </div>
      </nav>

      {/* Zone filtres */}
      <div className="flex items-center justify-right space-x-4 mt-4 mb-8 px-6 flex-wrap gap-4">
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
      </div>

      {/* Liste écoles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-8 py-6 bg-gray-50 min-h-screen">
        {Array.isArray(domains) && domains.length > 0 ? (
          domains.map((domaine) => (
            <div
              key={domaine._id}
              className="flex flex-col justify-between bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className='text-center'>
                <h3 className="text-2xl font-extrabold text-indigo-800 mb-3 leading-tight">
                  {domaine.nom}
                </h3>
                <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-5">
                  {domaine.description}
                </p>
              </div>

              <button
                type="submit"
                onClick={(e) => getEcoles(e, domaine)}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
              >
                Détails
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full italic text-lg mt-20">
            Aucune école trouvée.
          </p>
        )}
      </div>

      <div>
        <Outlet/>
      </div>

      {/* Message de confirmation */}
      {confirmationMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded max-w-4xl mx-auto mt-4">
          {confirmationMessage}
        </div>
      )}

      {/* Modal Questions */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Pose ta question</h2>

            <input
              type="email"
              placeholder="Ton email"
              value={questionEmail}
              onChange={(e) => setQuestionEmail(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <textarea
              rows="4"
              placeholder="Ta question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={submitLoading}
              >
                Annuler
              </button>

              <button
                onClick={handleSubmitQuestion}
                disabled={submitLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {submitLoading ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        </div>
      )}
{/* Chatbot d'orientation */}
<div className="mt-12 px-6">
  <Chatbot />
</div>

      <br />
      <Footer />
      <ToastContainer />

    </div>
  );
}
