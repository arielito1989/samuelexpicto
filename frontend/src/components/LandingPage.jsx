import React from 'react';
import { BsChatSquareQuote } from 'react-icons/bs';
import { FaCloudUploadAlt, FaMicrophoneAlt } from 'react-icons/fa';
import { IoMdContrast } from 'react-icons/io';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section fade-in-section">
        <h1>Comunica Sin Barreras</h1>
        <p>La herramienta de comunicación que da voz a las ideas a través de imágenes. Simple, personal y poderosa.</p>
        <a href="https://github.com/arielito1989/samuelexpicto/releases/download/V0.1.0/Comunicador.Pictografico.Setup.0.0.0.exe" className="cta-button">Descargar Aplicación</a>
      </section>

      <section className="feature-section fade-in-section">
        <div className="feature-card">
          <div className="feature-content">
            <h2>Construye Tu Mundo, Frase a Frase</h2>
            <p>Combina pictogramas de forma intuitiva para expresar pensamientos y necesidades. Observa cómo tus ideas se transforman en una voz clara y fuerte.</p>
          </div>
          <div className="feature-visual">
            <div className="icon-wrapper">
              <BsChatSquareQuote size={70} />
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section fade-in-section">
        <div className="feature-card alt">
          <div className="feature-visual">
            <div className="personalization-icons">
              <div className="icon-wrapper">
                <FaCloudUploadAlt size={50} />
              </div>
              <div className="icon-wrapper">
                <FaMicrophoneAlt size={50} />
              </div>
            </div>
          </div>
          <div className="feature-content">
            <h2>Conexiones Reales, Toques Personales</h2>
            <p>Reemplaza los iconos genéricos con fotos de la vida real. Graba tu voz o la de un ser querido para que cada palabra resuene con familiaridad y afecto.</p>
          </div>
        </div>
      </section>
      
      <section className="feature-section fade-in-section">
        <div className="feature-card">
          <div className="feature-content">
            <h2>Un Espacio Seguro y Enfocado</h2>
            <p>Diseñada para la calma y la concentración. Una interfaz limpia, de alto contraste y libre de distracciones, con un modo oscuro para cuidar la vista y la atención.</p>
          </div>
          <div className="feature-visual">
            <div className="icon-wrapper">
              <IoMdContrast size={70} />
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <h2>Descubre una nueva forma de comunicar.</h2>
        <a href="https://github.com/arielito1989/samuelexpicto/releases/download/V0.1.0/Comunicador.Pictografico.Setup.0.0.0.exe" className="cta-button">Descargar Aplicación</a>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Comunicador Pictográfico</p>
      </footer>
    </div>
  );
};

export default LandingPage;