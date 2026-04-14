import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ContactBar = ({ propertyId, price, rating, reviews }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 py-4 px-6 md:py-3 box-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Price Info (Desktop/Tablet) */}
        <div className="hidden md:block">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold">₹{price?.toLocaleString()}</span>
            <span className="text-text-secondary">{t('perMonth', '/ month')}</span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-semibold underline">
            <span className="material-symbols-outlined text-[12px] font-variation-fill">star</span>
            <span>{rating}</span>
            <span className="text-text-secondary"> · {reviews} {t('reviews', 'reviews')}</span>
          </div>
        </div>

        {/* Price Info (Mobile) */}
        <div className="md:hidden flex flex-col">
            <div className="flex items-center gap-1">
                <span className="font-bold">₹{price?.toLocaleString()}</span>
                <span className="text-sm text-text-secondary">{t('month', 'month')}</span>
            </div>
            <span className="text-xs underline font-medium text-text-secondary hover:text-text-primary">
              {t('viewDates', 'View dates')}
            </span>
        </div>

        {/* Action Button */}
        <Link 
          to={`/contact/${propertyId}`}
          className="bg-brand-red text-white font-bold rounded-button px-8 py-3.5 text-center transition-all active:scale-95 shadow-md flex-1 md:flex-none"
        >
          {t('requestToBook', 'Request to Book')}
        </Link>

      </div>
    </div>
  );
};

export default ContactBar;
