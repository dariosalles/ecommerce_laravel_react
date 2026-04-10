import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import api from '../services/api';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [categories, setCategories] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchFeaturedCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const fetchFeaturedCategories = async () => {
    try {
      const response = await api.get('/categories/featured');
      setFeaturedCategories(response.data);
    } catch (error) {
      console.error('Erro ao carregar categorias featured:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <LanguageSwitcher />
            <span>USD</span>
            <span>{user ? `Olá, ${user.name}!` : t('header.welcome')}</span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>E-Com Shop</h1>
              <p>online store</p>
            </div>

            <div className="search-bar">
              <form onSubmit={handleSearch} className="search-form">
                <input 
                  type="text" 
                  placeholder={t('header.searchPlaceholder')}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">🔍</button>
              </form>
            </div>

            <div className="header-actions">
              {user ? (
                <>
                  <Link to="/my-account" className="action-item">
                    <span>👤 {t('header.myAccount')}</span>
                  </Link>
                  <Link to="/my-wishlist" className="action-item">
                    <span>❤️ {t('header.myWishlist')}</span>
                  </Link>
                  <button 
                    className="action-item logout-link"
                    onClick={handleLogout}
                    title="Sair"
                  >
                    <span>🔓 {t('header.logout') || 'Sair'}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="action-item">
                    <span>🔐 {t('header.login')}</span>
                  </Link>
                </>
              )}
              <Link to="/cart" className="action-item">
                <span>🛒 {t('cart.myCart')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <div className="categories-dropdown">
              <button 
                className="categories-btn"
                onMouseEnter={() => setShowCategoriesMenu(true)}
                onMouseLeave={() => setShowCategoriesMenu(false)}
              >
                CATEGORIAS ▼
              </button>
              {showCategoriesMenu && (
                <div 
                  className="categories-menu"
                  onMouseEnter={() => setShowCategoriesMenu(true)}
                  onMouseLeave={() => setShowCategoriesMenu(false)}
                >
                  <Link to="/categories" className="menu-item all-categories">
                    Ver todas as categorias
                  </Link>
                  <div className="menu-divider"></div>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/categories/${category.id}`}
                      className="menu-item"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <ul className="nav-menu">
              <li><Link to="/">{t('navigation.home')}</Link></li>
              {featuredCategories.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link to={`/categories/${category.id}`}>{category.name.toUpperCase()}</Link>
                </li>
              ))}
              <li><Link to="/contact">{t('navigation.contact')}</Link></li>
            </ul>
            <Link to="/cart" className="nav-cart">
              <span>🛒 {t('cart.myCart')}</span>
              <span className="cart-count">{getTotalItems()}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
