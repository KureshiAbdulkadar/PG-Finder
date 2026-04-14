import React, { useState } from 'react';
import PropertyImage from '../../common/PropertyImage/PropertyImage';
import { useTranslation } from 'react-i18next';

const PropertyGallery = ({ images }) => {
  const { t } = useTranslation();
  const [showAllModal, setShowAllModal] = useState(false);
  
  if (!images) return null;

  const gallery = Array.isArray(images) ? images : (images.gallery || []);
  if (gallery.length === 0) return null;

  return (
    <>
      <div className="rounded-[12px] overflow-hidden grid grid-cols-4 grid-rows-2 gap-2 h-[350px] md:h-[450px] relative">
        <div className="col-span-4 md:col-span-2 row-span-2 overflow-hidden">
          <PropertyImage src={gallery[0]} alt="Property Main" priority={true} />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 overflow-hidden">
          <PropertyImage src={gallery[1] || gallery[0]} alt="Property" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 overflow-hidden">
          <PropertyImage src={gallery[2] || gallery[0]} alt="Property" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 overflow-hidden">
          <PropertyImage src={gallery[3] || gallery[0]} alt="Property" />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 overflow-hidden">
          <PropertyImage src={gallery[4] || gallery[0]} alt="Property" />
        </div>
        
        <button 
          onClick={() => setShowAllModal(true)}
          className="absolute bottom-6 right-6 bg-white border border-text-primary px-4 py-1.5 rounded-button text-sm font-semibold shadow-sm flex items-center gap-2 hover:bg-background transition-colors"
        >
          <span className="material-symbols-outlined text-xl">apps</span>
          {t('showAllPhotos', 'Show all photos')}
        </button>
      </div>

      {showAllModal && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          <div className="p-6">
            <button 
              onClick={() => setShowAllModal(false)}
              className="mb-6 flex items-center justify-center w-10 h-10 rounded-full hover:bg-background"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="max-w-3xl mx-auto space-y-4">
              {gallery.map((img, i) => (
                <div key={i} className="w-full">
                  <PropertyImage src={img} alt={`Gallery ${i}`} priority={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
