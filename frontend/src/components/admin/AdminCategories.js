import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    featured: 0,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/categories/all');
      // Lidar com ambos: paginação (response.data.data) ou array direto (response.data)
      setCategories(Array.isArray(response.data) ? response.data : (response.data.data || []));
    } catch (err) {
      console.error('Erro ao carregar categorias:', err);
      setError('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    }));
  };

  const handleEditCategory = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      featured: category.featured,
    });
    setShowModal(true);
  };

  const handleSaveCategory = async () => {
    if (!formData.name.trim()) {
      setError('Nome da categoria é obrigatório');
      return;
    }

    try {
      if (editingId) {
        // Atualizar categoria existente
        await api.put(`/categories/${editingId}`, formData);
      } else {
        // Criar nova categoria
        await api.post('/categories', formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', description: '', featured: 0 });
      loadCategories();
    } catch (err) {
      console.error('Erro ao salvar categoria:', err);
      setError('Erro ao salvar categoria');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) return;

    try {
      await api.delete(`/categories/${id}`);
      loadCategories();
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
      setError('Erro ao deletar categoria');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando categorias...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="message error">{error}</div>}

      <div className="table-container">
        <div className="table-header">
          <h2>Listagem de Categorias ({categories.length})</h2>
          <div className="table-actions">
            <button 
              className="btn-primary-admin"
              onClick={() => setShowModal(true)}
            >
              ➕ Nova Categoria
            </button>
            <button 
              className="btn-primary-admin"
              onClick={loadCategories}
              style={{ background: '#667eea' }}
            >
              🔄 Atualizar
            </button>
          </div>
        </div>

        {categories.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Destaque</th>
                <th>Produtos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td><strong>{category.name}</strong></td>
                  <td>{category.description || 'N/A'}</td>
                  <td>{category.featured ? '⭐' : '-'}</td>
                  <td>{category.products?.length || 0}</td>
                  <td>
                    <button 
                      className="btn-small btn-edit"
                      onClick={() => handleEditCategory(category)}
                      style={{ marginRight: '6px', background: '#667eea', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => handleDelete(category.id)}
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
            Nenhuma categoria encontrada
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
              <button className="modal-close" onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({ name: '', description: '', featured: 0 });
              }}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nome da Categoria</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Eletrônicos"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Descrição da categoria"
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured === 1}
                    onChange={handleChange}
                  />
                  {' '}Destacada (aparecer na home)
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-small"
                style={{ background: '#999', color: 'white' }}
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData({ name: '', description: '', featured: 0 });
                }}
              >
                Cancelar
              </button>
              <button
                className="btn-small btn-primary-admin"
                onClick={handleSaveCategory}
              >
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;
