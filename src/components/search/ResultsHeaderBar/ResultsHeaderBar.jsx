import React from 'react';

const ResultsHeaderBar = ({ count, location, onSortClick, onFilterClick }) => {
  return (
    <div className="bg-surface border-b border-border h-[52px] px-6 flex justify-between items-center sticky top-[56px] z-30">
        <h2 className="text-lg font-semibold text-text-primary leading-none m-0 p-0">
            {count} PGs found {location ? `in ${location}` : 'near you'}
        </h2>
        <div className="flex items-center gap-2">
             <button 
                onClick={onSortClick}
                className="h-[34px] px-[14px] border border-border-input rounded-md text-[12px] font-medium hover:border-border-strong transition-all flex items-center gap-2 text-text-primary bg-surface"
             >
                Sort: Default <span className="material-symbols-outlined text-[18px]">unfold_more</span>
             </button>
             <button 
                onClick={onFilterClick}
                className="h-[34px] px-[14px] border border-border-input rounded-md text-[12px] font-medium hover:border-border-strong transition-all flex items-center gap-2 text-text-primary bg-surface"
             >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filters
             </button>
        </div>
    </div>
  );
};

export default ResultsHeaderBar;
