import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateAdminRoute({ children }) {
  const adminToken = localStorage.getItem('admin_token');

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default PrivateAdminRoute;
