// Helper para converter URLs de imagens para URLs absolutas do backend
//const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'http://ec2-52-14-78-111.us-east-2.compute.amazonaws.com';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Se já é URL completa, retorna como está
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Se é caminho relativo, adiciona base URL do backend
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // Se é apenas o nome do arquivo
  return `${API_BASE_URL}/images/products/${imagePath}`;
};

export default getImageUrl;
