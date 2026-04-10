import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
        // Set the token in API headers
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Verify token is still valid
        verifyToken();
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const verifyToken = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Token inválido:', error);
      logout();
    }
  };

  const register = async (name, email, password, passwordConfirm) => {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });

      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao registrar';
      const errors = error.response?.data?.errors || {};
      return { success: false, message, errors };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao fazer login';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if token exists
      if (localStorage.getItem('authToken')) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      // Clear local state regardless
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await api.put('/user/profile', data);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil';
      const errors = error.response?.data?.errors || {};
      return { success: false, message, errors };
    }
  };

  const changePassword = async (currentPassword, password, passwordConfirm) => {
    try {
      await api.post('/user/change-password', {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirm,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Erro ao alterar senha';
      const errors = error.response?.data?.errors || {};
      return { success: false, message, errors };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
