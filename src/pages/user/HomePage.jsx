import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import PropertyGrid from '../../components/property/PropertyGrid/PropertyGrid';
import properties from '../../data/properties.json';
import ResultsHeaderBar from '../../components/search/ResultsHeaderBar/ResultsHeaderBar';
import FilterModal from '../../components/search/FilterModal/FilterModal';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 20000,
    type: [],
    gender: [],
    amenities: [],
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [filters]);

  const filteredProperties = properties.filter(p => {
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (filters.type.length > 0 && !filters.type.includes(p.type)) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) return false;
    if (filters.amenities.length > 0 && !filters.amenities.every(a => p.amenities.includes(a))) return false;
    return true;
  });

  return (
    <div className="pb-20 min-h-screen bg-page">
      <ResultsHeaderBar 
        count={filteredProperties.length} 
        onFilterClick={() => setIsFilterOpen(true)}
      />
      
      <PageWrapper>
        {/* Listings Section */}
        <div className="mt-4">
            <PropertyGrid properties={filteredProperties} loading={loading} />
            
            {filteredProperties.length === 0 && (
               <div className="py-20 text-center">
                  <span className="material-symbols-outlined text-[64px] text-text-muted opacity-20 mb-4">apartment</span>
                  <h3 className="text-xl font-bold text-text-primary">No properties available in this category</h3>
                  <p className="text-text-secondary mt-1">Try switching to another category or clearing filters.</p>
               </div>
            )}
        </div>
      </PageWrapper>

      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={setFilters}
        totalResults={filteredProperties.length}
      />
    </div>
  );
};

export default HomePage;

