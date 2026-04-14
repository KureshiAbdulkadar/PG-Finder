import React from 'react';

const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-card rounded-card skeleton relative overflow-hidden flex items-center justify-center">
        {/* Heart placeholder */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20"></div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <div className="h-5 w-2/3 skeleton rounded"></div>
          <div className="h-5 w-1/4 skeleton rounded"></div>
        </div>
        <div className="h-4 w-1/2 skeleton rounded"></div>
        <div className="h-4 w-1/3 skeleton rounded"></div>
        <div className="h-5 w-1/4 skeleton rounded mt-1"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
