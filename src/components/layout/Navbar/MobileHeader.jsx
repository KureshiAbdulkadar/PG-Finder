import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useTheme } from '../../../contexts/ThemeContext';

const MobileHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="md:hidden sticky top-0 z-[60] bg-surface border-b border-border shadow-sm px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link to={ROUTES.HOME} className="flex items-center gap-1.5 active:scale-95 transition-transform">
        <img src="/assets/images/logo.svg" alt="PG Finder Logo" className="w-8 h-8" />
        <span className="text-brand-red text-xl font-black tracking-tighter">
          pgfinder
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <button 
           onClick={toggleTheme}
           className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border shadow-sm active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-text-primary text-[22px]">
             {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
           className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border shadow-sm active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-text-primary text-[22px]">search</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-red text-white shadow-md active:scale-90 transition-transform">
          <span className="material-symbols-outlined fill font-variation-fill text-lg">person</span>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
