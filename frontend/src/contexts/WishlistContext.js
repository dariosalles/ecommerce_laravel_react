import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Carregar wishlist do localStorage ao montar
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Erro ao carregar wishlist:', error);
    }
  }, []);

  // Salvar wishlist no localStorage sempre que mudar
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const addToWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      saveWishlist(updatedWishlist);
      return true;
    }
    return false;
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    saveWishlist(updatedWishlist);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    saveWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist deve ser usado dentro de WishlistProvider');
  }
  return context;
}
