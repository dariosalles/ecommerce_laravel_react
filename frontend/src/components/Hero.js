import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getImageUrl } from '../utils/imageHelper';
import api from '../services/api';
import './Hero.css';

function Hero() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [highlights, setHighlights] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchHighlights();
  }, []);

  // Rotação automática do carrossel
  useEffect(() => {
    if (highlights.length === 0 || isHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [highlights.length, isHovering]);

  const fetchHighlights = async () => {
    try {
      setLoading(true);
      const response = await api.get('/featured-highlights');
      setHighlights(response.data);
    } catch (error) {
      console.error('Erro ao carregar destaques:', error);
      // Fallback com dados padrão
      setHighlights([
        {
          id: 1,
          title: 'MODA PARA HOMENS',
          description: t('hero.description'),
          button_text: t('hero.shopNow'),
          button_link: '/categories?type=men',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const handleShopNow = (highlight) => {
    if (highlight.button_link) {
      navigate(highlight.button_link);
    }
  };

  if (loading || highlights.length === 0) {
    return (
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.description')}</p>
            <button className="shop-btn">{t('hero.shopNow')}</button>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">Shoes & Bag Image</div>
          </div>
        </div>
        <div className="hero-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    );
  }

  const currentHighlight = highlights[currentSlide];

  const backgroundStyle = {
    backgroundImage: currentHighlight?.image_url 
      ? `url(${getImageUrl(currentHighlight.image_url)})` 
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: currentHighlight?.background_color || '#f5f5f5',
  };

  return (
    <section 
      className="hero" 
      style={backgroundStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Overlay para garantir legibilidade do texto */}
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1>{currentHighlight?.title}</h1>
          {currentHighlight?.description && <p>{currentHighlight?.description}</p>}
          <button 
            className="shop-btn"
            onClick={() => handleShopNow(currentHighlight)}
          >
            {currentHighlight?.button_text || t('hero.shopNow')}
          </button>
        </div>
      </div>

      {/* Setas de navegação */}
      {highlights.length > 1 && (
        <>
          <button className="carousel-arrow carousel-arrow-prev" onClick={handlePrevious} title="Anterior">
            ❮
          </button>
          <button className="carousel-arrow carousel-arrow-next" onClick={handleNext} title="Próximo">
            ❯
          </button>
        </>
      )}

      {/* Dots de navegação */}
      <div className="hero-dots">
        {highlights.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      {/* Indicador de slide atual */}
      {highlights.length > 1 && (
        <div className="slide-counter">
          {currentSlide + 1} / {highlights.length}
        </div>
      )}
    </section>
  );
}

export default Hero;
