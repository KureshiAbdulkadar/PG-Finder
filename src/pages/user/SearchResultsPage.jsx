import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import PropertyGrid from '../../components/property/PropertyGrid/PropertyGrid';
import FilterPanel from '../../components/search/FilterPanel/FilterPanel';
import FilterModal from '../../components/search/FilterModal/FilterModal';
import properties from '../../data/properties.json';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('grid'); // grid or list

  const initialFilters = {
    priceMin: Number(searchParams.get('priceMin')) || 0,
    priceMax: Number(searchParams.get('priceMax')) || 20000,
    type: searchParams.getAll('type'),
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
    if (newFilters.priceMin > 0) params.set('priceMin', newFilters.priceMin.toString());
    if (newFilters.priceMax < 20000) params.set('priceMax', newFilters.priceMax.toString());
    newFilters.type.forEach(type => params.append('type', type));
    newFilters.amenities.forEach(a => params.append('amenities', a));
    
    setSearchParams(params);
    setIsFilterModalOpen(false);
  };

  const filteredProperties = properties.filter(p => {
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
    if (filters.type.length > 0 && !filters.type.includes(p.type)) return false;
    if (filters.amenities.length > 0 && !filters.amenities.every(a => p.amenities.includes(a))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-10 pb-32 transition-colors duration-300">
      <PageWrapper>
        {/* Header Section - Modern Marketplace Alignment */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2.5 bg-brand-red-light dark:bg-brand-red/10 border border-brand-red/20 rounded-md">
                 <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></div>
                 <span className="text-[11px] font-black text-brand-red uppercase tracking-widest">{filteredProperties.length} PGs FOUND</span>
               </div>
               <h1 className="text-2xl font-black text-text-primary tracking-tight hidden lg:block">Properties in India</h1>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-3 bg-surface border border-border px-5 py-3 rounded-md shadow-soft hover:shadow-premium hover:border-text-primary transition-all text-[12px] font-black uppercase tracking-widest text-text-primary h-12"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filters
              </button>

              <div className="bg-background/50 border border-border p-1 rounded-md hidden md:flex items-center h-12">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`px-4 py-2 rounded-md transition-all ${viewType === 'grid' ? 'bg-surface text-brand-red shadow-sm border border-border' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`px-4 py-2 rounded-md transition-all ${viewType === 'list' ? 'bg-surface text-brand-red shadow-sm border border-border' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">view_list</span>
                </button>
              </div>

              <div className="relative h-12">
                <select className="appearance-none bg-surface border border-border pl-5 pr-12 h-full rounded-md shadow-soft font-black text-[12px] uppercase tracking-widest outline-none focus:border-text-primary transition-all cursor-pointer text-text-primary">
                  <option>Sort: Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary text-[18px]">expand_more</span>
              </div>
            </div>
        </div>

        <div className="flex gap-10">
            {/* Property Grid - Now full width with Triggered Sidebar */}
            <main className="flex-1 min-w-0">
                <PropertyGrid properties={filteredProperties} loading={loading} viewType={viewType} />
                
                {filteredProperties.length === 0 && (
                  <div className="bg-surface border border-border/50 rounded-card p-20 text-center animate-fade-in shadow-soft">
                     <span className="material-symbols-outlined text-text-secondary text-[64px] mb-4 opacity-20 font-thin">search_off</span>
                     <h3 className="text-2xl font-black text-text-primary mb-2 tracking-tighter">No results found</h3>
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
      />
    </div>
  );
};

export default SearchResultsPage;

