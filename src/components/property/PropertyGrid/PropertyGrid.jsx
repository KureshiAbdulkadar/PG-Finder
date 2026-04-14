import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import SearchResultsSkeleton from '../../common/Skeletons/SearchResultsSkeleton';
import { useTranslation } from 'react-i18next';

const PropertyGrid = ({ properties, loading = false, priorityCount = 4, viewType = 'grid' }) => {
  const { t } = useTranslation();

  if (loading) {
    return <SearchResultsSkeleton />;
  }

  if (!properties || properties.length === 0) {
    return null; // Empty state handled by parent
  }

  return (
    <div className={`grid gap-6 py-2 transition-all duration-500 ${
      viewType === 'list' 
      ? 'grid-cols-1' 
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
    }`}>
      {properties.map((property, index) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          priority={index < priorityCount} 
          isHorizontal={viewType === 'list'}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;


