import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      {/* Premium Inner Navigation Bar for Owners */}
      <header className="bg-white border-b border-border sticky top-0 z-[100] shadow-premium">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/assets/images/logo.svg" alt="PG Finder Logo" className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="text-[20px] font-black text-text-primary tracking-tighter">owner hub</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              <NavLink 
                to="/admin" 
                end
                className={({ isActive }) => 
                  `px-5 py-2.5 rounded-xl text-sm font-black transition-all ${isActive ? 'bg-text-primary text-white shadow-lg' : 'text-text-muted hover:text-text-primary hover:bg-background'}`
                }
              >
                Snapshot
              </NavLink>
              <NavLink 
                to="/admin/properties" 
                className={({ isActive }) => 
                  `px-5 py-2.5 rounded-xl text-sm font-black transition-all ${isActive ? 'bg-text-primary text-white shadow-lg' : 'text-text-muted hover:text-text-primary hover:bg-background'}`
                }
              >
                My Properties
              </NavLink>
              <NavLink 
                to="/admin/leads" 
                className={({ isActive }) => 
                  `px-5 py-2.5 rounded-xl text-sm font-black transition-all ${isActive ? 'bg-text-primary text-white shadow-lg' : 'text-text-muted hover:text-text-primary hover:bg-background'}`
                }
              >
                Tenant Lead
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              to="/admin/properties/add" 
              className="hidden md:flex items-center gap-2 bg-brand-red text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              <span className="material-symbols-outlined text-lg font-black">add_circle</span>
              Add PG
            </Link>

            <div className="h-8 w-[1px] bg-border mx-2"></div>

            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleLogout}>
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black text-text-primary leading-none mb-1">{user?.name || 'Owner Name'}</p>
                 <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">Pro Host</p>
              </div>
              <div className="w-10 h-10 bg-background rounded-2xl flex items-center justify-center text-text-muted group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all">
                 <span className="material-symbols-outlined text-xl">logout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10 animate-fade-in">
        <Outlet />
      </main>
      
      {/* Professional Footer for Owners */}
      <footer className="bg-white border-t border-border py-8 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">© 2026 pgfinder host network. all rights reserved.</p>
           <div className="flex items-center gap-8">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest hover:text-brand-red cursor-pointer">Support Hub</span>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest hover:text-brand-red cursor-pointer">Safety Guidelines</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
