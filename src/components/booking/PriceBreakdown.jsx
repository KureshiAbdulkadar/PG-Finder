import React from 'react';
import { useTranslation } from 'react-i18next';

const PriceBreakdown = ({ price, nights }) => {
  const { t } = useTranslation();
  
  // Fake calculation based on nights if we treat monthly as nightly for demo
  // Or just scale the price. Let's assume price is monthly, and we divide by 30 for nightly
  const nightlyRate = Math.round(price / 30);
  const totalBase = nightlyRate * nights;
  const cleaningFee = 500;
  const serviceFee = 250;
  
  const total = totalBase + cleaningFee + serviceFee;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t('priceBreakdown', 'Price details')}</h3>
      
      <div className="flex justify-between text-text-primary">
        <span>₹{nightlyRate.toLocaleString()} x {nights} {t('nights', 'nights')}</span>
        <span>₹{totalBase.toLocaleString()}</span>
      </div>
      
      <div className="flex justify-between text-text-primary">
        <span className="underline">{t('cleaningFee', 'Cleaning fee')}</span>
        <span>₹{cleaningFee.toLocaleString()}</span>
      </div>
      
      <div className="flex justify-between text-text-primary">
        <span className="underline">{t('serviceFee', 'Service fee')}</span>
        <span>₹{serviceFee.toLocaleString()}</span>
      </div>
      
      <div className="h-px bg-border my-4"></div>
      
      <div className="flex justify-between font-bold text-lg">
        <span>{t('total', 'Total (INR)')}</span>
        <span>₹{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
