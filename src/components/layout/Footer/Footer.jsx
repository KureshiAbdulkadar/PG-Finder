import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';
import { useAuth } from '../../../contexts/AuthContext';
import AuthModal from '../../auth/AuthModal';

const Footer = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('user');
  return (
    <footer className="hidden md:block bg-background border-t border-border pt-16 pb-12">
      <PageWrapper>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-6">
                <img src="/assets/images/logo.svg" alt="PG Finder" className="w-8 h-8 grayscale opacity-70" />
                <span className="text-xl font-black text-text-primary tracking-tighter">pgfinder</span>
             </Link>
             <p className="text-text-secondary text-sm font-medium leading-relaxed">
               India's most trusted platform for verified PG accommodations and co-living spaces for students and professionals.
             </p>
          </div>

          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-text-secondary mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-bold text-text-primary">
              <li className="hover:text-brand-red cursor-pointer transition-colors">Popular Areas</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Girl's PGs</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Boy's PGs</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Luxury Living</li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-text-secondary mb-6">Company</h3>
            <ul className="space-y-4 text-sm font-bold text-text-primary">
              <li className="hover:text-brand-red cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Contact Support</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-text-secondary mb-6">Management</h3>
            <ul className="space-y-4 text-sm font-bold text-text-primary">
              <button 
                onClick={() => {
                  if (isAdmin) {
                    navigate('/admin');
                  } else {
                    setAuthMode('admin');
                    setIsAuthOpen(true);
                  }
                }}
                className="block text-brand-red hover:underline transition-all text-left font-black"
              >
                Admin Dashboard
              </button>
              <li className="hover:text-brand-red cursor-pointer transition-colors">List your PG</li>
              <li className="hover:text-brand-red cursor-pointer transition-colors">Resource Centre</li>
            </ul>
          </div>
        </div>
        
        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          initialMode={authMode} 
        />
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary font-bold">
          <div className="flex items-center gap-4">
            <span>© 2026 pgfinder. Made with ❤️ in India.</span>
          </div>
          <div className="flex items-center gap-8">
          <div className="flex items-center gap-6">
                <span className="material-symbols-outlined text-xl cursor-pointer hover:text-brand-red">facebook</span>
                <span className="material-symbols-outlined text-xl cursor-pointer hover:text-brand-red">share</span>
          </div>
          </div>
        </div>
      </PageWrapper>
    </footer>
  );
};

export default Footer;
