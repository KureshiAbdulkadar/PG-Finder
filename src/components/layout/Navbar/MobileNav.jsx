import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useTranslation } from 'react-i18next';
import AuthModal from '../../auth/AuthModal';
import { useAuth } from '../../../contexts/AuthContext';

const MobileNav = () => {
  const { wishlist } = useWishlist();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('user');

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-50 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-[68px] px-1">
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[60px] h-full transition-all ${
                isActive ? 'text-brand-red scale-110' : 'text-text-secondary'
              }`
            }
          >
            <span className="material-symbols-outlined text-[26px]">home</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
          </NavLink>

          <NavLink
            to={ROUTES.WISHLIST}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[60px] h-full transition-all relative ${
                isActive ? 'text-brand-red scale-110' : 'text-text-secondary'
              }`
            }
          >
            <span className="material-symbols-outlined text-[26px]">favorite</span>
            {wishlist.length > 0 && (
              <div className="absolute top-2 right-3 w-4 h-4 bg-brand-red text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {wishlist.length}
              </div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-tighter">Saved</span>
          </NavLink>

          <button
            onClick={() => {
              if (isAdmin) navigate('/admin');
              else {
                setAuthMode('admin');
                setIsAuthModalOpen(true);
              }
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[60px] h-full transition-all text-text-secondary`}
          >
            <span className="material-symbols-outlined text-[26px]">dashboard_customize</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Admin</span>
          </button>

          {user ? (
            <button
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] h-full text-text-secondary"
              onClick={logout}
            >
              <div className="w-7 h-7 bg-brand-red/10 rounded-full flex items-center justify-center mb-0.5">
                 <span className="material-symbols-outlined text-[20px] text-brand-red">logout</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Logout</span>
            </button>
          ) : (
            <button
              className="flex flex-col items-center justify-center gap-1 min-w-[60px] h-full text-text-secondary"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <span className="material-symbols-outlined text-[26px]">account_circle</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </>
  );
};

export default MobileNav;
