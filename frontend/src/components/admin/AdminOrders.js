import React, { useState, useEffect } from 'react';
import api from '../../services/api';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/orders/all'); // Endpoint admin para todos os pedidos
      // Lidar com ambos: paginação (response.data.data) ou array direto (response.data)
      setOrders(Array.isArray(response.data) ? response.data : (response.data.data || []));
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setError('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      await api.put(`/orders/${selectedOrder.id}/status`, {
        status: newStatus,
      });

      // Atualizar lista localmente
      setOrders(orders.map(o => 
        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
      ));

      setShowModal(false);
      setError('');
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      setError('Erro ao atualizar status do pedido');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando pedidos...</p>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="message error">{error}</div>}

      <div className="table-container">
        <div className="table-header">
          <h2>Listagem de Pedidos ({orders.length})</h2>
          <button className="btn-primary-admin" onClick={loadOrders}>
            🔄 Atualizar
          </button>
        </div>

        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Status</th>
                <th>Total</th>
                <th>Itens</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.order_number}</td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{order.user?.email || 'N/A'}</td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>R$ {parseFloat(order.total).toFixed(2)}</td>
                  <td>{order.items?.length || 0}</td>
                  <td>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <button
                      className="btn-small btn-view"
                      onClick={() => handleViewDetails(order)}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
            Nenhum pedido encontrado
          </p>
        )}
      </div>

      {/* Modal de Detalhes */}
      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes do Pedido #{selectedOrder.order_number}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Informações do Cliente */}
              <div className="form-group">
                <strong>Cliente:</strong>
                <p>{selectedOrder.user?.name}</p>
              </div>

              <div className="form-group">
                <strong>Email:</strong>
                <p>{selectedOrder.user?.email}</p>
              </div>

              {/* Status */}
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="pending">Pendente</option>
                  <option value="processing">Processando</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              {/* Itens */}
              <div className="form-group">
                <strong>Itens do Pedido:</strong>
                <table style={{ width: '100%', marginTop: '10px' }}>
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Qtd</th>
                      <th>Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.product?.name}</td>
                        <td>{item.quantity}</td>
                        <td>R$ {parseFloat(item.price_at_purchase).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totais */}
              <div className="form-group">
                <strong>Subtotal:</strong>
                <p>R$ {parseFloat(selectedOrder.subtotal).toFixed(2)}</p>
              </div>

              <div className="form-group">
                <strong>Frete:</strong>
                <p>R$ {parseFloat(selectedOrder.shipping_cost).toFixed(2)}</p>
              </div>

              <div className="form-group">
                <strong>Total:</strong>
                <p style={{ fontSize: '18px', color: '#667eea', fontWeight: 'bold' }}>
                  R$ {parseFloat(selectedOrder.total).toFixed(2)}
                </p>
              </div>

              {/* Endereço de Entrega */}
              {selectedOrder.shipping_address && (
                <div className="form-group">
                  <strong>Endereço de Entrega:</strong>
                  <p>{selectedOrder.shipping_address}</p>
                </div>
              )}

              {/* Código de Rastreamento */}
              {selectedOrder.tracking_code && (
                <div className="form-group">
                  <strong>Código de Rastreamento:</strong>
                  <p>{selectedOrder.tracking_code}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                className="btn-small"
                style={{ background: '#999', color: 'white' }}
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
              <button
                className="btn-small btn-primary-admin"
                onClick={handleUpdateStatus}
              >
                Salvar Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
