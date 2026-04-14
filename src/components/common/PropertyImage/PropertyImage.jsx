import React, { useState, useEffect } from 'react';

const PropertyImage = ({ src, thumbnailSrc, alt, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [src, priority]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setHasError(true);

  if (hasError) {
    return (
      <img
        src="/assets/images/property-placeholder.jpg"
        alt="Placeholder"
        loading="lazy"
        className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
      />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-background">
      {/* Thumbnail or blurred layer */}
      {!priority && thumbnailSrc && (
        <img
          src={thumbnailSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
      )}
      
      {/* Full Resolution Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${priority || isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

export default PropertyImage;
