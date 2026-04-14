import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import PropertyGallery from '../../components/property/PropertyGallery/PropertyGallery';
import AmenitiesList from '../../components/property/AmenitiesList/AmenitiesList';
import ContactBar from '../../components/property/ContactBar/ContactBar';
import PropertyDetailSkeleton from '../../components/common/Skeletons/PropertyDetailSkeleton';
import properties from '../../data/properties.json';
import { useTranslation } from 'react-i18next';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fake context transition latency
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [id]);

  if (!property && !loading) return <Navigate to="/" />;

  if (loading) {
    return (
      <div className="pb-32">
        <PageWrapper className="pt-6">
          <PropertyDetailSkeleton />
        </PageWrapper>
      </div>
    );
  }

  const {
    title,
    type,
    gender,
    price,
    location,
    images,
    amenities,
    description,
    rules,
    isVerified,
    rating,
    reviewCount,
    owner
  } = property;

  return (
    <div className="pb-32 bg-[#fafafa]">
      <PageWrapper className="pt-10">
        {/* Header Title Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
             {isVerified && (
               <div className="bg-brand-red py-1 px-3 rounded-md text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                 <span className="material-symbols-outlined text-[14px] fill font-variation-fill">verified</span>
                 Verified PG
               </div>
             )}
             <div className="bg-green-700 py-1 px-3 rounded-md text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
               {gender}
             </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary tracking-tighter mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-text-secondary">
            <span className="flex items-center gap-1.5 text-text-primary">
              <span className="material-symbols-outlined text-lg fill font-variation-fill text-green-700">star</span>
              {rating} ({reviewCount} {t('reviews', 'reviews')})
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 cursor-pointer hover:text-brand-red transition-colors">
              <span className="material-symbols-outlined text-lg">location_on</span>
              {location.area}, {location.city}
            </span>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={images} />

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16">
          {/* Main Info (Left) */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center pb-8 border-b border-border">
              <div>
                <h2 className="text-2xl font-black text-text-primary mb-1">{type} by {owner.name}</h2>
                <p className="text-text-secondary font-medium italic">Located near {location.landmark}</p>
              </div>
              <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red overflow-hidden border-2 border-brand-red/20 shadow-inner">
                <span className="material-symbols-outlined text-4xl fill font-variation-fill">account_circle</span>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="py-10 border-b border-border grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-brand-red text-3xl">home_work</span>
                    <p className="font-black text-xs uppercase tracking-widest text-text-muted">Type</p>
                    <p className="font-bold text-text-primary">{type}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-brand-red text-3xl">wc</span>
                    <p className="font-black text-xs uppercase tracking-widest text-text-muted">Gender</p>
                    <p className="font-bold text-text-primary">{gender}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-brand-red text-3xl">verified_user</span>
                    <p className="font-black text-xs uppercase tracking-widest text-text-muted">Status</p>
                    <p className="font-bold text-green-700">Verified</p>
                </div>
            </div>

            {/* Description */}
            <div className="py-12 border-b border-border">
              <h3 className="text-xl font-black mb-6">About this PG</h3>
              <p className="text-text-primary leading-relaxed whitespace-pre-line font-medium text-lg opacity-80">
                {description}
              </p>
            </div>

            {/* Amenities */}
            <div className="py-12 border-b border-border">
              <h2 className="text-xl font-black mb-8">Exclusive Amenities</h2>
              <AmenitiesList amenities={amenities} />
              <button className="mt-10 bg-white border-2 border-text-primary px-8 py-4 rounded-xl font-black hover:bg-text-primary hover:text-white transition-all active:scale-95 shadow-sm">
                View all {amenities.length} amenities
              </button>
            </div>
          </div>

          {/* Inquiry Card (Right - for Desktop sticky feel) */}
          <div className="hidden lg:block">
            <div className="sticky top-32 p-8 border border-border shadow-2xl rounded-[32px] bg-white">
                <div className="mb-8">
                    <p className="text-[12px] font-black uppercase tracking-[2px] text-text-muted mb-2">Monthly Rent</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-brand-red">₹{price.toLocaleString()}</span>
                        <span className="text-text-secondary font-bold">/ Mo*</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                   <div className="bg-background p-4 rounded-2xl flex items-center gap-4 border border-border/50">
                      <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0">
                         <span className="material-symbols-outlined fill font-variation-fill">bolt</span>
                      </div>
                      <div>
                         <p className="font-black text-xs uppercase tracking-tight">Availability</p>
                         <p className="font-bold text-sm text-green-700">Available Now</p>
                      </div>
                   </div>
                   <div className="bg-background p-4 rounded-2xl flex items-center gap-4 border border-border/50">
                      <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
                         <span className="material-symbols-outlined fill font-variation-fill">verified</span>
                      </div>
                      <div>
                         <p className="font-black text-xs uppercase tracking-tight">Security Deposit</p>
                         <p className="font-bold text-sm">1 Month Rent</p>
                      </div>
                   </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/property/${id}/contact`)}
                  className="w-full bg-text-primary text-white font-black py-5 rounded-2xl mb-4 shadow-xl hover:brightness-125 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-lg"
                >
                    <span className="material-symbols-outlined fill font-variation-fill">chat</span>
                    Message Owner
                </button>
                <p className="text-center text-xs text-text-muted font-bold uppercase tracking-tighter">Immediate inquiry response expected</p>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="py-16">
            <h2 className="text-2xl font-black mb-10 tracking-tight">PG Policies & Safety</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="p-8 bg-white border border-border rounded-3xl shadow-sm">
                    <h3 className="font-black text-sm uppercase mb-6 tracking-widest text-text-muted">House rules</h3>
                    <ul className="space-y-4 text-text-primary font-bold opacity-80">
                        {rules.map(rule => <li key={rule} className="flex items-center gap-3">
                           <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                           {rule}
                        </li>)}
                    </ul>
                </div>
                <div className="p-8 bg-white border border-border rounded-3xl shadow-sm">
                    <h3 className="font-black text-sm uppercase mb-6 tracking-widest text-text-muted">Health & safety</h3>
                    <ul className="space-y-4 text-text-primary font-bold opacity-80">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span> CCTV on premises</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span> Security guard 24/7</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span> Regular sanitization</li>
                    </ul>
                </div>
                <div className="p-8 bg-white border border-border rounded-3xl shadow-sm">
                    <h3 className="font-black text-sm uppercase mb-6 tracking-widest text-text-muted">Inquiry Notice</h3>
                    <p className="text-text-primary font-bold opacity-80 leading-relaxed italic">
                      Please message the owner directly to arrange a visit. Most owners prefer site visits before booking.
                    </p>
                </div>
            </div>
        </div>
      </PageWrapper>

      {/* Sticky Bottom Bar for Mobile/Tablet */}
      <div className="lg:hidden">
        <ContactBar 
            propertyId={id} 
            price={price} 
            rating={rating} 
            reviews={reviewCount} 
        />
      </div>
    </div>
  );
};

export default PropertyDetailPage;
