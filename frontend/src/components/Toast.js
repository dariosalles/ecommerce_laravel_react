import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import './Toast.css';

function Toast() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`toast toast-${notification.type}`}
        >
          <span className="toast-message">{notification.message}</span>
          <button 
            className="toast-close"
            onClick={() => removeNotification(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
