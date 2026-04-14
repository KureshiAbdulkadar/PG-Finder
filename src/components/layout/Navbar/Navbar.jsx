import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import AuthModal from '../../auth/AuthModal';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useTheme } from '../../../contexts/ThemeContext';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout, isAdmin } = useAuth();
  const { wishlist } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const [predictions, setPredictions] = useState([]);
  const [autocompleteService, setAutocompleteService] = useState(null);

  // Initialize Google Maps Autocomplete Service
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setAutocompleteService(new window.google.maps.places.AutocompleteService());
    }
  }, []);

  // Fetch predictions from Google Places
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 1 && autocompleteService) {
      autocompleteService.getPlacePredictions(
        { 
          input: trimmedQuery, 
          componentRestrictions: { country: 'in' },
          types: ['(cities)']
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setPredictions(results);
          } else {
            setPredictions([]);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  }, [searchQuery, autocompleteService]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (q) => {
    const query = q || searchQuery;
    if (query) {
      navigate(`/search?location=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="hidden md:block sticky top-0 z-[100] bg-surface border-b border-border transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-[56px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0 group mr-4">
          <div className="h-7 w-7 bg-brand rounded-md flex items-center justify-center shadow-md shadow-brand/20 group-hover:scale-105 transition-transform">
             <span className="material-symbols-outlined text-white text-[18px] fill font-variation-fill">home_pin</span>
          </div>
          <span className="text-brand text-[18px] font-bold tracking-[-0.5px] hidden lg:block">
            PGFinder
          </span>
        </Link>

        {/* Integrated Search Bar (Pill Shape) */}
        <div className="flex-1 max-w-[420px] relative" ref={searchRef}>
          <div className="flex items-center bg-input-bg border border-border-input rounded-full h-[40px] px-4 focus-within:ring-2 focus-within:ring-brand/10 focus-within:border-brand transition-all">
            <span className="material-symbols-outlined text-text-muted mr-2 text-[18px]">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search by city or area..."
              className="bg-transparent flex-1 outline-none text-[13px] font-medium text-text-primary placeholder:text-text-secondary"
            />
          </div>

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border shadow-modal rounded-xl overflow-hidden animate-scale-in origin-top py-1 z-50">
               {predictions
                 .slice(0, 5)
                 .map((prediction, i) => (
                <button 
                  key={prediction.place_id}
                  onClick={() => {
                    const cityName = prediction.structured_formatting?.main_text || prediction.description;
                    setSearchQuery(cityName);
                    handleSearch(cityName);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-bg-hover flex items-center gap-3 transition-colors group"
                >
                  <div className="w-7 h-7 bg-input-bg rounded-md flex items-center justify-center text-text-secondary group-hover:bg-brand-light group-hover:text-brand transition-colors">
                     <span className="material-symbols-outlined text-xs">location_city</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-text-primary">{prediction.structured_formatting?.main_text || prediction.description}</p>
                    <p className="text-[11px] font-medium text-text-secondary uppercase tracking-tighter">{prediction.structured_formatting?.secondary_text || 'India'}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-bg-hover transition-colors"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link to={ROUTES.WISHLIST} className="hidden lg:flex items-center gap-1.5 text-text-primary hover:text-brand transition-colors relative px-3 py-1.5 rounded-md hover:bg-bg-hover">
            <span className={`material-symbols-outlined text-[20px] ${wishlist.length > 0 ? 'fill font-variation-fill text-brand' : ''}`}>favorite</span>
            <span className="text-[13px] font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1.5 bg-brand text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-surface">
                {wishlist.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 py-1 pl-3 pr-1 border border-border rounded-full hover:shadow-card transition-all bg-surface">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">menu</span>
                <div className="w-7 h-7 bg-text-primary text-white rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm">
                  {user.name.charAt(0)}
                </div>
              </button>
              
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border shadow-modal rounded-xl p-1.5 hidden group-hover:flex flex-col animate-scale-in origin-top-right z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border mb-1 bg-bg-hover rounded-t-lg">
                   <p className="font-bold text-[13px] truncate text-text-primary">{user.name}</p>
                   <p className="text-[11px] text-text-secondary font-medium uppercase tracking-widest mt-0.5">{user.role}</p>
                </div>
                {isAdmin ? (
                  <Link to="/admin" className="px-3 py-2.5 hover:bg-bg-hover rounded-md flex items-center gap-3 text-[13px] font-bold text-brand">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    Admin Dashboard
                  </Link>
                ) : (
                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-3 py-2.5 hover:bg-bg-hover rounded-md flex items-center gap-3 text-[13px] font-bold text-text-primary w-full text-left"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_business</span>
                    List your PG
                  </button>
                )}
                <button onClick={logout} className="px-3 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md flex items-center gap-3 text-[13px] font-bold text-red-600 mt-1 w-full text-left">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-brand text-white h-[36px] px-4 rounded-md font-semibold text-[13px] hover:bg-brand-hover transition-all active:scale-95 shadow-sm"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Navbar;

