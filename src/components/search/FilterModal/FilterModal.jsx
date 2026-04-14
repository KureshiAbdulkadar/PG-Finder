import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, onApply, initialFilters, totalResults }) => {
  const [filters, setFilters] = useState(initialFilters || {
    priceMin: 0,
    priceMax: 20000,
    type: [],
    gender: [],
    amenities: [],
  });

  if (!isOpen) return null;

  const handleTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter(t => t !== type) : [...prev.type, type]
    }));
  };

  const handleGenderToggle = (gender) => {
    setFilters(prev => ({
      ...prev,
      gender: prev.gender.includes(gender) ? prev.gender.filter(g => g !== gender) : [...prev.gender, gender]
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
    }));
  };

  const handleClear = () => {
    const defaultFilters = { priceMin: 0, priceMax: 20000, type: [], gender: [], amenities: [] };
    setFilters(defaultFilters);
    onApply(defaultFilters);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div className="relative bg-surface w-full max-w-[380px] h-full flex flex-col shadow-sidebar animate-slide-right border-l border-border rounded-l-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[56px] border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center hover:bg-bg-hover rounded-md transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-text-primary">close</span>
            </button>
            <span className="text-[15px] font-semibold text-text-primary">Filters</span>
          </div>
          <button 
            onClick={handleClear}
            className="text-[13px] font-medium text-text-primary underline hover:text-brand transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
          {/* Price Range */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-5">Price Range</h3>
            <div className="px-2">
               <div className="relative h-1 bg-border rounded-full mb-8">
                  <div className="absolute left-0 right-1/4 h-full bg-brand rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border border-border-input rounded-full shadow-sm cursor-pointer"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-5 h-5 bg-surface border border-border-input rounded-full shadow-sm cursor-pointer"></div>
               </div>
               <div className="flex items-center justify-between text-[13px] font-medium text-text-primary">
                  <span>₹{filters.priceMin}</span>
                  <span>₹{filters.priceMax}+</span>
               </div>
            </div>
          </div>

          {/* Room Type */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-5">Room Type</h3>
            <div className="space-y-4">
              {['Single Room', 'Double Sharing'].map(type => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer hidden"
                        checked={filters.type.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${filters.type.includes(type) ? 'bg-brand border-brand' : 'border-border-input group-hover:border-text-primary'}`}>
                        {filters.type.includes(type) && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                      </div>
                    </div>
                  <span className="text-[13px] text-text-primary font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="pb-8 border-b border-border">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-5">Gender</h3>
            <div className="space-y-4">
              {['Girls Only', 'Boys Only', 'Co-living'].map(gender => (
                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer hidden"
                        checked={filters.gender.includes(gender)}
                        onChange={() => handleGenderToggle(gender)}
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${filters.gender.includes(gender) ? 'bg-brand border-brand' : 'border-border-input group-hover:border-text-primary'}`}>
                        {filters.gender.includes(gender) && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                      </div>
                    </div>
                  <span className="text-[13px] text-text-primary font-medium">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="pb-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-secondary mb-5">Amenities</h3>
            <div className="grid grid-cols-2 gap-y-4">
              {['AC', 'WiFi', 'Meals', 'Parking', 'Laundry'].map(amenity => (
                <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer hidden"
                        checked={filters.amenities.includes(amenity.toLowerCase())}
                        onChange={() => handleAmenityToggle(amenity.toLowerCase())}
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${filters.amenities.includes(amenity.toLowerCase()) ? 'bg-brand border-brand' : 'border-border-input group-hover:border-text-primary'}`}>
                        {filters.amenities.includes(amenity.toLowerCase()) && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                      </div>
                    </div>
                  <span className="text-[13px] text-text-primary font-medium">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-5 border-t border-border bg-surface mt-auto">
          <button 
            onClick={() => {
              onApply(filters);
              onClose();
            }}
            className="w-full bg-brand text-white h-[48px] rounded-md font-semibold text-[14px] hover:bg-brand-hover transition-all active:scale-[0.98] shadow-sm"
          >
             Show {totalResults || 0} Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

