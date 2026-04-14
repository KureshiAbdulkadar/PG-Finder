import React from 'react';

const PropertyTableSkeleton = () => {
  return (
    <div className="bg-white border border-border rounded-card overflow-hidden">
      <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-border bg-background">
        <div className="h-4 skeleton rounded col-span-2"></div>
        <div className="h-4 skeleton rounded"></div>
        <div className="h-4 skeleton rounded"></div>
        <div className="h-4 skeleton rounded"></div>
        <div className="h-4 skeleton rounded"></div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex md:grid grid-cols-6 gap-4 p-4 items-center">
            <div className="col-span-2 flex items-center gap-3 w-full">
              <div className="w-12 h-12 skeleton rounded-card shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-4 w-3/4 skeleton rounded"></div>
                <div className="h-3 w-1/2 skeleton rounded"></div>
              </div>
            </div>
            <div className="hidden md:block h-4 w-1/2 skeleton rounded"></div>
            <div className="hidden md:block h-4 w-1/2 skeleton rounded"></div>
            <div className="hidden md:block h-6 w-20 skeleton rounded-full"></div>
            <div className="hidden md:flex gap-2">
              <div className="w-8 h-8 skeleton rounded-full"></div>
              <div className="w-8 h-8 skeleton rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTableSkeleton;
