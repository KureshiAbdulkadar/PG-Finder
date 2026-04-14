import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import PropertyGrid from '../../components/property/PropertyGrid/PropertyGrid';
import FilterModal from '../../components/search/FilterModal/FilterModal';
import properties from '../../data/properties.json';
import ResultsHeaderBar from '../../components/search/ResultsHeaderBar/ResultsHeaderBar';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const locationQuery = searchParams.get('location') || '';

  const initialFilters = {
    priceMin: Number(searchParams.get('priceMin')) || 0,
    priceMax: Number(searchParams.get('priceMax')) || 20000,
    type: searchParams.getAll('type'),
    gender: searchParams.getAll('gender'),
    amenities: searchParams.getAll('amenities'),
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (locationQuery) params.set('location', locationQuery);
    if (newFilters.priceMin > 0) params.set('priceMin', newFilters.priceMin.toString());
    if (newFilters.priceMax < 20000) params.set('priceMax', newFilters.priceMax.toString());
    newFilters.type.forEach(type => params.append('type', type));
    newFilters.gender.forEach(g => params.append('gender', g));
    newFilters.amenities.forEach(a => params.append('amenities', a));
    
    setSearchParams(params);
    setIsFilterModalOpen(false);
  };

  const filteredProperties = properties.filter(p => {
    const matchesLocation = !locationQuery || 
      locationQuery.toLowerCase().includes(p.location.city.toLowerCase()) || 
      locationQuery.toLowerCase().includes(p.location.area.toLowerCase()) ||
      p.location.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
      p.location.area.toLowerCase().includes(locationQuery.toLowerCase());

    if (!matchesLocation) return false;
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (filters.type.length > 0 && !filters.type.includes(p.type)) return false;
    if (filters.gender.length > 0 && !filters.gender.includes(p.gender)) return false;
    if (filters.amenities.length > 0 && !filters.amenities.every(a => p.amenities.includes(a))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-page pb-32">
      <ResultsHeaderBar 
        count={filteredProperties.length} 
        location={locationQuery}
        onFilterClick={() => setIsFilterModalOpen(true)}
        onSortClick={() => {}} 
      />
      
      <PageWrapper>
        <div className="mt-4 flex gap-10">
            {/* Property Grid - Now full width with Triggered Sidebar */}
            <main className="flex-1 min-w-0">
                <PropertyGrid properties={filteredProperties} loading={loading} viewType={viewType} />
                
                {filteredProperties.length === 0 && (
                  <div className="bg-surface border border-border rounded-lg p-20 text-center animate-fade-in shadow-card">
                     <span className="material-symbols-outlined text-text-muted text-[64px] mb-4 opacity-20 font-thin">search_off</span>
                     <h3 className="text-xl font-bold text-text-primary mb-2 tracking-tight">No results found</h3>
                     <p className="text-text-secondary font-medium">Try adjusting your filters to find more properties.</p>
                     <button 
                        onClick={() => handleApplyFilters({ priceMin: 0, priceMax: 20000, type: [], amenities: [] })}
                        className="mt-6 bg-brand-red text-white px-8 py-3 rounded-md font-black text-xs uppercase tracking-widest hover:bg-brand-red-hover shadow-lg shadow-brand-red/20 transition-all active:scale-95"
                     >
                        Clear all filters
                     </button>
                  </div>
                )}
            </main>
        </div>
      </PageWrapper>

      {/* Mobile Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
        onApply={handleApplyFilters}
        initialFilters={filters}
        totalResults={filteredProperties.length}
      />
    </div>
  );
};

export default SearchResultsPage;

