import React from 'react';

const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white border border-border rounded-card p-6 flex items-center gap-4">
          <div className="w-12 h-12 skeleton rounded-full shrink-0"></div>
          <div className="space-y-2 w-full">
            <div className="h-4 w-1/2 skeleton rounded"></div>
            <div className="h-6 w-1/3 skeleton rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatsSkeleton;
