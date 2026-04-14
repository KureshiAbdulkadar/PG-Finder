import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DatePicker = ({ onSelectDates }) => {
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleApply = () => {
    if (checkIn && checkOut) {
      onSelectDates({ checkIn, checkOut });
    }
  };

  return (
    <div className="bg-background/40 p-6 rounded-[24px] border border-border/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check In */}
        <div className="bg-white border-2 border-border/60 rounded-[16px] p-4 h-[84px] focus-within:border-brand-red transition-all shadow-sm">
          <label className="text-[11px] font-bold uppercase tracking-widest block text-text-secondary mb-1">
            {t('checkIn', 'Check-in Date')}
          </label>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-brand-red mr-2 text-xl">calendar_today</span>
            <input 
              type="date" 
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full outline-none text-base font-bold text-text-primary bg-transparent"
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="bg-white border-2 border-border/60 rounded-[16px] p-4 h-[84px] focus-within:border-brand-red transition-all shadow-sm">
          <label className="text-[11px] font-bold uppercase tracking-widest block text-text-secondary mb-1">
            {t('checkOut', 'Check-out Date')}
          </label>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-brand-red mr-2 text-xl">event_available</span>
            <input 
              type="date" 
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full outline-none text-base font-bold text-text-primary bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="text-sm text-text-secondary font-medium">
            {checkIn && checkOut ? (
                <span className="flex items-center gap-1 text-brand-red font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Ready to book
                </span>
            ) : (
                'Please select your stay duration'
            )}
        </div>
        <button 
          onClick={handleApply}
          disabled={!checkIn || !checkOut}
          className="bg-brand-red text-white font-bold px-10 py-4 rounded-[12px] shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          {t('confirmDates', 'Confirm & Continue')}
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
