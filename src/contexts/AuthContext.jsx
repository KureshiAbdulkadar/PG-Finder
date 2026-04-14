import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pg-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pg-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pg-user');
    }
  }, [user]);

  const login = (role = 'user') => {
    setUser({ 
      id: '123', 
      name: role === 'admin' ? 'Admin User' : 'Test User',
      email: role === 'admin' ? 'admin@pgfinder.com' : 'user@test.com',
      role 
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
