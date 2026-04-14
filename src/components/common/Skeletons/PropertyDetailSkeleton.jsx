import React from 'react';

const PropertyDetailSkeleton = () => {
  return (
    <div className="py-8 w-full">
      <div className="h-8 w-3/4 skeleton rounded mb-4"></div>
      <div className="h-5 w-1/2 skeleton rounded mb-6"></div>
      
      {/* Gallery Skeleton */}
      <div className="w-full aspect-[4/3] md:aspect-[21/9] skeleton rounded-card mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="h-6 w-1/3 skeleton rounded"></div>
          <div className="space-y-3">
            <div className="h-4 w-full skeleton rounded"></div>
            <div className="h-4 w-full skeleton rounded"></div>
            <div className="h-4 w-5/6 skeleton rounded"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 w-full skeleton rounded"></div>
            <div className="h-10 w-full skeleton rounded"></div>
            <div className="h-10 w-full skeleton rounded"></div>
            <div className="h-10 w-full skeleton rounded"></div>
          </div>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="w-full h-64 skeleton rounded-card"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailSkeleton;
