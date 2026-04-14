import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/auth/AuthModal';

const LoginPage = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // If already admin, go to dashboard
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // If logged in but not admin, go back or home
  if (user && !isAdmin) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-[440px]">
        <AuthModal 
          isOpen={true} 
          onClose={() => {}} 
          initialMode={location.state?.mode || 'user'} 
          isStandalone={true}
        />
      </div>
    </div>
  );
};

export default LoginPage;
