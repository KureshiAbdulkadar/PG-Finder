import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const AuthModal = ({ isOpen, onClose, initialMode = 'user', isStandalone = false }) => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const [isAdminMode, setIsAdminMode] = useState(initialMode === 'admin');
  const [isLogin, setIsLogin] = useState(true);

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAdminMode(initialMode === 'admin');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleAuth = (e) => {
    e.preventDefault();
    login(isAdminMode ? 'admin' : 'user');
    onClose();
  };

  const modalContent = (
    <div className={`${isStandalone ? 'w-full' : 'bg-surface w-full max-w-[440px] rounded-card shadow-elevated overflow-hidden animate-scale-in relative z-10 border border-border'}`}>
        {!isStandalone && (
          <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center w-9 h-9 rounded-card hover:bg-background z-20"
          >
              <span className="material-symbols-outlined font-bold text-[20px]">close</span>
          </button>
        )}

        {/* Toggle Mode */}
        <div className={`flex bg-background p-1.5 rounded-card ${isStandalone ? 'mb-8' : 'm-6'}`}>
            <button 
                onClick={() => setIsAdminMode(false)}
                className={`flex-1 py-3 px-4 rounded-card text-xs font-black uppercase tracking-widest transition-all ${!isAdminMode ? 'bg-surface shadow-soft text-brand-red' : 'text-text-secondary hover:text-text-primary'}`}
            >
                User Account
            </button>
            <button 
                onClick={() => setIsAdminMode(true)}
                className={`flex-1 py-3 px-4 rounded-card text-xs font-black uppercase tracking-widest transition-all ${isAdminMode ? 'bg-surface shadow-soft text-brand-red' : 'text-text-secondary hover:text-text-primary'}`}
            >
                Owner Portal
            </button>
        </div>

        {/* Content */}
        <div className={`${isStandalone ? 'px-0' : 'px-8 pb-10'}`}>
          <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-text-primary tracking-tighter mb-2">
                {isAdminMode ? 'Host Hub' : (isLogin ? 'Welcome Back' : 'Create Account')}
              </h2>
              <p className="text-text-secondary text-sm font-bold opacity-70">
                {isAdminMode 
                  ? 'Manage your properties and leads' 
                  : (isLogin ? 'Sign in to find your perfect PG' : 'Join the elite community of PG stayers')}
              </p>
          </div>
          
          <form className="space-y-4" onSubmit={handleAuth}>
            {!isLogin && !isAdminMode && (
                <div className="bg-background border-2 border-transparent focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/10 rounded-card p-4 transition-all">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-transparent outline-none font-bold text-text-primary" required />
                </div>
            )}

            <div className="bg-background border-2 border-transparent focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/10 rounded-card p-4 transition-all">
                <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Email Address</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-transparent outline-none font-bold text-text-primary" required />
            </div>

            <div className="bg-background border-2 border-transparent focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/10 rounded-card p-4 transition-all">
                <label className="block text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none font-bold text-text-primary" required />
            </div>
            
            <button type="submit" className="w-full bg-brand-red text-white font-black py-4 rounded-card shadow-lg shadow-brand-red/20 hover:bg-brand-red-hover active:scale-95 transition-all text-sm uppercase tracking-widest mt-6">
              {isAdminMode ? 'Enter Dashboard' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          {!isAdminMode ? (
              <div className="mt-10 pt-8 border-t border-border/60 text-center">
                  <p className="text-[13px] font-bold text-text-secondary mb-4">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                      <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-brand-red ml-2 font-black underline underline-offset-4">
                          {isLogin ? 'Sign Up' : 'Login'}
                      </button>
                  </p>
                  <button 
                    type="button"
                    onClick={() => setIsAdminMode(true)}
                    className="text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-brand-red transition-colors"
                  >
                    Are you a PG Owner? <span className="underline">Login here</span>
                  </button>
              </div>
          ) : (
             <div className="mt-10 pt-8 border-t border-border/60 text-center">
                <button 
                  type="button"
                  onClick={() => setIsAdminMode(false)}
                  className="text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-brand-red transition-colors"
                >
                  Back to User login
                </button>
             </div>
          )}
        </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="bg-surface p-12 rounded-md shadow-premium border border-border/50 transition-colors duration-300">
        {modalContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex md:items-center items-end justify-center px-0 md:px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      {modalContent}
    </div>
  );
};

export default AuthModal;

