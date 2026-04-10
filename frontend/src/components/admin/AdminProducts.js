import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    featured: 0,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || []);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data || []);
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      await api.post('/products', formData);
      setShowModal(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        featured: 0,
      });
      loadProducts();
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      setError('Erro ao adicionar produto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao deletar produto');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="message error">{error}</div>}

      <div className="table-container">
        <div className="table-header">
          <h2>Listagem de Produtos ({products.length})</h2>
          <div className="table-actions">
            <button 
              className="btn-primary-admin"
              onClick={() => setShowModal(true)}
            >
              ➕ Novo Produto
            </button>
            <button 
              className="btn-primary-admin"
              onClick={loadProducts}
              style={{ background: '#667eea' }}
            >
              🔄 Atualizar
            </button>
          </div>
        </div>

        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Destaque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <br />
                    <small style={{ color: '#999' }}>{product.description?.substring(0, 50)}...</small>
                  </td>
                  <td>{product.category?.name || 'N/A'}</td>
                  <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px',
                      background: product.stock > 0 ? '#d4edda' : '#f8d7da',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {product.stock}
                    </span>
                  </td>
                  <td>{product.featured ? '⭐' : '-'}</td>
                  <td>
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            Nenhum produto encontrado
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Novo Produto</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nome do Produto</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Estoque</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Categoria</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured === 1}
                    onChange={handleChange}
                  />
                  {' '}Destacado
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-small"
                style={{ background: '#999', color: 'white' }}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-small btn-primary-admin"
                onClick={handleAddProduct}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
