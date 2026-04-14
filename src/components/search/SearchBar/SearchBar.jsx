import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [autocompleteService, setAutocompleteService] = useState(null);

  // Initialize Google Maps Autocomplete Service
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setAutocompleteService(new window.google.maps.places.AutocompleteService());
    }
  }, []);

  // Elite Debouncing & Suggestion Logic with Google Places
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 1 && autocompleteService) {
      autocompleteService.getPlacePredictions(
        { 
          input: trimmedQuery, 
          componentRestrictions: { country: 'in' },
          types: ['(cities)']
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setShowDropdown(true);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query, autocompleteService]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (suggestion) => {
    const cityName = suggestion.structured_formatting?.main_text || suggestion.description;
    setQuery(cityName);
    setShowDropdown(false);
    navigate(`/search?location=${encodeURIComponent(cityName)}`);
  };

  const handleManualSearch = () => {
    if (query.trim()) {
      navigate(`/search?location=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      <div className="flex items-center bg-surface shadow-premium hover:shadow-elevated transition-all duration-300 rounded-md p-2 border border-border/50">
        <div className="flex-1 flex items-center px-4 md:border-r border-border/60">
          <span className="material-symbols-outlined text-brand-red mr-3 opacity-80 text-[18px]">location_on</span>
          <div className="flex flex-col flex-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Where</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
              placeholder="Search cities in India..."
              className="bg-transparent outline-none text-[14px] font-bold text-text-primary placeholder:text-text-secondary/60 placeholder:font-medium pb-1"
            />
          </div>
        </div>

        <div className="px-6 hidden lg:block min-w-[150px]">
            <div className="flex flex-col text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Stay Type</span>
                <span className="text-[14px] font-bold text-text-primary">Any PG</span>
            </div>
        </div>

        <button 
            onClick={handleManualSearch}
            className="w-10 h-10 md:w-auto md:px-6 bg-brand-red text-white rounded-md flex items-center justify-center gap-2 hover:bg-brand-red-hover active:scale-95 transition-all shadow-md shadow-brand-red/20"
        >
          <span className="material-symbols-outlined font-black text-[18px]">search</span>
          <span className="hidden md:block font-black text-xs uppercase tracking-widest">Search</span>
        </button>
      </div>

      {/* Suggestion Dropdown - Sharp Professional UX */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border/40 shadow-elevated rounded-md overflow-hidden z-[100] animate-scale-in origin-top py-2">
          <p className="px-5 pb-2 text-[9px] font-black uppercase tracking-widest text-text-secondary border-b border-border/40 mb-1 opacity-60">City Suggestions</p>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="px-5 py-3 hover:bg-background transition-colors cursor-pointer flex items-center gap-4 group"
            >
              <div className="w-8 h-8 bg-background rounded-md flex items-center justify-center text-text-secondary group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all">
                 <span className="material-symbols-outlined text-[18px]">location_city</span>
              </div>
              <div className="flex-1">
                <p className="font-extrabold text-text-primary text-[14px] tracking-tight group-hover:text-brand-red transition-colors">
                    {suggestion.structured_formatting?.main_text || suggestion.description}
                </p>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-tighter opacity-80">
                    {suggestion.structured_formatting?.secondary_text || 'India'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
