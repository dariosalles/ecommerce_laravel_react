import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';
import FilterSidebar from './FilterSidebar';
import CategoryGrid from './CategoryGrid';
import './Categories.css';

function Categories() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    selectedBrands: [],
    selectedColors: [],
    maxPrice: 3000
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="categories-page">
      <div className="categories-banner">
        <h1>{t('categories.title') || 'CATEGORIAS'}</h1>
        <p className="breadcrumb">
          {t('header.home') || 'HOME'} / {t('categories.title') || 'CATEGORIAS'}
        </p>
      </div>

      <div className="categories-container">
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
        {loading ? (
          <div className="loading">Carregando categorias...</div>
        ) : (
          <CategoryGrid categories={categories} />
        )}
      </div>
    </div>
  );
}

export default Categories;
