import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import DALLEEL from '../assets/DALEEL.png';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from './Chatbot';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function UserPage() {
  const { id } = useParams();
  const location = useLocation();
  const userData = location.state;

  const [domains, setDomains] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // for user dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // for mobile nav menu

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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getEcoles = (e, domaine) => {
    e.preventDefault();
    console.log(domaine.ecoles);
    navigate(`ecoles`, { state: { ecoles: domaine.ecoles } });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left part with logo */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={DALLEEL} className="h-8" alt="Logo" />
              <span className="self-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 animate-smoothPulse">DALLEL</span>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link to={'/test'} state={userData} className="font-bold px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-100 rounded-md dark:text-gray-200 dark:hover:text-white">Test Orientation</Link>
              <Link to={`/user/${id}`} relative="path" state={userData} className="font-bold px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-100 rounded-md dark:text-gray-200 dark:hover:text-white">Domaines</Link>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="font-bold px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 rounded-md dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              >
                Questions
              </button>
              <button
                onClick={handleLogout}
                className="font-bold px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 hover:text-rose-600 rounded-md dark:hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white cursor-pointer"
              >
                Déconnecter
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* User profile dropdown (desktop) */}
            <div className="hidden md:block relative ml-4">
              <div>
                <button
                type="button"
                className="text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                aria-label="User profile"
              >
                {userData?.photoProfile ? (
                  <img className="w-8 h-8 rounded-full" src={userData.photoProfile} alt="user photo" />
                ) : (
                  <FaUserCircle size={30} color="white" />
                )}
              </button>

              </div>
              {/* Dropdown menu */}
              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <ul>
                    <li>
                      <Link to={'/test'} state={userData} className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" role="menuitem" tabIndex="-1">
                        Test Orientation
                      </Link>
                    </li>
                    <li>
                      <Link to={`/user/${id}`} relative="path" state={userData} className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" role="menuitem" tabIndex="-1">
                        Domaines
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => { setModalOpen(true); setIsOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        role="menuitem"
                        tabIndex="-1"
                      >
                        Questions
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 hover:text-rose-600 dark:hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white"
                        role="menuitem"
                        tabIndex="-1"
                      >
                        Déconnecter
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600">
          {/* Profile icon in mobile menu */}
          <div className="flex items-center justify-center py-4 border-b border-gray-200 dark:border-gray-700">
            {userData?.photoProfile ? (
              <img
                className="w-12 h-12 rounded-full"
                src={userData.photoProfile}
                alt="user photo"
              />
            ) : (
              <FaUserCircle size={48} color="#3B82F6" />
            )}
          </div>
            <ul className="px-2 pt-2 pb-3 space-y-1">
              <li>
                <Link
                  to={'/test'}
                  state={userData}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-bold text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                  Test Orientation
                </Link>
              </li>
              <li>
                <Link
                  to={`/user/${id}`}
                  relative="path"
                  state={userData}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-bold text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                  Domaines
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                  Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-bold text-blue-500 hover:bg-gray-100 hover:text-rose-600 dark:hover:bg-gray-700 dark:text-gray-200"
                >
                  Déconnecter
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="pt-20"> {/* padding top to offset fixed navbar */}
        <Outlet />
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
      {/* <ToastContainer /> */}
    </div>
  );
}
