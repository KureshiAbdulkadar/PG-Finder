import React from 'react';

const amenityMap = {
  wifi: { label: 'Free WiFi', icon: 'wifi' },
  ac: { label: 'Air conditioning', icon: 'ac_unit' },
  meals: { label: 'Meals included', icon: 'restaurant' },
  laundry: { label: 'Laundry', icon: 'local_laundry_service' },
  parking: { label: 'Free parking', icon: 'directions_car' },
  cctv: { label: 'CCTV security', icon: 'videocam' },
  powerbackup: { label: 'Power backup', icon: 'bolt' },
  gym: { label: 'Gym', icon: 'fitness_center' },
  elevator: { label: 'Elevator', icon: 'elevator' },
  security: { label: '24/7 Security', icon: 'security' },
};

const AmenitiesList = ({ amenities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 pt-6">
      {amenities.map((item) => {
        const config = amenityMap[item.toLowerCase()] || { label: item, icon: 'check_circle' };
        return (
          <div key={item} className="flex items-center gap-4 text-text-primary">
            <span className="material-symbols-outlined text-3xl font-light">{config.icon}</span>
            <span className="text-base font-light">{config.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AmenitiesList;
