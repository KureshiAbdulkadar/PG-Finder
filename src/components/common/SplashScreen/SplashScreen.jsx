import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 1700);
    const finishTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-brand-red flex flex-col items-center justify-center transition-opacity duration-300 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.15"/>
            <path d="M24 34C24 34 14 27.5 14 21C14 15.477 18.477 11 24 11C29.523 11 34 15.477 34 21C34 27.5 24 34 24 34Z" fill="white"/>
            <circle cx="24" cy="21" r="4" fill="#E67316"/>
          </svg>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-white mb-8">pgfinder</h1>
      </div>
      {/* Loading spinner */}
      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mt-4"></div>
      <p className="text-white/60 text-sm mt-6">Find your perfect stay</p>
    </div>
  );
};

export default SplashScreen;
