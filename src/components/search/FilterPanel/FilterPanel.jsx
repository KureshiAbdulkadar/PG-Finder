import React from 'react';

const FilterSection = ({ title, children }) => (
  <div className="mb-8 last:mb-0">
    <h4 className="text-[12px] font-black uppercase tracking-widest text-text-muted mb-4">{title}</h4>
    {children}
  </div>
);

const FilterPanel = ({ filters, onApply }) => {
  const propertyTypes = ['Single Room', 'Double Sharing', 'Studio', 'Apartment', 'House'];
  const priceRanges = [
    { label: 'Any Price', min: 0, max: 20000 },
    { label: 'Under ₹5,000', min: 0, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: '₹10,000+', min: 10000, max: 20000 }
  ];

  const handleTypeToggle = (type) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    onApply({ ...filters, type: newTypes });
  };

  const handlePriceChange = (min, max) => {
    onApply({ ...filters, priceMin: min, priceMax: max });
  };

  return (
    <div className="bg-surface border border-border/50 rounded-card p-5 shadow-soft h-fit sticky top-24">
      <FilterSection title="Location">
        <div className="relative group">
          <div className="flex items-center gap-3 px-3 py-2 bg-background border border-border/60 rounded-md focus-within:border-brand-red transition-all">
            <span className="material-symbols-outlined text-text-secondary text-[16px]">location_on</span>
            <input 
              type="text" 
              placeholder="Enter city or area"
              className="bg-transparent outline-none text-xs font-bold text-text-primary w-full"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isActive = filters.priceMin === range.min && filters.priceMax === range.max;
            return (
              <button
                key={range.label}
                onClick={() => handlePriceChange(range.min, range.max)}
                className={`w-full text-left px-3 py-2 rounded-md border transition-all flex items-center justify-between group ${
                  isActive 
                  ? 'border-brand-red bg-brand-red/5 text-brand-red' 
                  : 'border-border/60 text-text-secondary hover:border-brand-red/50 hover:bg-background'
                }`}
              >
                <span className="text-xs font-bold">{range.label}</span>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isActive ? 'border-brand-red bg-brand-red' : 'border-border group-hover:border-brand-red/50'
                }`}>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Property Type">
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => {
            const isActive = filters.type.includes(type);
            return (
              <button
                key={type}
                onClick={() => handleTypeToggle(type)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${
                  isActive 
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/20 scale-105' 
                  : 'bg-background text-text-secondary hover:bg-border/30 border border-transparent'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Amenities">
        <div className="space-y-2">
          {['wifi', 'ac', 'meals', 'parking', 'gym'].map(amenity => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => {
                  const newAmenities = filters.amenities.includes(amenity)
                    ? filters.amenities.filter(a => a !== amenity)
                    : [...filters.amenities, amenity];
                  onApply({ ...filters, amenities: newAmenities });
                }}
                className="hidden"
              />
              <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                filters.amenities.includes(amenity) ? 'border-brand-red bg-brand-red' : 'border-border group-hover:border-brand-red/50'
              }`}>
                {filters.amenities.includes(amenity) && <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>}
              </div>
              <span className="text-xs font-bold text-text-secondary capitalize group-hover:text-text-primary transition-colors">{amenity}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      <button 
        onClick={() => onApply({ priceMin: 0, priceMax: 20000, type: [], amenities: [] })}
        className="w-full mt-4 py-3 text-text-muted hover:text-brand-red text-xs font-black uppercase tracking-widest transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;
