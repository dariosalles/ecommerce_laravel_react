import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  // Verificar se há token de admin
  const adminToken = localStorage.getItem('admin_token');
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else {
    // Se não há token de admin, verificar token de usuário normal
    const userToken = localStorage.getItem('user_token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }
  
  return config;
});

export default api;