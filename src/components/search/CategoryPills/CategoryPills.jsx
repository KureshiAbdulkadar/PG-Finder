import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const categories = [
  { id: 'all', translationKey: 'categoryAll', label: 'All PG', icon: 'apartment' },
  { id: 'girls', translationKey: 'categoryGirls', label: 'Girls Only', icon: 'female' },
  { id: 'boys', translationKey: 'categoryBoys', label: 'Boys Only', icon: 'male' },
  { id: 'single', translationKey: 'categorySingle', label: 'Single Room', icon: 'person' },
  { id: 'double', translationKey: 'categoryDouble', label: 'Double Sharing', icon: 'group' },
  { id: 'ac', translationKey: 'categoryAC', label: 'AC Room', icon: 'ac_unit' },
  { id: 'couple', translationKey: 'categoryCouple', label: 'Couple Friendly', icon: 'favorite' },
  { id: 'luxe', translationKey: 'categoryLuxe', label: 'Luxe', icon: 'diamond' },
];

const CategoryPills = ({ activeCategory, onCategoryChange }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(activeCategory || 'all');

  const handleCategoryClick = (id) => {
    setActiveTab(id);
    onCategoryChange(id);
  };

  return (
    <div className="bg-surface/80 backdrop-blur-md border-b border-border/50 sticky top-16 z-40 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all flex-shrink-0 text-[13px] font-black tracking-tight border ${
                activeTab === cat.id 
                ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20 scale-105' 
                : 'bg-background text-text-secondary border-transparent hover:bg-brand-red-light hover:text-brand-red'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${activeTab === cat.id ? 'fill font-variation-fill' : ''}`}>
                {cat.icon}
              </span>
              <span className="whitespace-nowrap">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;

