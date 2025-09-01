import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import LandingPage from './components/LandingPage.jsx';

// The 'electronAPI' global is defined in 'preload.js' and only available in the Electron environment.
const isElectron = window.electronAPI;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isElectron ? <App /> : <LandingPage />}
  </StrictMode>,
);