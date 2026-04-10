import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/users');
      setUsers(response.data.data || []);
    } catch (err) {
      console.error('Erro ao carregar usuários:', err);
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      setError('Erro ao deletar usuário');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="message error">{error}</div>}

      <div className="table-container">
        <div className="table-header">
          <h2>Listagem de Usuários ({users.length})</h2>
          <button className="btn-primary-admin" onClick={loadUsers}>
            🔄 Atualizar
          </button>
        </div>

        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Role</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${
                      user.role === 'admin' ? 'status-active' : 'status-inactive'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button 
                      className="btn-small btn-delete"
                      onClick={() => handleDelete(user.id)}
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
            Nenhum usuário encontrado
          </p>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: '20px', padding: '15px', background: 'white', borderRadius: '8px' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>
          💡 Gerenciar roles de usuários e permissões está em desenvolvimento.
        </p>
      </div>
    </div>
  );
}

export default AdminUsers;
