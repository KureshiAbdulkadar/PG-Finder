import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    if (email && password) {
      localStorage.setItem('adminToken', 'mock-jwt-token');
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <PageWrapper className="max-w-md w-full">
        <div className="border border-border rounded-card p-8 shadow-card bg-white">
          <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border rounded-input px-4 py-3 outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                placeholder="admin@pgfinder.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border rounded-input px-4 py-3 outline-none focus:ring-2 focus:ring-brand-red/20 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-red text-white font-bold py-3 rounded-button mt-4 active:scale-95 transition-all shadow-md"
            >
              Continue
            </button>
          </form>
          <p className="text-center text-xs text-text-secondary mt-6">
            Authorized personnel only. Access is monitored.
          </p>
        </div>
      </PageWrapper>
    </div>
  );
};

export default AdminLoginPage;
