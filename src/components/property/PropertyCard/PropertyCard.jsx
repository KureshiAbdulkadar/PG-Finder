import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../contexts/WishlistContext';
import PropertyImage from '../../common/PropertyImage/PropertyImage';

const PropertyCard = ({ property, priority = false }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const {
    id,
    title,
    price,
    location,
    images,
    isVerified,
    rating,
    type,
    amenities
  } = property;

  const wishlistActive = isInWishlist(id);
  const gallery = images?.gallery || [images?.medium || images?.[0]];

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="group relative bg-surface rounded-card overflow-hidden shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-500 border border-border/50 flex flex-col h-full">
      {/* Visual Anchor: Image Section */}
      <div className="relative aspect-[1.2] bg-background overflow-hidden rounded-t-card shrink-0">
        <Link to={`/property/${id}`} className="block h-full w-full">
          <PropertyImage 
            src={gallery[currentImageIndex]} 
            alt={title}
            priority={priority}
            className="transition-transform duration-1000 ease-out h-full w-full object-cover rounded-t-card"
          />
          
          {/* Subtle Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        </Link>
        
        {/* Navigation Arrows (Visible on Hover) */}
        {gallery.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-text-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
            >
              <span className="material-symbols-outlined text-[18px] font-bold">chevron_left</span>
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-text-primary flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-20"
            >
              <span className="material-symbols-outlined text-[18px] font-bold">chevron_right</span>
            </button>
          </>
        )}
        
        {/* Wishlist Button (Glass Effect) */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(id);
          }}
          className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md border border-white/30 shadow-lg transition-all z-10 ${
            wishlistActive 
              ? 'bg-brand text-white animate-heart-beat' 
              : 'bg-white/20 text-white hover:bg-white hover:text-brand'
          }`}
          aria-label="Toggle Wishlist"
        >
          <span className={`material-symbols-outlined text-[18px] ${wishlistActive ? 'fill font-variation-fill' : ''}`}>
            favorite
          </span>
        </button>
 
        {/* Verification Badge */}
        {isVerified && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] font-black text-success shadow-sm flex items-center gap-1 border border-success/20 pointer-events-none">
            <span className="material-symbols-outlined text-[14px] fill font-variation-fill">verified</span>
            VERIFIED
          </div>
        )}
      </div>
 
      {/* Content Section - Flex Body for Alignment */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="mb-3">
            <Link to={`/property/${id}`}>
              <h3 className="text-[17px] font-extrabold text-text-primary tracking-tight leading-snug line-clamp-2 hover:text-brand transition-colors mb-1">
                {title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 text-text-secondary">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              <span className="text-[12px] font-medium">{location.area}, {location.city}</span>
            </div>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 mb-4 mt-1">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-background dark:bg-border/20 rounded-full text-text-secondary">
               <span className="material-symbols-outlined text-[14px]">bed</span>
               <span className="text-[11px] font-bold whitespace-nowrap">{type}</span>
            </div>
            {amenities?.slice(0, 2).map(amenity => (
              <div key={amenity} className="flex items-center gap-1.5 px-3 py-1 bg-background dark:bg-border/20 rounded-full text-text-secondary">
                <span className="material-symbols-outlined text-[14px]">
                  {amenity === 'wifi' ? 'wifi' : amenity === 'ac' ? 'ac_unit' : 'check_circle'}
                </span>
                <span className="text-[11px] font-bold capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section: Always Aligned at Bottom */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] font-black text-text-primary">₹{price.toLocaleString()}</span>
            <span className="text-text-secondary text-[11px] font-bold">/mo</span>
          </div>
          
          <div className="flex items-center gap-1.5 px-2 py-1 bg-star/10 rounded-md shrink-0">
            <span className="material-symbols-outlined text-[16px] text-star fill font-variation-fill">star</span>
            <span className="text-[13px] font-black text-star">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;


