import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';
import ProductGrid from './ProductGrid';
import './CategoryProducts.css';

function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryWithProducts();
  }, [id]);

  const fetchCategoryWithProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/categories/${id}`);
      setCategory(response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Erro ao carregar categoria:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="category-products-page">
        <div className="loading-container">
          <p>Carregando categoria...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="category-products-page">
        <div className="error-container">
          <p>Categoria não encontrada</p>
          <button onClick={() => navigate('/')}>Voltar para Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-products-page">
      <div className="category-banner">
        <h1>{category.name}</h1>
        <p className="breadcrumb">
          {t('header.home') || 'HOME'} / {category.name}
        </p>
      </div>

      <div className="category-products-container">
        <div className="category-header">
          <div>
            <h2>{category.name}</h2>
            <p className="category-description">{category.description}</p>
            <p className="product-count">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'} disponível(is)
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>Nenhum produto nesta categoria</p>
            <button onClick={() => navigate('/categories')}>Ver todas as categorias</button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
