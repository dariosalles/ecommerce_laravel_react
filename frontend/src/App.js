import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import MyAccount from './components/MyAccount';
import MyWishlist from './components/MyWishlist';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Shipping from './components/Shipping';
import Returns from './components/Returns';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import AdminPage from './components/admin/AdminPage';
import AdminLogin from './components/admin/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import Toast from './components/Toast';
import './App.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.error('Erro ao carregar produtos:', error);
    });
  }, []);

  return (
    <div className="App">
      <Hero />
      <ProductGrid products={products} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <NotificationProvider>
              <Toast />
              <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:id" element={<CategoryProducts />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/my-account"
                  element={
                    <PrivateRoute>
                      <MyAccount />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-wishlist"
                  element={
                    <PrivateRoute>
                      <MyWishlist />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/admin/login" element={<AdminLogin />} />
              </Routes>
              <Footer />
            </Router>
          </NotificationProvider>
        </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
