import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotification } from '../contexts/NotificationContext';
import api from '../services/api';
import ProductGrid from './ProductGrid';
import FilterSidebar from './FilterSidebar';
import './Search.css';

function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  
  const searchQuery = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    selectedBrands: [],
    selectedColors: [],
    maxPrice: 3000,
    minPrice: 0,
  });

  useEffect(() => {
    performSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters]);

  const performSearch = async () => {
    if (!searchQuery && filters.selectedBrands.length === 0 && filters.selectedColors.length === 0) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      const params = {
        q: searchQuery,
        min_price: filters.minPrice,
        max_price: filters.maxPrice,
      };

      // Adicionar filtros de marca e cor se estiverem selecionados
      if (filters.selectedBrands.length > 0) {
        params.brands = filters.selectedBrands.join(',');
      }
      if (filters.selectedColors.length > 0) {
        params.colors = filters.selectedColors.join(',');
      }

      const response = await api.get('/products/search', { params });
      setProducts(response.data);

      if (response.data.length === 0 && searchQuery) {
        addNotification(t('search.noResults') || 'Nenhum produto encontrado', 'info');
      }
    } catch (error) {
      console.error('Erro ao pesquisar produtos:', error);
      addNotification(t('search.error') || 'Erro ao pesquisar produtos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      selectedBrands: [],
      selectedColors: [],
      maxPrice: 3000,
      minPrice: 0,
    });
  };

  return (
    <div className="search-page">
      <div className="breadcrumb-container">
        <div className="container">
          <button onClick={() => navigate('/')} className="breadcrumb-link">HOME</button>
          <span className="separator">/</span>
          <span className="breadcrumb-current">PESQUISA</span>
        </div>
      </div>

      <div className="search-container">
        <div className="container">
          <div className="search-header">
            <h1>Resultados da Pesquisa</h1>
            {searchQuery && (
              <p className="search-query">
                Pesquisando por: <strong>"{searchQuery}"</strong>
              </p>
            )}
          </div>

          <div className="search-content">
            {/* Sidebar com Filtros */}
            <aside className="search-sidebar">
              <FilterSidebar 
                onFilterChange={handleFilterChange}
                filters={filters}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Resultados */}
            <main className="search-results">
              {loading ? (
                <div className="loading-container">
                  <p>Pesquisando produtos...</p>
                </div>
              ) : products.length > 0 ? (
                <div className="results-wrapper">
                  <div className="results-header">
                    <p className="results-count">
                      {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="products-grid-search">
                    {products.map((product) => (
                      <div key={product.id} className="product-card-search">
                        <div 
                          className="product-card-image"
                          onClick={() => navigate(`/products/${product.id}`)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="image-placeholder">🖼️</div>
                          <span className="stock-badge">
                            {product.stock > 0 ? 'Em Estoque' : 'Fora de Estoque'}
                          </span>
                        </div>
                        <div className="product-card-info">
                          <h3 onClick={() => navigate(`/products/${product.id}`)} style={{ cursor: 'pointer' }}>
                            {product.name}
                          </h3>
                          <p className="product-category">{product.category?.name}</p>
                          <p className="product-description">{product.description}</p>
                          <div className="product-card-footer">
                            <span className="price">R$ {parseFloat(product.price).toFixed(2)}</span>
                            <button 
                              className="details-btn"
                              onClick={() => navigate(`/products/${product.id}`)}
                            >
                              Ver Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-results">
                  <div className="empty-icon">🔍</div>
                  <h2>Nenhum produto encontrado</h2>
                  <p>Tente ajustar seus filtros ou pesquisar por outro termo</p>
                  <button 
                    className="browse-btn"
                    onClick={() => navigate('/categories')}
                  >
                    Explorar Categorias
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
