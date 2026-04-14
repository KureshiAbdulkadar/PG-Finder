import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import CategoryPills from '../../components/search/CategoryPills/CategoryPills';
import PropertyGrid from '../../components/property/PropertyGrid/PropertyGrid';
import properties from '../../data/properties.json';

import { useState, useEffect } from 'react';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(null); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);

  let filteredProperties = activeCategory === 'all' 
    ? [...properties] 
    : properties.filter(p => {
        const cat = activeCategory.toLowerCase();
        if (cat === 'girls only' || cat === 'girls') return p.category === 'Girls Only';
        if (cat === 'boys only' || cat === 'boys') return p.category === 'Boys Only';
        if (cat === 'luxe') return p.category === 'Luxe';
        if (cat === 'ac room' || cat === 'ac') return p.amenities.includes('ac');
        if (cat === 'single room' || cat === 'single') return p.type === 'Single Room';
        if (cat === 'double sharing' || cat === 'double') return p.type === 'Double Sharing';
        if (cat === 'couple friendly' || cat === 'couple') return p.category === 'Couple Friendly';
        return true;
      });

  if (sortBy === 'price-asc') {
      filteredProperties.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
      filteredProperties.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="pb-20 min-h-screen bg-background transition-colors duration-300">
      {/* Category Navigation */}
      <div className="sticky top-20 z-40">
        <CategoryPills 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
      </div>

      <PageWrapper>
        {/* Action Bar - Professional Alignment */}
        <div className="mt-8 mb-8 flex items-center justify-between gap-4">
             <div className="flex items-center gap-3 h-12">
                <button 
                  onClick={() => setSortBy(sortBy === 'price-asc' ? 'price-desc' : 'price-asc')}
                  className={`h-full flex items-center gap-3 px-6 border rounded-md text-[12px] font-black uppercase tracking-widest transition-all shadow-soft ${sortBy ? 'border-brand-red text-brand-red bg-brand-red-light dark:bg-brand-red/10' : 'border-border bg-surface text-text-primary hover:border-text-primary'}`}
                >
                    <span className="material-symbols-outlined text-[20px]">swap_vert</span>
                    Price: {sortBy === 'price-asc' ? 'Low-High' : (sortBy === 'price-desc' ? 'High-Low' : 'Default')}
                </button>
                <div className="h-6 w-[1px] bg-border mx-1 hidden md:block"></div>
                <button 
                  onClick={() => navigate(ROUTES.SEARCH)}
                  className="h-full hidden md:flex items-center gap-3 px-6 bg-surface border border-border rounded-md text-[12px] font-black uppercase tracking-widest hover:border-text-primary transition-all shadow-soft text-text-primary"
                >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    More Filters
                </button>
             </div>
             
             <div className="flex items-center gap-3 px-4 py-2.5 bg-brand-red-light dark:bg-brand-red/10 border border-brand-red/20 rounded-md h-12">
                <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">
                  {filteredProperties.length} ACTIVE PROPERTIES
                </span>
             </div>
        </div>

        {/* Listings Section */}
        <div className="mt-4">
            <PropertyGrid properties={filteredProperties} loading={loading} />
            
            {filteredProperties.length === 0 && (
               <div className="py-20 text-center">
                  <span className="material-symbols-outlined text-[64px] text-text-muted opacity-20 mb-4">apartment</span>
                  <h3 className="text-xl font-black text-text-primary">No properties available in this category</h3>
                  <p className="text-text-secondary mt-1">Try switching to another category or clearing filters.</p>
               </div>
            )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default HomePage;

