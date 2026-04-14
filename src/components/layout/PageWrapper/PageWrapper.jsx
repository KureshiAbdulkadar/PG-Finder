import React from 'react';

const PageWrapper = ({ children, className = "" }) => {
  return (
    <div className={`max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
