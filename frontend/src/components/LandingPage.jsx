import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Section 1: Hero */}
      <section className="hero-section">
        <h1>Desbloquea la comunicación, una imagen a la vez</h1>
        <p>La aplicación amigable que transforma imágenes en voz, ayudando a expresar ideas y sentimientos.</p>
        <button className="cta-button">Descargar Aplicación</button>
      </section>

      {/* Section 2: How it works */}
      <section className="feature-section">
        <div className="feature-content">
          <h2>Crea frases, palabra por palabra</h2>
          <p>Elige pictogramas para construir tus ideas. La aplicación las convierte en una frase y la lee en voz alta. ¡Es una forma sencilla y poderosa de compartir lo que piensas!</p>
        </div>
        <div className="feature-visual">
          <img src="https://images.undraw.co/i/svg/undraw_conversation_re_c26v.svg?color=007bff" alt="Ilustración de dos personas conversando" className="feature-image" />
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="feature-section alt">
        <div className="feature-visual">
          <img src="https://images.undraw.co/i/svg/undraw_personalization_re_grty.svg?color=28a745" alt="Ilustración de una persona personalizando su perfil" className="feature-image" />
        </div>
        <div className="feature-content">
          <h2>Hazla tuya, con tu voz y tus fotos</h2>
          <p>Ve más allá de los pictogramas genéricos. Usa fotos de tus lugares, personas y objetos favoritos. Graba tu propia voz o la de un ser querido para que la comunicación sea aún más personal y especial.</p>
        </div>
      </section>
      
      <section className="feature-section">
        <div className="feature-content">
          <h2>Un diseño pensado para la calma</h2>
          <p>Sabemos que un entorno tranquilo es clave. Por eso, la interfaz es limpia, con alto contraste y sin distracciones. Activa el modo oscuro para una experiencia visual más relajada.</p>
        </div>
        <div className="feature-visual">
          <img src="https://images.undraw.co/i/svg/undraw_design_components_re_hhtx.svg?color=ffc107" alt="Ilustración de componentes de interfaz de usuario" className="feature-image" />
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="final-cta-section">
        <h2>Empieza a comunicarte sin límites</h2>
        <button className="cta-button">Descargar Aplicación</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Comunicador Pictográfico</p>
      </footer>
    </div>
  );
};

export default LandingPage;