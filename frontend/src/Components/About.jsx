import React from "react";
import AboutImage from "../assets/aboutImage.jpeg";
import Menu from "./Menu";
import Footer from "./Footer";
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Menu />
      {/* Hero */}
      <section className="relative pt-20 bg-gradient-to-r from-blue-500 to-blue-300 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Bienvenue chez <span className="underline decoration-yellow-300">DALLEL</span>
          </h1>
          <p className="text-xl max-w-xl mx-auto font-light">
            Une solution complète pour accompagner vos étudiants dans leur orientation scolaire.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{height: "80px"}}>
          <svg
            className="relative block w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1440 80"
          >
            <path
              fill="#ffffff"
              d="M0,0 C480,80 960,0 1440,80 L1440,0 L0,0 Z"
            />
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-stretch">
        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-700">
            Notre mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            DALLEL aide votre école à offrir un accompagnement personnalisé et efficace à chaque étudiant. Gérez facilement les profils de vos élèves et guidez-les vers les filières qui leur correspondent.
          </p>

          <h3 className="text-2xl font-semibold mb-5 text-blue-600">Fonctionnalités clés</h3>
          <ul className="space-y-5 text-gray-700 text-lg">
            {[
              "Gestion simple et centralisée des étudiants",
              "Tests d'orientation adaptés à chaque profil",
              "Comparaison objective des établissements et filières",
              "Accès à des ressources pédagogiques pour vos élèves",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 hover:text-blue-600 transition-colors cursor-default">
                <FaCheckCircle className="text-yellow-400 text-2xl flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 h-full">
          <img
            src={AboutImage}
            alt="Accompagnement scolaire"
            className="w-full h-full object-cover"
          />
        </div> 
      </section>

      {/* Commitment */}
      <section className="bg-blue-50 py-20 px-8 text-center max-w-4xl mx-auto rounded-3xl shadow-lg">
        <h3 className="text-3xl font-semibold mb-6 text-blue-700">
          Notre engagement
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto tracking-wide">
          Fournir aux écoles des outils fiables, simples et accessibles pour guider efficacement chaque étudiant vers son avenir.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;
