import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './CategoryGrid.css';

function CategoryGrid({ categories }) {
  const { t } = useLanguage();

  return (
    <section className="categories-grid">
      {categories.length === 0 ? (
        <div className="no-categories">
          <p>{t('categories.noCategoriesFound') || 'Nenhuma categoria encontrada'}</p>
        </div>
      ) : (
        <div className="grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <div className="image-placeholder">
                  {category.name}
                </div>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p className="description">{category.description || 'Sem descrição'}</p>
                <button className="view-btn">
                  {t('categories.viewProducts') || 'Ver Produtos'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryGrid;
