import React from 'react';

const SearchResultsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <div key={n} className="flex flex-col gap-4 animate-pulse">
          {/* Image Skeleton with Shimmer */}
          <div className="aspect-[4/5] bg-border/40 rounded-card relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
          </div>
          
          {/* Details Skeleton */}
          <div className="space-y-3 px-1">
            <div className="flex justify-between items-center">
                <div className="h-4 bg-border/60 rounded-full w-2/3"></div>
                <div className="h-6 bg-border/60 rounded-lg w-12"></div>
            </div>
            <div className="h-3 bg-border/40 rounded-full w-full"></div>
            <div className="h-3 bg-border/40 rounded-full w-1/2"></div>
            
            <div className="pt-4 flex justify-between items-center">
                <div className="h-6 bg-border/60 rounded-full w-24"></div>
                <div className="h-10 bg-border/60 rounded-xl w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsSkeleton;
