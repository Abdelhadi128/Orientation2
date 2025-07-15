import React, { useState } from 'react';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {
  const [nom, setnom] = useState('');
  const [email, setemail] = useState('');
  const [sujet, setsujet] = useState('');
  const [message, setmessage] = useState('');

  const notifySuccess = (msg) => toast.success(msg, { position: "top-right" });
  const notifyError = (msg) => toast.error(msg, { position: "top-right" });

  const SubmitContactform = async (e) => {
    e.preventDefault();

    const formData = { nom, email, sujet, message };

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        notifySuccess(result.message);
        setnom("");
        setemail("");
        setsujet("");
        setmessage("");
      } else {
        notifyError(result.message);
      }
    } catch (error) {
      notifyError("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Top Info Bar */}



  <section className="relative pt-20 bg-gradient-to-r from-blue-500 to-blue-300 text-white py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            Contactez l'équipe <span className="underline decoration-yellow-300">DALLEL</span>
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

      {/* Section Contact */}
      <div className="container mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Informations */}
          <div className="space-y-6">
            {[
              { icon: 'map-marker-alt ', title: 'Adresse', text: 'Casablanca, Maroc' },
              { icon: 'phone-alt ', title: 'Appelez-nous', text: '+212 6 1234 5678' },
              { icon: 'envelope ', title: 'Email', text: 'contact@dallel.com' },
            ].map((item, idx) => (
              <div key={idx} className="flex bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="p-3 rounded-full">
                  <i className={`fa fa-${item.icon}  text-blue-600 text-xl`}></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500">{item.title}</p>
                  <h5 className="text-lg font-semibold">{item.text}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-6 text-sky-700">Envoyez-nous un message</h2>
            <form onSubmit={SubmitContactform}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={nom} placeholder="Votre nom" className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-400" required onChange={(e) => setnom(e.target.value)} />
                <input type="email" value={email} placeholder="Votre email" className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-sky-400" required onChange={(e) => setemail(e.target.value)} />
              </div>
              <input type="text" value={sujet} placeholder="Sujet" className="p-3 border rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-sky-400" required onChange={(e) => setsujet(e.target.value)} />
              <textarea value={message} placeholder="Votre message" className="p-3 border rounded-lg w-full mt-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-sky-400" required onChange={(e) => setmessage(e.target.value)}></textarea>
              <ToastContainer />
              <button type="submit" className="mt-6 bg-sky-500 text-white font-medium px-6 py-3 rounded-lg w-full hover:bg-sky-600 transition">
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-14 rounded-xl overflow-hidden shadow-md">
          <iframe
            className="w-full h-[400px] border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107049.24673872803!2d-7.684973944456687!3d33.572411002383825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd267f21d0e9%3A0x81d2a00c0c8db0b7!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1649865246325"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
