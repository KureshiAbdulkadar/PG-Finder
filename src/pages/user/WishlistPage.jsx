import React from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import PropertyGrid from '../../components/property/PropertyGrid/PropertyGrid';
import { useWishlist } from '../../contexts/WishlistContext';
import properties from '../../data/properties.json';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  const { wishlist } = useWishlist();
  const { t } = useTranslation();
  
  const wishlistedProperties = properties.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-6 md:py-12 min-h-[calc(100vh-100px)]">
      <PageWrapper>
        <h1 className="text-2xl md:text-[32px] font-semibold text-text-primary mb-4 md:mb-8">{t('wishlists', 'Wishlist')}</h1>
        
        {wishlistedProperties.length > 0 ? (
          <div className="-mx-6 md:mx-0">
            <PropertyGrid properties={wishlistedProperties} />
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <img 
              src="/assets/images/illustrations/empty-search.svg" 
              alt="Empty Wishlist" 
              className="w-48 h-48 mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">{t('emptyWishlistTitle', 'Create your first wishlist')}</h2>
            <p className="text-text-secondary max-w-sm mb-8">
              {t('emptyWishlistDesc', 'As you search, tap the heart icon to save your favourite PG rooms and shared spaces to a wishlist.')}
            </p>
            <Link 
              to="/"
              className="border border-text-primary px-6 py-3 rounded-button font-bold hover:bg-background transition-colors"
            >
              {t('startSearching', 'Start searching')}
            </Link>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default WishlistPage;
