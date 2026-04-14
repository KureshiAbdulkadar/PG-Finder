import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import properties from '../../data/properties.json';
import DashboardStatsSkeleton from '../../components/common/Skeletons/DashboardStatsSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const StatsCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-6 rounded-card border border-border shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color}`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-sm text-text-secondary font-medium">{label}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  </div>
);

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Total Properties', value: properties.length, icon: 'home', color: 'bg-brand-red' },
    { label: 'Total Leads', value: '42', icon: 'chat', color: 'bg-blue-500' },
    { label: 'Active Listings', value: properties.filter(p => p.isAvailable).length, icon: 'check_circle', color: 'bg-success' },
    { label: 'Verified PGs', value: properties.filter(p => p.isVerified).length, icon: 'verified', color: 'bg-brand-luxe' },
  ];

  return (
    <div className="py-6 md:py-12 bg-background/50 min-h-[calc(100vh-80px)] md:min-h-screen">
      <PageWrapper>
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {loading ? (
           <DashboardStatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map(s => <StatsCard key={s.label} {...s} />)}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-card border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4 pb-4 border-b border-background last:border-0 last:pb-0">
                  <div className="bg-background w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New lead for "{properties[i]?.location.area}"</p>
                    <p className="text-xs text-text-secondary">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-card border border-border shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <p className="text-sm text-text-secondary mb-6">Manage your listings and respond to user inquiries.</p>
            </div>
            <div className="space-y-3">
              <button onClick={() => navigate('/admin/properties/add')} className="w-full bg-brand-red text-white py-3 rounded-button font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all">
                Add New Property
              </button>
              <button onClick={() => navigate('/admin/leads')} className="w-full border border-border py-3 rounded-button font-bold hover:bg-background transition-colors">
                View Contact Leads
              </button>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default DashboardPage;
