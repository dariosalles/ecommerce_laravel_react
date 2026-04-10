import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();

  const isAdmin = () => {
    return user?.role === 'admin' || user?.is_admin === 1;
  };

  const value = {
    isAdmin: isAdmin(),
    user,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin deve ser usado dentro de AdminProvider');
  }
  return context;
};
