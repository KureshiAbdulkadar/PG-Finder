import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import SplashScreen from './components/common/SplashScreen/SplashScreen.jsx';
import './i18n';

const RootComponent = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const hasVisited = sessionStorage.getItem('splashShown');
  const showSplash = isStandalone || !hasVisited;
  const [splashFinished, setSplashFinished] = useState(!showSplash);

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setSplashFinished(true);
  };

  if (!splashFinished) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
)
