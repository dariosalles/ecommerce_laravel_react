import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';
import './FilterSidebar.css';

function FilterSidebar({ filters = {}, onFilterChange }) {
  const { t } = useLanguage();
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

  // Garantir que filters tem os valores padrão
  const safeFilters = {
    selectedBrands: filters.selectedBrands || [],
    selectedColors: filters.selectedColors || [],
    maxPrice: filters.maxPrice ?? 3000,
    minPrice: filters.minPrice ?? 0,
  };

  useEffect(() => {
    fetchActiveBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchActiveColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchActiveBrands = async () => {
    try {
      const response = await api.get('/brands/active');
      setBrands(response.data);
    } catch (error) {
      console.error('Erro ao carregar marcas:', error);
    }
  };

  const fetchActiveColors = async () => {
    try {
      const response = await api.get('/colors/active');
      setColors(response.data);
    } catch (error) {
      console.error('Erro ao carregar cores:', error);
    }
  };

  const handleBrandChange = (brand) => {
    onFilterChange({
      ...safeFilters,
      selectedBrands: safeFilters.selectedBrands.includes(brand)
        ? safeFilters.selectedBrands.filter(b => b !== brand)
        : [...safeFilters.selectedBrands, brand]
    });
  };

  const handleColorChange = (color) => {
    onFilterChange({
      ...safeFilters,
      selectedColors: safeFilters.selectedColors.includes(color)
        ? safeFilters.selectedColors.filter(c => c !== color)
        : [...safeFilters.selectedColors, color]
    });
  };

  const handlePriceChange = (e) => {
    onFilterChange({
      ...safeFilters,
      maxPrice: parseInt(e.target.value)
    });
  };

  const handleFilterButton = () => {
    // aplicar filtros
  };

  return (
    <aside className="filter-sidebar">
      {/* BRANDS */}
      <div className="filter-group">
        <h3 className="filter-title">{t('filters.brands')}</h3>
        <div className="filter-options">
          {brands.length === 0 ? (
            <p className="no-options">Nenhuma marca disponível</p>
          ) : (
            brands.map((brand) => (
              <label key={brand.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={safeFilters.selectedBrands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <span>{brand.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="filter-group">
        <h3 className="filter-title">{t('filters.filterByPrice')}</h3>
        <div className="price-range">
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="3000"
              value={safeFilters.maxPrice}
              onChange={handlePriceChange}
              className="slider"
            />
          </div>
          <button className="filter-btn" onClick={handleFilterButton}>
            {t('filters.filter')}
          </button>
          <div className="price-display">
            R$ 520 - R$ {safeFilters.maxPrice}
          </div>
        </div>
      </div>

      {/* COLOURS */}
      <div className="filter-group">
        <h3 className="filter-title">{t('filters.colours')}</h3>
        <div className="filter-options">
          {colors.length === 0 ? (
            <p className="no-options">Nenhuma cor disponível</p>
          ) : (
            colors.map((color) => (
              <label key={color.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={safeFilters.selectedColors.includes(color.name)}
                  onChange={() => handleColorChange(color.name)}
                />
                <span>{color.name}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
