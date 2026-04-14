import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FilterModal = ({ isOpen, onClose, onApply, initialFilters }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(initialFilters || {
    priceMin: 0,
    priceMax: 20000,
    type: [],
    amenities: [],
  });

  if (!isOpen) return null;

  const handleTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type) ? prev.type.filter(t => t !== type) : [...prev.type, type]
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
    }));
  };

  const handleClear = () => {
    const defaultFilters = { priceMin: 0, priceMax: 20000, type: [], amenities: [] };
    setFilters(defaultFilters);
    onApply(defaultFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div className="relative bg-surface w-[320px] h-full flex flex-col shadow-2xl animate-slide-right border-r border-border/50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-border">
          <div className="font-black text-[18px] uppercase tracking-tighter text-text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-red">tune</span>
            {t('filters', 'Filters')}
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-background transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] font-bold group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-8 space-y-10">
          {/* Price Range Slider Section */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-widest text-text-secondary mb-6">{t('priceRange', 'Price range')}</h3>
            <div className="px-2">
               {/* UI Slider Simulation */}
               <div className="relative h-1.5 bg-background rounded-full mb-8">
                  <div className="absolute left-[10%] right-[30%] h-full bg-brand-red rounded-full"></div>
                  <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-brand-red rounded-full shadow-md cursor-pointer"></div>
                  <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-brand-red rounded-full shadow-md cursor-pointer"></div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex-1 px-3 py-2 bg-background border border-border rounded-md">
                     <span className="text-[10px] font-black uppercase text-text-secondary block">Min</span>
                     <span className="text-sm font-bold indent-2">₹{filters.priceMin}</span>
                  </div>
                  <div className="flex-1 px-3 py-2 bg-background border border-border rounded-md">
                     <span className="text-[10px] font-black uppercase text-text-secondary block">Max</span>
                     <span className="text-sm font-bold indent-2">₹{filters.priceMax}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Type of Stay */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-widest text-text-secondary mb-6">{t('typeOfPlace', 'Stay Type')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {['Single', 'Double', 'Studio', 'Flat'].map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`px-4 py-2.5 rounded-md text-[11px] font-black uppercase tracking-widest transition-all border ${
                    filters.type.includes(type)
                    ? 'bg-brand-red text-white border-brand-red shadow-md' 
                    : 'bg-background text-text-secondary border-transparent hover:border-brand-red/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities - Clean Checkbox Style */}
          <div>
            <h3 className="text-[12px] font-black uppercase tracking-widest text-text-secondary mb-6">{t('amenities', 'Amenities')}</h3>
            <div className="space-y-4">
              {['wifi', 'ac', 'meals', 'laundry', 'parking'].map(amenity => (
                <label key={amenity} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-bold text-text-secondary capitalize group-hover:text-text-primary transition-colors">{amenity}</span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="peer hidden"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                      filters.amenities.includes(amenity) ? 'bg-brand-red border-brand-red' : 'border-border peer-hover:border-brand-red/50'
                    }`}>
                      {filters.amenities.includes(amenity) && <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-surface flex flex-col gap-3">
          <button 
            onClick={() => {
              onApply(filters);
              onClose();
            }}
            className="w-full bg-brand-red text-white py-4 rounded-md font-black text-xs uppercase tracking-widest hover:bg-brand-red-hover shadow-lg shadow-brand-red/20 transition-all active:scale-95"
          >
             Show Results
          </button>
          <button 
            onClick={handleClear}
            className="w-full py-2.5 text-[11px] font-black uppercase tracking-widest text-text-secondary hover:text-brand-red transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

